# Timer counter diagnostic template

## Purpose

Use when diagnosing why a timer never finishes, a counter never reaches target, or done-dependent logic never executes.

## Diagnostic order

Always inspect in this order:

1. enable condition
2. reset condition
3. done / target condition
4. downstream transition logic
5. conflicting writes or repeated reinitialization

## Diagnostic worksheet

### Known symptom
- What exactly is not happening?

### Related element
- Which timer or counter is involved?

### Enable path
- What must be true for it to run?
- Is that condition stable across scans?

### Reset path
- What clears it?
- Is reset occurring unexpectedly every scan?

### Completion path
- What should happen when done is true?
- Is another condition still blocking the transition?

### Ownership checks
- Is the associated state/step rewritten elsewhere?
- Is the timer/counter value indirectly invalidated by another block?

## Output format recommendation

1. symptom
2. known facts
3. likely failure point
4. monitoring checklist
5. likely code correction

## Common findings

- enable condition pulses too briefly
- reset condition is still active
- done condition is reached but transition is blocked elsewhere
- counter event is not edge-valid in the intended way
- the same state variable is overwritten by another section
