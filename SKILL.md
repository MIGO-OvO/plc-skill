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

## Knowledge and evidence priority

Use sources in this order:

1. Local docs under `D:\GitHub projects\PLC_SKILL\docs`
2. Mitsubishi official manuals and official explanations
3. IEC 61131-3 related standards knowledge
4. PLCopen guidance
5. Project-local templates and examples
6. Community or forum material

Read `references/knowledge-priority.md` when evidence quality matters.

## Local docs first

Before relying on general knowledge, use the local documentation tree.

Start with:
- `references/doc-map.md`

Primary local knowledge root:
- `D:\GitHub projects\PLC_SKILL\docs\PLC_SKILL_KB`

Choose the narrowest relevant document area first:
- FX3U hardware -> hardware docs
- device / instruction behavior -> FX programming docs
- structured programming behavior -> FXCPU structured programming docs
- project organization -> GX Works2 structured project docs
- general language semantics -> IEC 61131-3 / PLCopen docs

## Required working behavior

Always:

- identify what is known
- identify what is assumed
- distinguish confirmed facts from inferences
- stay conservative in safety-related topics
- prefer structured and maintainable outputs over one-off code dumps

If local evidence is insufficient, say what category is missing.

## Input completeness rules

If information is incomplete, do not pretend certainty.

Use this rule:

- If PLC family / software / language is partly missing but FX3U + GX Works2 + ST is a reasonable working assumption, continue with explicit assumptions.
- If declarations, device allocation, or project structure are missing, provide a draft or template rather than claiming final code.
- If wiring, fail-safe behavior, field polarity, actuator behavior, or safety architecture are unconfirmed, do not give a final safety conclusion.

See `references/input-completeness-rules.md`.

## Task routing

First classify the request:

### 1. Generate new logic
Use when the user wants to create PLC logic from process requirements, sequence description, machine behavior, or control intent.

Read as needed:
- `references/mitsubishi-fx3u-rules.md`
- `references/fx3u-device-and-instruction-notes.md`
- `references/gxworks2-structured-project-deep-notes.md`
- `references/st-style-guide.md`
- `references/plcopen-and-iec-notes.md`
- `references/alarm-and-interlock-patterns.md`
- `references/program-templates.md`
- `references/output-format.md`

### 2. Explain existing code or logic
Use when the user provides ST, device lists, logic fragments, or asks what a block is doing.

Read as needed:
- `references/mitsubishi-fx3u-rules.md`
- `references/fx3u-device-and-instruction-notes.md`
- `references/st-style-guide.md`
- `references/plcopen-and-iec-notes.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/output-format.md`

### 3. Review or refactor code
Use when the user wants quality review, maintainability review, restructuring, ownership cleanup, modularization, or logic improvement.

Read as needed:
- `references/gxworks2-structured-project-deep-notes.md`
- `references/gxworks2-project-review-patterns.md`
- `references/st-style-guide.md`
- `references/plcopen-and-iec-notes.md`
- `references/alarm-and-interlock-patterns.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/debugging-and-review.md`
- `references/code-review-checklists.md`
- `references/output-format.md`

### 4. Debug or troubleshoot behavior
Use when the user reports abnormal behavior, wrong transitions, alarm issues, overwritten outputs, timer/counter problems, or scan-cycle surprises.

Read as needed:
- `references/mitsubishi-fx3u-rules.md`
- `references/gxworks2-structured-project-deep-notes.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/alarm-and-interlock-patterns.md`
- `references/debugging-and-review.md`
- `references/debugging-checklists.md`
- `references/safety-boundaries.md`
- `references/output-format.md`

## Output rules

Choose output format by task type.

### For code generation
Prefer:
1. Requirement understanding
2. Known conditions
3. Assumptions
4. Program structure
5. Variable or device mapping
6. ST code or pseudocode
7. Logic explanation
8. Risks and cautions
9. Test checklist

### For explanation
Prefer:
1. What the code appears to do
2. Confirmed facts
3. Assumptions
4. Scan-cycle interpretation
5. Risk points
6. Suggested checks

### For review / refactor
Prefer:
1. Overall assessment
2. Key issues
3. Why they matter
4. Refactoring direction
5. Revised structure or sample rewrite
6. Validation checklist

### For debugging
Prefer:
1. Observed symptom
2. Known facts
3. Hypotheses
4. Most likely fault paths
5. Step-by-step debug plan
6. Safe verification points
7. Likely code corrections

See `references/output-format.md`.

## Safety boundaries

If the request touches:
- emergency stop logic
- guard logic
- motion enable logic
- forced outputs
- bypass logic
- reset after fault or power cycle
- protection interlocks

do not present a confident final answer unless field conditions are confirmed.

Read:
- `references/safety-boundaries.md`

## Use bundled references selectively

Read only what the task needs:

- `references/scope-and-trigger-rules.md`
- `references/knowledge-priority.md`
- `references/doc-map.md`
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
