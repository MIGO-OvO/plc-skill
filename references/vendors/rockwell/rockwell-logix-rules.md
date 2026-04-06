# Rockwell / Allen-Bradley Logix 5000 Programming Rules

This document outlines the core engineering and programming rules for Rockwell Automation Logix 5000 controllers (ControlLogix, CompactLogix) using Studio 5000 Logix Designer.

## 1. Project Organization: Tasks, Programs, and Routines

### 1.1 Task Scheduling
Logix 5000 uses a preemptive multitasking operating system.

**Rules:**
- **Continuous Task**: Runs in the background when no other tasks are executing. Use for non-time-critical logic. A project can have only one continuous task.
- **Periodic Tasks**: Executed at a fixed interval (e.g., every 10ms, 100ms). Use for time-critical operations like PID loops, motion control, and fast sequence logic. Always assign a priority (1 is highest, 15 is lowest).
- **Event Tasks**: Triggered by specific events (e.g., an input going high, a consumed tag arriving). Use sparingly to avoid unpredictable CPU loading.
- **Watchdog Timer**: Configure the watchdog timer for each task to prevent infinite loops from halting the controller.

### 1.2 Programs and Routines
- **Programs**: Containers for routines and local (program-scoped) tags. Programs within a task execute sequentially.
- **Routines**: Contain the actual logic (Ladder, FBD, ST, SFC). Each program must have a "Main Routine" assigned.
- **Subroutines (JSR)**: Use the `JSR` (Jump to Subroutine) instruction in the main routine to call other routines within the same program. Pass parameters using Input/Return parameters if needed, but avoid excessive parameter passing for performance.

## 2. Tag Management and Memory

### 2.1 Tag Scope
**Rules:**
- **Controller-Scoped Tags**: Accessible globally across all tasks and programs. Use for I/O, HMI communication, and data shared between programs.
- **Program-Scoped Tags**: Local to a specific program. Use for intermediate calculations, state variables, and internal logic not needed elsewhere. This improves encapsulation.

### 2.2 Data Types
**Rules:**
- Use the most efficient data type. Logix 5000 is optimized for 32-bit operations.
- **DINT (32-bit integer)**: Default integer type. Faster processing than INT (16-bit) or SINT (8-bit) due to the 32-bit architecture.
- **REAL (32-bit float)**: Default floating-point type.
- **BOOL**: Boolean type. The controller allocates memory in 32-bit chunks, so grouping BOOLs into DINTs or arrays can save memory, though modern controllers usually have ample memory.
- **UDT (User-Defined Data Type)**: Highly recommended. Create UDTs to group related data (e.g., a Motor UDT containing `Start`, `Stop`, `Running`, `Fault`, `Speed`). This simplifies tag creation and HMI integration.

### 2.3 Arrays and Addressing
**Rules:**
- Arrays must be zero-indexed (e.g., `MyArray[0]`).
- Use indirect addressing (e.g., `MyArray[Index]`) carefully, ensuring `Index` never exceeds the array bounds. An out-of-bounds access causes a major controller fault. Always clamp or check the index before use:
  ```st
  IF Index >= 0 AND Index < 100 THEN
      Value := MyArray[Index];
  END_IF;
  ```

### 2.4 Alias Tags
- Use Alias tags to map meaningful names (e.g., `Pump1_Start`) to physical I/O addresses (e.g., `Local:1:I.Data.0`).
- This allows the logic to be written before physical I/O mapping is finalized.

## 3. Programming Languages and Usage

### 3.1 Ladder Diagram (LD)
- Recommended for discrete logic, interlocks, and general sequencing.
- Easy for maintenance personnel to read and troubleshoot online.

### 3.2 Function Block Diagram (FBD)
- Recommended for continuous process control (PID, drive control) and complex mathematical operations.
- Data flow is clearly visible.

### 3.3 Structured Text (ST)
- Recommended for complex math, string manipulation, looping (FOR/WHILE), and array processing.
- See `rockwell-st-programming-guide.md` for ST specifics.

### 3.4 Sequential Function Chart (SFC)
- Recommended for high-level state machines, batch processing, and step-by-step sequencing.
- Clearly visualizes the active state and transition conditions.

## 4. Add-On Instructions (AOI)

AOIs allow you to create custom, reusable instructions that encapsulate logic and data.

**Rules:**
- Use AOIs for repetitive logic (e.g., valve control, motor control, scaling).
- AOIs require a backing tag (an instance of the AOI data type) to store their internal state.
- Parameters:
  - `Input`: Passed by value into the AOI.
  - `Output`: Passed by value out of the AOI.
  - `InOut`: Passed by reference. Changes inside the AOI immediately affect the external tag. Use for large structures (UDTs) or arrays to avoid excessive memory copying.
- **Caution:** AOI logic cannot be edited online. To modify an AOI while the controller is running, you must create a new version, instantiate it, and switch the calls.

## 5. Instructions and Logic Patterns

### 5.1 Timers (TON, TOF, RTO)
- Logix timers use a `TIMER` data type containing `.PRE` (Preset), `.ACC` (Accumulated), `.EN` (Enable bit), `.TT` (Timing bit), and `.DN` (Done bit).
- Time base is always milliseconds (e.g., `.PRE = 5000` is 5 seconds).

### 5.2 Oneshot / Edge Detection (ONS, OSR, OSF)
- Use `ONS` (One Shot) in Ladder to trigger an action for exactly one scan when the input condition goes true.
- Requires a dedicated BOOL storage bit for the one-shot state. Do not reuse this bit elsewhere.

### 5.3 Asynchronous I/O Updates
**Critical Rule:** Logix 5000 updates I/O asynchronously to the task execution. An input value can change in the middle of a program scan.
- If an input state must remain consistent throughout a scan, buffer it. Copy the physical input to an internal tag at the beginning of the program, and use the internal tag throughout the logic.
- Or use the `Synchronous Copy (CPS)` instruction to ensure data consistency when copying blocks of data that might be updated asynchronously.

## 6. Fault Handling

**Rules:**
- **Minor Faults**: Logged by the controller but do not stop execution (e.g., minor math overflow).
- **Major Faults**: Stop controller execution and switch to Fault mode (e.g., array out of bounds, watchdog timeout, invalid pointer).
- Use a Controller Fault Handler routine to catch major faults, log the error, and potentially clear the fault and resume execution if safe to do so.

---
**References:**
- Logix 5000 Controllers Common Procedures (1756-PM001)
- Logix 5000 Controllers Design Considerations (1756-RM094)
- Logix 5000 Controllers I/O and Tag Data (1756-PM004)