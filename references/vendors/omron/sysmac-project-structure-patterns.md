# Omron Sysmac Studio: Project Structure and Architectural Patterns

Sysmac Studio standardizes programming around the IEC 61131-3 model but implements specific paradigms tailored to the NJ/NX series controllers. To maintain scalable, readable, and maintainable projects, developers should adopt structured architectural patterns.

## 1. Program Organization: Programs, Function Blocks, and Variables

A large Sysmac project should be divided hierarchically based on the physical and logical structure of the machine.

### Global Variable Lists (GVL)
Global Variables should be strictly minimized and categorized. Avoid using the GVL as a "dumping ground" for all tags.
*   **System State:** Machine modes (Auto, Manual, Error), global faults, and safety statuses.
*   **Inter-Program Communication:** Variables required to pass data between completely separate logical units (e.g., Conveyor Program passing a 'Part Ready' signal to a Robot Program).
*   **HMI/SCADA Interfaces:** Dedicated structures arrays specifically exposed (`Publish Only` or `Publish/Subscribe`) for external communication.

### Programs vs. Function Blocks
*   **Programs:** Used to organize the high-level flow of a specific machine module (e.g., `prg_Infeed`, `prg_Processing`, `prg_Outfeed`). Programs contain local instances of Function Blocks.
*   **Function Blocks (FBs):** The core unit of reuse. Any logic that is executed more than once (e.g., cylinder control, motor drive handling, sequence steps) should be encapsulated in an FB. Keep FBs pure: they should interact with the outside world *only* through their `IN`, `OUT`, and `IN_OUT` variables.

## 2. The Abstraction Layer: I/O Mapping Philosophy

Directly referencing physical hardware addresses (e.g., `Node1_Input_Bit00`) deep inside control logic creates fragile code that is difficult to simulate, test, or migrate to new hardware.

**Pattern: The I/O Mapping Separation**
1.  **Hardware Level:** Map physical I/O directly to global hardware tags.
2.  **Input Mapping Routine:** At the beginning of the task cycle, run an Input Mapping program (`prg_MapInputs`). This reads the hardware tags and writes them to logically named internal tags (e.g., `Sensor_Conveyor1_Entry`). This is also the ideal place to handle signal debouncing or inversion.
3.  **Logical Execution:** The core machine code runs using *only* the internal tags.
4.  **Output Mapping Routine:** At the end of the task cycle, an Output Mapping program (`prg_MapOutputs`) reads the internal command tags (e.g., `Cmd_Conveyor1_Run`) and writes them to the physical hardware tags.

*Benefits:* You can easily force internal tags without disconnecting physical wires, simulate the entire machine by skipping the mapping routines, and swap hardware modules by simply updating the mapping program.

## 3. Task Allocation Strategy

Sysmac controllers use a strict cyclic task execution model. Mismanaging task allocation can lead to jitter, missed motion updates, or task execution overruns.

### Primary Periodic Task
The Primary Periodic Task is the heartbeat of the controller. It has the highest priority.
*   **Usage:** Motion control axes updates, high-speed discrete logic, EtherCAT synchronous I/O updates.
*   **Rule of Thumb:** Keep this task as lean as possible. If the Primary Periodic Task exceeds its allocated cycle time, a Task Period Exceeded error occurs, and motion synchronization may fail.

### Periodic Tasks (e.g., Periodic Task 1, 2)
Used for slower processes that require a fixed time base but do not need millisecond-level precision.
*   **Usage:** General sequence logic, temperature PID loops, pneumatic cylinder controls.
*   **Note:** These tasks will be preempted (interrupted) by the Primary Periodic Task. Ensure that code here is safe against preemption.

### Background Task
Executes in the "free time" available after all periodic tasks have completed. It has no fixed cycle time.
*   **Usage:** Heavy data logging, slow string manipulation, complex mathematical aggregations, or certain HMI data preparations.
*   **Caution:** Because the cycle time fluctuates based on system load, never put time-critical logic, edge-detections for fast signals, or sequence steps in a Background Task.