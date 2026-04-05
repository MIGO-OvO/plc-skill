# Sequence Pause and Resume Template

Handling a sequence (state machine) that needs to "Pause" mid-cycle and "Resume" safely without resetting to step 0 is one of the most common industrial challenges. 

## Philosophy
1. **Interrupt, don't destroy:** The sequence step integer (`StepSeq`) should remain at its current value during a pause.
2. **Safe Output Suppression:** When paused, actuators (like cylinders or motors) should gracefully stop or hold position, preventing motion without killing the logical tracking.

## Template Code (ST)

```iecst
(* --- Types --- *)
TYPE UDT_Seq_Status :
STRUCT
    IsRunning : BOOL;
    IsPaused  : BOOL;
    IsFaulted : BOOL;
    StepSeq   : INT;
END_STRUCT
END_TYPE

(* --- Variables --- *)
VAR
    Status     : UDT_Seq_Status;
    CmdStart   : BOOL;
    CmdPause   : BOOL;
    CmdStop    : BOOL;  // Aborts the sequence completely
    Cond_Step1_Done : BOOL;
    Cond_Step2_Done : BOOL;
    
    // Outputs
    OutValveA  : BOOL;
    OutMotorB  : BOOL;
END_VAR

(* --- Sequence Control Logic --- *)

// 1. Abort / Reset
IF CmdStop OR Status.IsFaulted THEN
    Status.StepSeq := 0;
    Status.IsRunning := FALSE;
    Status.IsPaused := FALSE;
END_IF;

// 2. Start / Resume
IF CmdStart AND NOT Status.IsFaulted THEN
    Status.IsRunning := TRUE;
    Status.IsPaused := FALSE;
    
    // Kickoff if at step 0
    IF Status.StepSeq = 0 THEN
        Status.StepSeq := 10;
    END_IF;
END_IF;

// 3. Pause
IF CmdPause AND Status.IsRunning THEN
    Status.IsRunning := FALSE;
    Status.IsPaused := TRUE;
END_IF;

(* --- State Machine --- *)

// Only advance steps if we are actively running (NOT paused)
IF Status.IsRunning THEN
    CASE Status.StepSeq OF
        
        0: // Idle state
            OutValveA := FALSE;
            OutMotorB := FALSE;

        10: // Step 1: Extend Valve A
            OutValveA := TRUE;
            IF Cond_Step1_Done THEN
                Status.StepSeq := 20;
            END_IF;

        20: // Step 2: Start Motor B
            OutMotorB := TRUE;
            IF Cond_Step2_Done THEN
                Status.StepSeq := 30;
            END_IF;

        30: // Sequence Complete
            Status.StepSeq := 0;
            Status.IsRunning := FALSE;
    END_CASE;
END_IF;

(* --- Safe Paused Overrides (Output Mapping) --- *)
// If paused, we might need to drop certain outputs safely while maintaining the StepSeq
IF Status.IsPaused THEN
    // Example: Drop motor immediately upon pause, but keep valve extended
    OutMotorB := FALSE; 
END_IF;
```

## Checklist
- [ ] Have you defined which outputs must drop safely during a pause and which must hold?
- [ ] Does `CmdStop` properly return the `StepSeq` back to `0`?
- [ ] Are step transitions completely blocked while `IsRunning` is `FALSE`?