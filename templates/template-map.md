# Template map

Use this file to choose the nearest reusable template before writing a large custom answer.

## Template selection

- Start / stop motor or actuator control
  - `templates/start-stop-interlock-template.md`
  - Use when the main problem is request, permissive, inhibit, and output separation.

- Sequence flow with explicit steps
  - `templates/sequence-step-template.md`
  - Use when the process is mainly linear and each step can be described clearly.

- State-based machine control
  - `templates/state-machine-template.md`
  - Use when transitions, fault branches, and online visibility matter.

- Alarm latch, hold, and reset behavior
  - `templates/alarm-latch-reset-template.md`
  - Use when repeated relatch, reset conditions, and fault memory are the focus.

- Alarm/interlock module design
  - `templates/alarm-interlock-module-template.md`
  - Use when protective conditions must stay separate from main sequence logic.

- Timer / counter diagnosis
  - `templates/timer-counter-diagnostic-template.md`
  - Use when the issue is timing visibility, counting conditions, or edge-sensitive behavior.

- Output ownership review
  - `templates/output-ownership-review-template.md`
  - Use when one output may be written by multiple sections or states.

## Selection rules

- Prefer `state-machine-template.md` over flat condition chains for expandable sequence logic.
- Prefer `alarm-latch-reset-template.md` when the fault memory and reset path are the main issue.
- Prefer `output-ownership-review-template.md` before proposing code rewrite for ownership conflicts.
- Prefer a compact template plus assumptions when requirements are incomplete.

