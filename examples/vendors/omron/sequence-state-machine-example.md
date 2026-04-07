# Omron Sequence State Machine Example

This example highlights the agent's ability to utilize Omron's strong typing system, specifically `ENUM` data types, to create robust and readable state machines in Sysmac Studio.

## User Request

> "Write a sequence state machine using Sysmac Studio ST. Make sure to use best practices for defining the states rather than just using magic numbers."

## Agent Response

In Sysmac Studio, the best practice for building state machines is to use **Enumerations (ENUM)** combined with a `CASE` statement. This eliminates "magic numbers" and makes your code self-documenting and easier to debug.

### Step 1: Define the ENUM Data Type

In Sysmac Studio, you would define this in the **Data Types** section of the Multiview Explorer.

```iecst
TYPE
    eMachineState : (
        INIT,
        IDLE,
        STARTING,
        RUNNING,
        STOPPING,
        FAULT
    );
END_TYPE
```

### Step 2: State Machine Program

```iecst
PROGRAM SequenceControl
VAR
    // Initialize the state machine to the INIT state
    currentState : eMachineState := eMachineState#INIT;
    
    // Control Flags
    initComplete : BOOL;
    startReq : BOOL;
    stopReq : BOOL;
    faultActive : BOOL;
END_VAR

// Global Fault Override
IF faultActive AND (currentState <> eMachineState#FAULT) THEN
    currentState := eMachineState#FAULT;
END_IF;

// State Machine Logic
CASE currentState OF
    
    eMachineState#INIT:
        // Perform initialization tasks here
        IF initComplete THEN
            currentState := eMachineState#IDLE;
        END_IF;
        
    eMachineState#IDLE:
        // Wait for start command
        IF startReq THEN
            currentState := eMachineState#STARTING;
        END_IF;
        
    eMachineState#STARTING:
        // Execute startup sequence (e.g., sound horn, open valves)
        // Transition to running when conditions are met
        currentState := eMachineState#RUNNING;
        
    eMachineState#RUNNING:
        // Normal operation logic
        IF stopReq THEN
            currentState := eMachineState#STOPPING;
        END_IF;
        
    eMachineState#STOPPING:
        // Execute shutdown sequence
        currentState := eMachineState#IDLE;
        
    eMachineState#FAULT:
        // Fault recovery logic
        // Wait for fault to be cleared
        IF NOT faultActive THEN
            currentState := eMachineState#INIT;
        END_IF;
        
    ELSE
        // Fallback for undefined states
        currentState := eMachineState#INIT;
        
END_CASE;
END_PROGRAM
```

## Why this example matters

Sysmac Studio heavily relies on IEC 61131-3 strong typing. This example ensures the AI recognizes that Omron supports native `ENUM` types for state machines and outputs the correct `eMachineState#STATE` syntax.