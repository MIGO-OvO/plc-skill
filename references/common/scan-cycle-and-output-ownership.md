# Scan cycle and output ownership

Use this file when the user asks about overwritten outputs, surprising run behavior, reset conflicts, or scan-related troubleshooting.

## Why this matters

In PLC troubleshooting, many "mysterious" faults are not mysterious at all:

- the expected condition never becomes true
- the state transition never occurs
- the output is written later by another section
- a reset path clears a latch unexpectedly
- the trigger condition remains true, so the bit sets again on the next scan

## Output ownership rule

Prefer every important output, state bit, or alarm state to have one obvious owner.

If multiple sections affect the same target:

- make the priority explicit
- make the ownership explicit
- explain why the design is still maintainable

Otherwise, review and troubleshooting quality drops quickly.

## Common scan-related fault patterns

### Pattern 1: Output is set, then overwritten
Symptoms:
- online monitoring shows the condition is true
- output still does not stay on

Likely causes:
- later logic block writes FALSE
- manual mode or reset logic overrides it
- startup/initialization logic still owns the output

### Pattern 2: Alarm resets, then comes back immediately
Symptoms:
- reset command is accepted briefly
- alarm returns on next scan

Likely causes:
- source condition is still true
- reset permissive is incomplete
- another block re-latches it

### Pattern 3: Step never advances
Symptoms:
- sequence remains in one step
- expected transition never occurs

Likely causes:
- transition condition never becomes true
- timer/counter never reaches done condition
- interlock blocks the transition
- another place rewrites the step/state variable

## Preferred debugging order

1. define the symptom precisely
2. identify the target bit / state / output
3. list all known writers of that target
4. identify the intended owner
5. inspect transition, reset, and inhibit conditions
6. confirm whether the issue is logic-side or field-side

## Review rule

When reviewing ST or structured-project logic, treat output ownership as a primary engineering concern, not a cosmetic issue.

Prioritize findings that reveal:
- conflicting writes
- hidden state dependencies
- unclear step ownership
- reset interactions that are hard to observe online

## Response rule

When answering scan-cycle or overwrite questions:

- separate observed facts from likely hypotheses
- show the most likely fault path first
- give a concrete monitoring checklist
- avoid claiming certainty if the full writer list is not known
