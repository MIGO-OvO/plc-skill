# Alarm interlock module template

## Purpose

Use for reusable alarm and interlock handling in FX3U ST projects where readability, reset behavior, and fault visibility matter.

## Recommended module responsibilities

Separate these concerns clearly:

1. permissive evaluation
2. interlock blocking
3. alarm trigger detection
4. alarm latch state
5. reset permissive
6. reset command handling
7. final run-enable decision

## Suggested variable roles

- `bRunRequest` : requested operation
- `bPermissiveOK` : process-side permissive summary
- `bInterlockOK` : safety / protection / logical block summary
- `bFaultTrigger` : raw fault trigger
- `bFaultActive` : latched fault state
- `bFaultResetCmd` : reset request
- `bResetPermissive` : conditions that must be true before reset
- `bRunEnable` : final allowed run state

## ST skeleton

```st
(* permissive / interlock summary *)
bRunEnable := FALSE;

IF bFaultTrigger THEN
    bFaultActive := TRUE;
END_IF;

IF bFaultResetCmd AND bResetPermissive AND NOT bFaultTrigger THEN
    bFaultActive := FALSE;
END_IF;

bInterlockOK := bGuardOK AND bPressureOK AND NOT bStopCmd;
bPermissiveOK := bAutoMode AND bSystemReady;

IF bRunRequest AND bPermissiveOK AND bInterlockOK AND NOT bFaultActive THEN
    bRunEnable := TRUE;
END_IF;
```

## Review checkpoints

- Is the fault trigger distinct from the latched fault state?
- Is reset permissive explicit?
- Can the fault immediately re-latch after reset?
- Is the final run decision written in one clear place?

## Debug checkpoints

- raw trigger still true?
- reset permissive false?
- another block rewriting `bRunEnable` or `bFaultActive`?
- process permissive confused with fault inhibit?
