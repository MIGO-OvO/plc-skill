# Sequence step template

## Purpose

Use for simple ordered process steps when a full state-machine explanation is not necessary.

## Suggested structure

- current step marker
- step completion condition
- next step transition
- timeout or abnormal branch
- reset branch

## ST skeleton

```st
IF iStep = 10 THEN
    IF bStep10Done THEN
        iStep := 20;
    ELSIF bStep10Timeout THEN
        iStep := 900;
    END_IF;
END_IF;
```

## Notes

- Make transitions explicit
- Avoid hidden writes to the same step variable in multiple places
- Keep timeout and fault transitions visible
