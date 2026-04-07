# Omron Motor Start/Stop Example

This example demonstrates how the agent should generate a basic Function Block (FB) for motor control, adhering to Omron Sysmac Studio formatting and tag-based memory structures.

## User Request

> "Write a motor start/stop Function Block in Sysmac Studio ST. Please include the variable definitions and show how I would instantiate it in a main program loop."

## Agent Response

Here is the implementation of a motor start/stop Function Block in Sysmac Studio using Structured Text (IEC 61131-3). In Sysmac Studio, we use camelCase for variables and tag-based addressing.

### Function Block Definition

```iecst
FUNCTION_BLOCK MotorControl
VAR_INPUT
    startCmd : BOOL;        // Command to start the motor
    stopCmd : BOOL;         // Command to stop the motor (Normal Closed/Active Low is best practice, but using Active High here for simplicity)
    thermalFault : BOOL;    // Thermal overload fault (Active High)
END_VAR

VAR_OUTPUT
    motorRun : BOOL;        // Output to the motor contactor
END_VAR

VAR
    runLatch : BOOL;        // Internal latch state
END_VAR

// Logic: Fault and Stop have priority over Start
IF thermalFault OR stopCmd THEN
    runLatch := FALSE;
ELSIF startCmd THEN
    runLatch := TRUE;
END_IF;

// Assign internal state to output
motorRun := runLatch;
END_FUNCTION_BLOCK
```

### Main Program Instantiation

In Sysmac Studio, you must declare an instance of the Function Block in your program's `VAR` section before calling it in the code body.

```iecst
PROGRAM Main
VAR
    fbConveyorMotor : MotorControl;  // Instance of the MotorControl FB
    
    // Program tags mapped to physical I/O or HMI
    hmiBtnStart : BOOL;
    hmiBtnStop : BOOL;
    ioThermalOverload : BOOL;
    ioMotorContactor : BOOL;
END_VAR

// Call the Function Block instance
fbConveyorMotor(
    startCmd := hmiBtnStart,
    stopCmd := hmiBtnStop,
    thermalFault := ioThermalOverload,
    motorRun => ioMotorContactor
);
END_PROGRAM
```

## Why this example matters

This example enforces standard Omron FB syntax, `PROGRAM` and `FUNCTION_BLOCK` structures, and demonstrates proper instantiation syntax (parameter assignment via `:=` and `=>`) within the Sysmac Studio environment.