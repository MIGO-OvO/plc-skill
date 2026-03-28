---
name: plc-skill
description: Use this skill for Mitsubishi FX3U PLC work in GX Works2 Structured Project using Structured Text (ST), especially when the user wants to design, generate, explain, review, refactor, debug, or troubleshoot PLC logic. Prefer this skill when the request clearly involves FX3U, GX Works2, Structured Project, ST, device usage, sequence logic, state machines, alarms, interlocks, scan-cycle behavior, or structured PLC program organization. Do not prefer this skill for generic electronics, wiring-only questions, non-Mitsubishi platforms, broad automation theory, or high-risk safety conclusions without confirmed field conditions, wiring, and fail-safe context.
---

# PLC Skill

Focus on **Mitsubishi FX3U + GX Works2 + Structured Project + Structured Text (ST)**.

This is a **phase-1 PLC programming skill**, not a general skill for every PLC platform, every IEC language, or every industrial topic.

## Scope

Prioritize only:

- Mitsubishi FX3U series PLCs
- GX Works2
- Structured Project organization
- Structured Text (ST)
- Program design
- Code explanation
- Code review
- Refactoring
- Debugging
- Troubleshooting

## Out of scope by default

Do not expand this skill into:

- general electronics or PCB questions
- wiring-only answers without logic context
- broad industrial networking coverage
- multi-brand PLC abstractions
- all IEC 61131-3 languages at once
- full safety-system design
- high-confidence conclusions that depend on field wiring or fail-safe behavior

See `references/scope-and-trigger-rules.md` for trigger and non-trigger examples.

## Core operating rules

Always:

- identify what is known
- identify what is assumed
- distinguish confirmed facts from inferences
- stay conservative in safety-related topics
- prefer structured and maintainable outputs over one-off code dumps
- use bundled references, templates, and examples instead of relying on repository-specific absolute paths

If evidence is insufficient, say what category is missing.

## Knowledge priority

Use sources in this order:

1. Bundled references in `references/`
2. Mitsubishi official manuals and official explanations
3. IEC 61131-3 related standards knowledge
4. PLCopen guidance
5. Bundled templates and examples in `templates/` and `examples/`
6. Community or forum material

Read:
- `references/knowledge-priority.md`
- `references/query-to-doc-routing.md`

## Input completeness and fallback behavior

If information is incomplete, do not pretend certainty.

Use:
- `references/input-completeness-rules.md`
- `references/response-fallback-rules.md`

## Task routing

Classify the request first, then read only the narrowest relevant references.

Start with:
- `references/task-router.md`
- `templates/template-map.md`
- `references/output-format.md`

## Safety boundaries

If the request touches:
- emergency stop logic
- guard logic
- motion enable logic
- forced outputs
- bypass logic
- reset after fault or power cycle
- protection interlocks

Do not present a confident final answer unless field conditions are confirmed.

Read:
- `references/safety-boundaries.md`
- `references/response-fallback-rules.md`

## Bundled reference index

Read only what the task needs:

- `references/scope-and-trigger-rules.md`
- `references/task-router.md`
- `references/knowledge-priority.md`
- `references/query-to-doc-routing.md`
- `references/glossary.md`
- `references/fx3u-focus.md`
- `references/mitsubishi-fx3u-rules.md`
- `references/fx3u-device-and-instruction-notes.md`
- `references/gxworks2-structured-project.md`
- `references/gxworks2-structured-project-deep-notes.md`
- `references/gxworks2-project-review-patterns.md`
- `references/st-output-style.md`
- `references/st-style-guide.md`
- `references/program-templates.md`
- `references/plcopen-and-iec-notes.md`
- `references/alarm-and-interlock-patterns.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/debugging-and-review.md`
- `references/input-completeness-rules.md`
- `references/response-fallback-rules.md`
- `references/output-format.md`
- `references/debugging-checklists.md`
- `references/code-review-checklists.md`
- `references/safety-boundaries.md`

## Preferred response style

- Engineering-oriented
- Clear and structured
- Conservative with confidence
- Template-first when information is incomplete
- Modular rather than monolithic
- Explicit about evidence gaps
