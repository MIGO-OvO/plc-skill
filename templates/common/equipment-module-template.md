# Standard Equipment Module Template

This template defines the standard structure for a reusable equipment module (e.g., a Motor, a Valve, a Heater). 
The goal is to provide a unified block that handles Faults, Modes (Auto/Manual), and Commands entirely decoupled from hardware I/O.

## Philosophy
1. **Low Coupling:** The block does not read physical inputs (I) or write physical outputs (Q) directly.
2. **High Cohesion:** The block manages its own state, alarms, and mode transitions internally.
3. **UDT / Struct Interfaces:** Group I/O and parameters into logical structures.

## Standard Interface Definition (Pseudo-ST)

```iecst
(* --- Data Types (UDTs) --- *)
TYPE UDT_Equip_Command :
STRUCT
    CmdStart  : BOOL; // Auto command to start
    CmdStop   : BOOL; // Auto command to stop
    ReqManual : BOOL; // Request Manual Mode
    ReqAuto   : BOOL; // Request Auto Mode
    ReqReset  : BOOL; // Reset Faults
    ManualFwd : BOOL; // Manual Jog Forward
    ManualRev : BOOL; // Manual Jog Reverse
END_STRUCT
END_TYPE

TYPE UDT_Equip_Status :
STRUCT
    IsRunning : BOOL; // Actuator is currently active
    IsFaulted : BOOL; // Equipment has an active fault
    ModeAuto  : BOOL; // True = Auto, False = Manual
    Ready     : BOOL; // Ready to start (No interlocks, no faults)
END_STRUCT
END_TYPE

TYPE UDT_Equip_Interlock :
STRUCT
    EStopOK      : BOOL; // Emergency stop OK
    SafetyDoorOK : BOOL; // Safety guard OK
    ThermalOK    : BOOL; // Thermal overload OK
END_STRUCT
END_TYPE
```

## Module Logic Template (ST)

```iecst
FUNCTION_BLOCK FB_Equipment_Module
VAR_INPUT
    Commands    : UDT_Equip_Command;
    Interlocks  : UDT_Equip_Interlock;
    Feedbacks   : BOOL; // E.g., Contactor feedback
END_VAR

VAR_OUTPUT
    Status      : UDT_Equip_Status;
    OutStartRun : BOOL; // Command to physical output
END_VAR

VAR
    AlarmFaulted : BOOL;
    StateRunning : BOOL;
    StateAuto    : BOOL;
END_VAR

// 1. Fault Handling & Interlocks
IF NOT Interlocks.EStopOK OR NOT Interlocks.SafetyDoorOK OR NOT Interlocks.ThermalOK THEN
    AlarmFaulted := TRUE;
END_IF;

IF Commands.ReqReset AND NOT (NOT Interlocks.EStopOK OR NOT Interlocks.SafetyDoorOK OR NOT Interlocks.ThermalOK) THEN
    AlarmFaulted := FALSE;
END_IF;

Status.IsFaulted := AlarmFaulted;

// 2. Mode Selection (Auto/Manual)
IF Commands.ReqAuto AND NOT AlarmFaulted THEN
    StateAuto := TRUE;
ELSIF Commands.ReqManual OR AlarmFaulted THEN
    StateAuto := FALSE;
END_IF;

Status.ModeAuto := StateAuto;

// 3. Command Execution & Run Logic
IF AlarmFaulted THEN
    StateRunning := FALSE;
ELSIF StateAuto THEN
    // Auto Mode Logic
    IF Commands.CmdStart THEN
        StateRunning := TRUE;
    ELSIF Commands.CmdStop THEN
        StateRunning := FALSE;
    END_IF;
ELSE
    // Manual Mode Logic
    // Manual overrides require constant hold (jog) or explicit latches
    StateRunning := Commands.ManualFwd AND NOT Commands.ManualRev;
END_IF;

// 4. Output Mapping
OutStartRun := StateRunning;
Status.IsRunning := StateRunning;
Status.Ready := NOT AlarmFaulted AND StateAuto;
```

## Checklist for Implementation
- [ ] Are all hardware interlocks handled at the top of the block before commands are evaluated?
- [ ] Does falling into a fault automatically stop the equipment?
- [ ] Does requesting Manual mode cancel any active Auto run states?
- [ ] Is the output `OutStartRun` cleanly separated from physical I/O to allow for simulation or forcing?