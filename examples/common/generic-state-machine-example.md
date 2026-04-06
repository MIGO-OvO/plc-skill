# Generic IEC 61131-3 Sequence State Machine Example

## User prompt

"Help me design a generic IEC 61131-3 Structured Text state machine for a 3-step sequence. It must have clear state transitions, error handling, and separation between state logic and output logic."

## Expected skill behavior

- Provide a vendor-neutral IEC 61131-3 ST example.
- Use explicit `CASE` statements for the state machine.
- Separate state transition logic from physical output mapping.
- Include a robust reset/fault-recovery path.
- Avoid using vendor-specific prefixes or memory registers (like `%M`, `DB`, or `M0`).

## Why this example matters

This is the standard engineering baseline. When the user has not specified a vendor, the agent MUST fall back to pure IEC 61131-3 concepts. If the agent injects Siemens `DB` or Mitsubishi `M` devices here, it fails the vendor-neutrality test.

## Example Output Structure

```st
// State declaration (often done as ENUM in modern IDEs)
VAR
    StepState : INT := 0; // 0=Init, 10=Wait, 20=Process, 30=Complete, 99=Error
    ExecuteCmd : BOOL;
    ResetCmd : BOOL;
    SensorA : BOOL;
    TimerDelay : TON;
    
    // Outputs
    ValveCmd : BOOL;
    PumpCmd : BOOL;
    ErrorLight : BOOL;
END_VAR

// 1. State Transitions
CASE StepState OF
    0: // Init
        IF ExecuteCmd THEN
            StepState := 10;
        END_IF;

    10: // Wait for Sensor
        IF SensorA THEN
            StepState := 20;
        END_IF;

    20: // Process Delay
        IF TimerDelay.Q THEN
            StepState := 30;
        END_IF;

    30: // Complete
        IF NOT ExecuteCmd THEN
            StepState := 0;
        END_IF;

    99: // Error State
        IF ResetCmd THEN
            StepState := 0;
        END_IF;

    ELSE
        StepState := 99; // Fallback for invalid states
END_CASE;

// 2. Timers and Diagnostics
TimerDelay(IN := (StepState = 20), PT := T#5s);

// 3. Output Mapping (Done exactly once per output)
ValveCmd := (StepState = 10) OR (StepState = 20);
PumpCmd := (StepState = 20);
ErrorLight := (StepState = 99);
```
