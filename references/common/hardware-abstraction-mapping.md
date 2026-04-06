# Hardware Abstraction and I/O Mapping

This document defines the essential engineering pattern of decoupling physical I/O from the core PLC control logic.

## The Problem: Tight Coupling

**Bad Practice (Tight Coupling):**
```st
// In the middle of a complex sequence routine...
IF %IX0.0 AND NOT %IX0.1 THEN    // Reading raw physical inputs directly
    %QX1.0 := TRUE;              // Writing raw physical outputs directly
END_IF;
```

**Why this is bad:**
1. **Hardware Changes:** If a sensor breaks and is moved from `%IX0.0` to `%IX2.5`, you have to find and replace `%IX0.0` everywhere in your code.
2. **Simulation/Testing:** You cannot easily test the logic without the physical hardware connected.
3. **Portability:** If you port the code to a different PLC brand, the address syntax changes entirely.
4. **Readability:** `%IX0.0` carries no semantic meaning.

## The Solution: The I/O Mapping Layer

The I/O Mapping pattern forces all physical I/O to pass through a dedicated abstraction layer before reaching the core logic.

### 1. Define Logical Data Structures (UDTs/DUTs)

Create data structures that represent the *logical* state of your equipment, independent of how it is wired.

```st
// Define the logical inputs from the field
TYPE Equipment_Inputs_Type :
STRUCT
    SystemAirPressureOk : BOOL;
    EmergencyStopOk : BOOL;
    GuardDoorsClosed : BOOL;
    
    // Motor 1 Feedback
    Motor1_RunFeedback : BOOL;
    Motor1_OverloadOk : BOOL;
    Motor1_LocalSwitchPos : INT; // 0=Auto, 1=Off, 2=Hand
END_STRUCT
END_TYPE

// Define the logical outputs to the field
TYPE Equipment_Outputs_Type :
STRUCT
    SystemReadyLamp : BOOL;
    SystemFaultHorn : BOOL;
    
    // Motor 1 Commands
    Motor1_RunCommand : BOOL;
    Motor1_SpeedReference : REAL; // 0-100%
END_STRUCT
END_TYPE

VAR_GLOBAL
    IO_In : Equipment_Inputs_Type;
    IO_Out : Equipment_Outputs_Type;
END_VAR
```

### 2. Create the Input Mapping Routine

Create a routine (e.g., `Map_Inputs`) that runs at the **very beginning** of your task. Its sole job is to read physical inputs, apply any necessary scaling, debouncing, or inversion, and write the result to your logical `IO_In` structure.

```st
// Routine: Map_Inputs
// Runs FIRST in the task scan

// 1. Map raw digital inputs (handling active-low sensors)
// E-Stop is active low (Normally Closed), so TRUE = OK
IO_In.EmergencyStopOk := %IX0.0;

// System Air Pressure switch is active high (Normally Open), so TRUE = OK
IO_In.SystemAirPressureOk := %IX0.1;

// Motor 1 Overload is Normally Closed (TRUE = OK)
IO_In.Motor1_OverloadOk := %IX1.0;

// Motor 1 Run Feedback is Normally Open
IO_In.Motor1_RunFeedback := %IX1.1;

// 2. Map and scale analog inputs
// Read raw 0-27648 value from analog card, scale to 0-100%
IO_In.Motor1_SpeedFeedback := SCALE_REAL(
    IN := INT_TO_REAL(%IW2), 
    IN_MIN := 0.0, 
    IN_MAX := 27648.0, 
    OUT_MIN := 0.0, 
    OUT_MAX := 100.0
);

// 3. Optional: Simulation Override
IF SimulationMode THEN
    // In simulation mode, ignore physical inputs and use HMI/test values
    IO_In.SystemAirPressureOk := Sim_AirPressureOk;
    IO_In.Motor1_RunFeedback := IO_Out.Motor1_RunCommand; // Loopback simulation
END_IF;
```

### 3. Write Core Logic Using Only Logical Variables

Your main control logic (e.g., `Main_Control`, `Sequence_Logic`) should **never** reference a `%I`, `%Q`, or physical device address. It only reads `IO_In` and writes to `IO_Out`.

```st
// Routine: Main_Control
// Runs AFTER Map_Inputs

// Example Interlock Logic
IF IO_In.EmergencyStopOk AND IO_In.SystemAirPressureOk AND IO_In.Motor1_OverloadOk THEN
    SystemReady := TRUE;
ELSE
    SystemReady := FALSE;
    IO_Out.Motor1_RunCommand := FALSE; // Force motor off
END_IF;

// Example Control Logic
IF SystemReady AND AutoMode AND StartButton THEN
    IO_Out.Motor1_RunCommand := TRUE;
    IO_Out.Motor1_SpeedReference := 50.0; // 50% speed
END_IF;
```

### 4. Create the Output Mapping Routine

Create a routine (e.g., `Map_Outputs`) that runs at the **very end** of your task. Its sole job is to take the logical `IO_Out` structure, apply any final scaling or inversion, and write to the physical outputs.

```st
// Routine: Map_Outputs
// Runs LAST in the task scan

// 1. Map digital outputs
%QX0.0 := IO_Out.SystemReadyLamp;
%QX0.1 := IO_Out.SystemFaultHorn;

// 2. Map and scale analog outputs
// Scale logical 0-100% speed to raw 0-27648 analog output
%QW2 := REAL_TO_INT(SCALE_REAL(
    IN := IO_Out.Motor1_SpeedReference, 
    IN_MIN := 0.0, 
    IN_MAX := 100.0, 
    OUT_MIN := 0.0, 
    OUT_MAX := 27648.0
));
```

## Advanced Pattern: The Equipment Module (Function Block)

For repeated equipment (like 20 identical motors), combine the I/O mapping and control logic into a single Function Block (FB), but maintain the strict interface.

```st
FUNCTION_BLOCK FB_Motor
VAR_INPUT
    // Physical/Logical Inputs mapped from the outside
    In_RunFeedback : BOOL;
    In_OverloadOk : BOOL;
    
    // Control Commands
    Cmd_Start : BOOL;
    Cmd_Stop : BOOL;
END_VAR

VAR_OUTPUT
    // Physical/Logical Outputs mapped to the outside
    Out_RunContactor : BOOL;
    
    // Status
    Sts_Running : BOOL;
    Sts_Fault : BOOL;
END_VAR

VAR
    // Internal state
    statFaultTimer : TON;
END_VAR

// FB Logic:
// 1. Evaluate faults
IF NOT In_OverloadOk THEN
    Sts_Fault := TRUE;
    Out_RunContactor := FALSE;
END_IF;

// 2. Control Logic
IF Cmd_Start AND NOT Sts_Fault THEN
    Out_RunContactor := TRUE;
ELSIF Cmd_Stop THEN
    Out_RunContactor := FALSE;
END_IF;

// 3. Feedback Monitoring
statFaultTimer(IN := Out_RunContactor AND NOT In_RunFeedback, PT := T#2s);
IF statFaultTimer.Q THEN
    Sts_Fault := TRUE;
    Out_RunContactor := FALSE;
END_IF;

Sts_Running := In_RunFeedback;
```

**Usage in Main Program:**
```st
// 1. Map physical input to FB instance
Motor1(
    In_RunFeedback := %IX1.1,
    In_OverloadOk := %IX1.0,
    Cmd_Start := HMI_StartBtn,
    Cmd_Stop := HMI_StopBtn
);

// 2. Map FB instance output to physical output
%QX1.0 := Motor1.Out_RunContactor;
```

## Summary of Benefits

1. **Single Source of Truth:** Physical addresses only exist in exactly two places (`Map_Inputs` and `Map_Outputs`).
2. **Instant Simulation:** You can test the entire machine logic on your laptop by simply bypassing `Map_Inputs` and forcing the `IO_In` structure.
3. **Signal Conditioning:** Debouncing a flickering sensor is done once in `Map_Inputs`, protecting all downstream logic.
4. **Inversion Handling:** Dealing with Normally Open (NO) vs. Normally Closed (NC) sensors is handled cleanly in the mapping layer, so the core logic always works with positive "TRUE = OK" logic.

---
**References:**
- ISA-88 (S88) standard for batch control models
- Object-Oriented Programming (OOP) principles in IEC 61131-3