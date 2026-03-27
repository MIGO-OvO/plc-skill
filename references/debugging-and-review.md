# Debugging and review workflow

Use this file when the user asks to troubleshoot, inspect, review, refactor, or explain why a PLC program behaves incorrectly.

## Debugging workflow

Start from observable behavior and narrow down:

1. What exactly is the abnormal behavior?
2. Which inputs, conditions, states, timers, counters, or outputs are involved?
3. Is the issue caused by:
   - missing input condition
   - wrong state transition
   - timer or counter not reaching condition
   - latch or reset logic conflict
   - output overwrite in another section
   - wrong assumption about scan behavior
4. Which facts are observed and which are only hypotheses?

## Review workflow

When reviewing code, inspect:

- module boundaries
- readability and naming clarity
- duplicate logic
- interlock completeness
- alarm hold and reset paths
- output ownership
- hidden state dependencies
- maintainability under future changes

## Refactoring preference

Refactor toward:

- clearer separation of concerns
- fewer conflicting writes
- explicit state handling
- reusable patterns
- easier online monitoring and testing
