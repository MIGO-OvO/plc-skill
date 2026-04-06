# Generic Motor Start-Stop with Interlocks Example

## User prompt

"I need a basic motor start/stop control in Structured Text. It has a Start button, a Stop button, and an Overload thermal relay. If the overload trips, the motor must stop and cannot be restarted until reset."

## Expected skill behavior

- Provide vendor-neutral IEC 61131-3 logic.
- Use standard `BOOL` variables instead of physical addresses.
- Explicitly demonstrate the failsafe principle (e.g., normally closed stop button logic).
- Separate the alarm latching from the motor command output.
- Avoid using specific vendor instructions like `SET`/`RST` vs `S`/`R` vs `LATCH`/`UNLATCH` unless mapped to pure boolean logic.

## Why this example matters

Motor control is the "Hello World" of PLC programming, but it contains critical safety and interlock principles. A good AI response must handle the Overload condition as a latched fault, rather than just wiring it in series with the Stop button.

## Example Output Structure

```st
VAR
    // Inputs (Assume Failsafe: Stop and Overload are Normally Closed = TRUE when OK)
    DI_StartBtn : BOOL;
    DI_StopBtn_NC : BOOL; 
    DI_Overload_NC : BOOL;
    DI_ResetBtn : BOOL;
    
    // Internal
    Alarm_OverloadTripped : BOOL;
    MotorRunRequest : BOOL;
    
    // Output
    DO_MotorContactor : BOOL;
END_VAR

// 1. Fault Latching
IF NOT DI_Overload_NC THEN
    Alarm_OverloadTripped := TRUE;
ELSIF DI_ResetBtn THEN
    Alarm_OverloadTripped := FALSE;
END_IF;

// 2. Control Logic (Self-holding circuit)
IF DI_StartBtn AND DI_StopBtn_NC AND NOT Alarm_OverloadTripped THEN
    MotorRunRequest := TRUE;
ELSIF NOT DI_StopBtn_NC OR Alarm_OverloadTripped THEN
    MotorRunRequest := FALSE;
END_IF;

// 3. Final Output Mapping
DO_MotorContactor := MotorRunRequest AND DI_StopBtn_NC AND NOT Alarm_OverloadTripped;
```
