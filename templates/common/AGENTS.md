# Common Templates

Purpose: reusable PLC output patterns for generation, refactor, review, and diagnosis.

## Entry

- Start with `template-map.md`.
- Select the nearest template before writing custom logic.
- Combine template with vendor rules when syntax or memory model matters.

## Template Groups

| Need | Template |
| --- | --- |
| equipment module | `equipment-module-template.md` |
| start/stop control | `start-stop-interlock-template.md` |
| step sequence | `sequence-step-template.md`, `pause-resume-sequence-template.md` |
| state machine | `state-machine-template.md` |
| alarm/reset/interlock | `alarm-latch-reset-template.md`, `alarm-interlock-module-template.md` |
| timers/counters | `timer-counter-diagnostic-template.md` |
| overwrite review | `output-ownership-review-template.md` |
| analog/process | `analog-scaling-template.md`, `pid-control-template.md` |
| signal handling | `debounce-filter-template.md`, `edge-detection-template.md` |
| advanced | `motion-control-template.md`, `recipe-management-template.md`, `data-logging-template.md` |

## Rules

- Templates are vendor-neutral unless their own text says otherwise.
- Keep physical I/O mapping outside reusable logic.
- Prefer explicit state/output ownership over compact condition chains.
- Use review templates before rewriting large unknown code.

## Forbidden

- No vendor address syntax here.
- No full-project dumps.
- No safety certification claims.
- No duplicated style rules already in `references/common/`.
