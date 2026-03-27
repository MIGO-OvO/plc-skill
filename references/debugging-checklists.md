# Debugging checklists

Use this file for troubleshooting tasks.

## Quick fault isolation checklist

Check in this order when possible:

1. Is the observed symptom clearly defined?
2. Which input conditions are expected but missing?
3. Which state / step should be active right now?
4. Are timers / counters reaching their expected condition?
5. Is the output written in more than one place?
6. Is a reset condition clearing a latch unexpectedly?
7. Is an interlock blocking the transition?
8. Is scan order affecting the visible result?
9. Does online monitoring match the mental model?
10. Is the problem logic-side, device-side, or field-side?

## Alarm troubleshooting checklist

- alarm trigger condition
- latch condition
- hold condition
- reset condition
- reset permissive condition
- whether another block re-latches immediately
- whether alarm state and HMI state are consistent

## Sequence troubleshooting checklist

- current step
- step entry condition
- step exit condition
- timeout condition
- reset path
- manual/auto mode interaction
- whether outputs are step-owned or globally overwritten

## Output overwrite checklist

- list every location that writes the output
- identify intended owner
- check later logic blocks in scan order
- check force / manual mode / reset sections
- check startup initialization logic
