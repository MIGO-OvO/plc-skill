# State machine template

## Purpose

Use for step-based machine or process control in IEC 61131-3 ST projects.

## Suitable for

- sequential machine behavior
- explicit step transitions
- readable startup / run / stop / fault handling

## Suggested structure

- current state
- next-state conditions
- state entry actions if needed
- state-owned outputs
- fault / interlock override
- reset path

## ST skeleton

```st
CASE iState OF

    0: (* Idle *)
        bMotorRun := FALSE;
        IF bAutoMode AND bStartCmd AND NOT bFaultActive THEN
            iState := 10;
        END_IF;

    10: (* Pre-start checks *)
        IF bInterlockOK THEN
            iState := 20;
        ELSIF bFaultActive THEN
            iState := 900;
        END_IF;

    20: (* Run *)
        bMotorRun := TRUE;
        IF bStopCmd THEN
            iState := 0;
        ELSIF bFaultActive THEN
            iState := 900;
        END_IF;

    900: (* Fault *)
        bMotorRun := FALSE;
        IF bFaultResetCmd AND NOT bFaultActive THEN
            iState := 0;
        END_IF;

END_CASE;
```

## Notes

- Keep outputs owned by the active state where possible
- Keep fault transitions explicit
- Keep reset conditions separate from normal transitions
