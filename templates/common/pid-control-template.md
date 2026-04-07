---
trigger: "PID loop logic", "temperature control", "process control block", "analog control loop", "pid"
use-case: "A standard, vendor-neutral wrapper for implementing process control loops (temperature, pressure, flow, etc.) that ensures consistent behavior across different PLC platforms."
requirements: "IEC 61131-3 standard environment. Requires a vendor-specific PID instruction to be instantiated inside the wrapper."
---

# PID Control Wrapper Template

## Purpose

This template provides a standardized interface for process control loops. Because every vendor (Siemens, Rockwell, Mitsubishi) implements the actual PID math differently, this template acts as a uniform wrapper that handles standard boilerplate logic: Setpoint limiting, Auto/Manual modes, and CV clamping.

## UDT Definitions

Use these structures to group PID parameters and status feedback logically, keeping the Function Block interface clean.

```iecst
TYPE stPID_Config :
STRUCT
    rKp : REAL;            (* Proportional Gain *)
    rTi : REAL;            (* Integral Time (Reset) *)
    rTd : REAL;            (* Derivative Time (Rate) *)
    rSP_Max : REAL;        (* Setpoint High Limit *)
    rSP_Min : REAL;        (* Setpoint Low Limit *)
    rCV_Max : REAL;        (* Control Variable High Limit *)
    rCV_Min : REAL;        (* Control Variable Low Limit *)
    bReverseActing : BOOL; (* TRUE = Reverse Acting (Cooling), FALSE = Direct Acting (Heating) *)
END_STRUCT
END_TYPE

TYPE stPID_Status :
STRUCT
    bInAuto : BOOL;          (* TRUE = Auto Mode, FALSE = Manual Mode *)
    bSP_LimitActive : BOOL;  (* Setpoint is being clamped to limits *)
    bCV_LimitActive : BOOL;  (* Output is being clamped to limits *)
    bError : BOOL;           (* PID Error State (e.g. invalid parameters) *)
    wErrorCode : WORD;       (* Vendor specific error code *)
END_STRUCT
END_TYPE
```

## ST Implementation

```iecst
FUNCTION_BLOCK fbPID_Wrapper
VAR_INPUT
    bEnable : BOOL;          (* Block enable / Process running permissive *)
    bAutoMode : BOOL;        (* TRUE = Auto (PID active), FALSE = Manual (Operator control) *)
    rPV : REAL;              (* Process Variable (Feedback from sensor) *)
    rSP_Req : REAL;          (* Requested Setpoint (Used in Auto mode) *)
    rCV_Man : REAL;          (* Requested Output (Used in Manual mode) *)
    stConfig : stPID_Config; (* Configuration parameters *)
END_VAR

VAR_OUTPUT
    rCV_Out : REAL;          (* Final Control Variable Output (to actuator/valve) *)
    rSP_Active : REAL;       (* Active limited Setpoint *)
    stStatus : stPID_Status; (* Status feedback *)
END_VAR

VAR
    rCV_Internal : REAL;     (* Internal PID math output *)
    rCV_PreLimit : REAL;     (* Output before final clamping applied *)
    
    // VENDOR SPECIFIC PID INSTANCE HERE
    // fbVendorPID : PID_STANDARD_BLOCK;
END_VAR

(* -----------------------------------------------------------------------------
   1. Setpoint Limiting
----------------------------------------------------------------------------- *)
IF rSP_Req > stConfig.rSP_Max THEN
    rSP_Active := stConfig.rSP_Max;
    stStatus.bSP_LimitActive := TRUE;
ELSIF rSP_Req < stConfig.rSP_Min THEN
    rSP_Active := stConfig.rSP_Min;
    stStatus.bSP_LimitActive := TRUE;
ELSE
    rSP_Active := rSP_Req;
    stStatus.bSP_LimitActive := FALSE;
END_IF;

(* -----------------------------------------------------------------------------
   2. Auto / Manual Mode Selection & Bumpless Transfer
----------------------------------------------------------------------------- *)
stStatus.bInAuto := bAutoMode AND bEnable;

IF stStatus.bInAuto THEN
    (* 
       AUTO MODE
       Bumpless transfer is typically handled by the vendor instruction.
       When transitioning from Manual to Auto, the vendor block must initialize 
       its integral accumulator so the calculated output matches the last manual CV.
    *)
    
    // VENDOR SPECIFIC PID INSTRUCTION HERE
    // Example: 
    // fbVendorPID(
    //     Enable := TRUE,
    //     ManualMode := FALSE,
    //     PV := rPV,
    //     SP := rSP_Active,
    //     Kp := stConfig.rKp,
    //     Ti := stConfig.rTi,
    //     Td := stConfig.rTd,
    //     CV => rCV_Internal
    // );
    
    rCV_PreLimit := rCV_Internal;

ELSE
    (* 
       MANUAL MODE
       Pass the manual command directly to the output.
       The vendor block usually needs to be forced to track rCV_Man so that 
       its internal state is ready for a bumpless return to Auto.
    *)
    
    // VENDOR SPECIFIC PID TRACKING / MANUAL OVERRIDE HERE
    // Example:
    // fbVendorPID(
    //     Enable := TRUE, 
    //     ManualMode := TRUE, 
    //     ManualCV := rCV_Man,
    //     ...
    // );

    rCV_PreLimit := rCV_Man;
END_IF;

(* -----------------------------------------------------------------------------
   3. Output (CV) Limiting & Anti-Windup
----------------------------------------------------------------------------- *)
IF rCV_PreLimit > stConfig.rCV_Max THEN
    rCV_Out := stConfig.rCV_Max;
    stStatus.bCV_LimitActive := TRUE;
    
    // ANTI-WINDUP HOOK
    // Vendor PID needs to be notified that the output is saturated high
    // fbVendorPID.MaxLimitReached := TRUE;
    
ELSIF rCV_PreLimit < stConfig.rCV_Min THEN
    rCV_Out := stConfig.rCV_Min;
    stStatus.bCV_LimitActive := TRUE;
    
    // ANTI-WINDUP HOOK
    // Vendor PID needs to be notified that the output is saturated low
    // fbVendorPID.MinLimitReached := TRUE;
    
ELSE
    rCV_Out := rCV_PreLimit;
    stStatus.bCV_LimitActive := FALSE;
END_IF;

(* -----------------------------------------------------------------------------
   4. Block Disable State
----------------------------------------------------------------------------- *)
IF NOT bEnable THEN
    rCV_Out := 0.0; // Fail-safe output state when loop is disabled
    stStatus.bInAuto := FALSE;
    stStatus.bSP_LimitActive := FALSE;
    stStatus.bCV_LimitActive := FALSE;
    
    // Reset/disable vendor PID block
    // fbVendorPID(Enable := FALSE);
END_IF;
```