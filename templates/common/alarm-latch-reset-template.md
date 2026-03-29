# Alarm latch and reset template

## Purpose

Use for alarm set, hold, display, and reset logic that must remain readable and easy to debug.

## Suitable for

- process alarms
- timeout alarms
- permissive-loss alarms
- resettable fault states

## Suggested structure

- alarm trigger condition
- latch behavior
- hold behavior
- reset permissive condition
- reset command handling
- re-latch prevention check

## ST skeleton

```st
IF bAlarmTrigger THEN
    bAlarmActive := TRUE;
END_IF;

IF bAlarmResetCmd AND bResetPermissive AND NOT bAlarmTrigger THEN
    bAlarmActive := FALSE;
END_IF;
```

## Notes

- Keep set and reset conditions explicit
- Prevent immediate re-latch after reset when possible
- Separate alarm source from HMI acknowledge if they are different concerns
