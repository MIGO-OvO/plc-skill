# Start-stop interlock template

## Purpose

Use for standard motor or actuator start/stop control with explicit permissives and interlocks.

## Suggested structure

- mode permissive
- start command
- stop command
- run latch or run state
- interlock block
- fault block

## ST skeleton

```st
IF bStopCmd OR bFaultActive OR NOT bInterlockOK THEN
    bRunCmd := FALSE;
ELSIF bStartCmd AND bModeAuto THEN
    bRunCmd := TRUE;
END_IF;
```

## Notes

- Keep stop, fault, and interlock inhibition ahead of start enable
- Make output ownership clear
- If seal-in behavior is used, make reset paths obvious
