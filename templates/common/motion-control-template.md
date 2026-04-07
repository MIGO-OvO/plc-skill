---
trigger: "motion control", "servo axis", "PLCopen motion", "MC_MoveAbsolute", "axis enable"
use-case: "A reusable PLCopen Part 1 sequence skeleton for powering, homing, commanding, and fault-handling an axis."
requirements: "Vendor must support PLCopen-style motion function blocks or an equivalent motion abstraction."
---

# Motion Control Template

## Purpose

Use this template for single-axis motion sequences that need explicit enable, home, move, stop, and fault states.

## Suitable for

- servo enable / disable sequences
- homing workflows
- position moves with clear command ownership
- motion error handling and reset paths

## Suggested structure

- axis command request layer
- rising-edge command handling
- axis state machine
- motion FB instance area
- error and reset handling

## Skeleton

```iecst
CASE iAxisState OF

    0: (* Disabled *)
        fbPower(Enable := FALSE, Axis := AxisRef);
        IF bEnableReq THEN
            iAxisState := 10;
        END_IF;

    10: (* Powering *)
        fbPower(Enable := TRUE, Axis := AxisRef);
        IF fbPower.Status THEN
            iAxisState := 20;
        ELSIF fbPower.Error THEN
            iAxisState := 900;
        END_IF;

    20: (* Homing / Ready decision *)
        IF bHomeRequired THEN
            fbHome(Axis := AxisRef, Execute := bHomeReq);
            IF fbHome.Done THEN
                iAxisState := 30;
            ELSIF fbHome.Error THEN
                iAxisState := 900;
            END_IF;
        ELSE
            iAxisState := 30;
        END_IF;

    30: (* Ready *)
        IF bMoveAbsReq THEN
            iAxisState := 40;
        ELSIF bStopReq THEN
            iAxisState := 50;
        END_IF;

    40: (* Move absolute *)
        fbMoveAbs(
            Axis := AxisRef,
            Execute := bMoveAbsReq,
            Position := rTargetPos,
            Velocity := rTargetVel
        );
        IF fbMoveAbs.Done THEN
            iAxisState := 30;
        ELSIF fbMoveAbs.Error THEN
            iAxisState := 900;
        END_IF;

    50: (* Controlled stop *)
        fbStop(Axis := AxisRef, Execute := bStopReq);
        IF fbStop.Done THEN
            iAxisState := 30;
        ELSIF fbStop.Error THEN
            iAxisState := 900;
        END_IF;

    900: (* Fault *)
        IF bResetReq AND NOT bAxisFaultActive THEN
            iAxisState := 0;
        END_IF;

END_CASE;
```

## Notes

- Edge handling for motion `Execute` inputs is usually vendor-sensitive.
- Keep one clear owner for each motion command.
- Keep power, home, move, and stop transitions explicit for online debugging.
