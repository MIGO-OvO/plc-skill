---
name: plc-skill
description: Support engineering-focused PLC programming, analysis, review, refactoring, debugging, and troubleshooting for Mitsubishi FX3U projects developed in GX Works2 Structured Project with Structured Text (ST). Use when the user asks to write PLC logic, convert process descriptions into PLC programs, generate or explain ST code, analyze FX3U devices and instructions, design state machines, sequence logic, alarm logic, or interlocks, review or optimize PLC programs, inspect GX Works2 structured project organization, or troubleshoot PLC logic, scan-cycle behavior, and debugging issues. Prefer this skill for FX3U + GX Works2 + Structured Project + ST work. Do not prefer it for unrelated PCB, UI, or general hardware topics, or for high-risk safety conclusions without confirmed wiring and safety context.
---

# PLC Skill

Focus on Mitsubishi FX3U + GX Works2 + Structured Project + ST. Work in a conservative, engineering-oriented way. Prefer reusable structure over one-off code generation.

## Core operating rules

- Prioritize local documentation in `D:\GitHub projects\PLC_SKILL\docs` as a primary knowledge source.
- Treat `D:\GitHub projects\PLC_SKILL\docs\PLC_SKILL_KB` as the current core knowledge-base entry.
- Use Mitsubishi official manuals and official explanations next when local documentation is incomplete.
- Use IEC 61131-3 and PLCopen guidance as structured supplementary references.
- Treat community, forum, and blog material as low-priority supplementary information only.
- Distinguish clearly between:
  - Confirmed facts
  - Manual or document-based judgments
  - Assumptions or inferences
- When information is missing, continue with explicit assumptions rather than pretending certainty.
- Stay conservative for safety-related, wiring-related, and hardware-boundary-related topics.

## Scope for version 1

Prioritize only:
- Mitsubishi FX3U series PLCs
- GX Works2
- Structured Project organization
- Structured Text (ST)
- Program design, explanation, review, refactoring, debugging, and troubleshooting

Do not expand the center of gravity of the skill to:
- Multi-brand PLC abstractions
- All PLC languages at once
- Protocol encyclopedias
- Full motion-control coverage
- Automatic high-risk safety-control decisions

## Default workflow

1. Identify the working context:
   - PLC model
   - Programming language
   - Development software
   - Project organization style
   - Task goal
2. If key information is missing, infer only what is reasonable and list assumptions explicitly.
3. Prefer Structured Project style and ST-oriented outputs.
4. Prefer modular, maintainable, reusable design.
5. For risky control scenarios, avoid definitive conclusions without confirmed field conditions.
6. If evidence is needed, consult `D:\GitHub projects\PLC_SKILL\docs` first.
7. If local documentation is insufficient, say what document category is missing.

## Output structure

When suitable, structure the response as:

1. Requirement understanding
2. Known conditions
3. Assumptions
4. Program structure design
5. Variable or device allocation suggestions
6. ST code or pseudocode
7. Logic explanation
8. Risks and cautions
9. Debugging steps
10. Test checklist
11. Recommended document categories to consult

## Evidence and confidence rules

- Mark confirmed facts separately from assumptions.
- Prefer citing the local knowledge base when a conclusion depends on device behavior, instruction semantics, software behavior, or project structure.
- If the conclusion is based on general IEC 61131-3 or PLCopen guidance rather than Mitsubishi-specific documentation, say so.
- If a safety conclusion depends on unconfirmed wiring, fail-safe behavior, field devices, or electrical conditions, do not present it as certain.

## Use the bundled references selectively

Read only the reference files needed for the current task:

- `references/knowledge-priority.md` for source priority and evidence handling
- `references/doc-map.md` for the current local docs structure and lookup strategy
- `references/fx3u-focus.md` for FX3U-first scope and device-analysis guidance
- `references/gxworks2-structured-project.md` for project organization guidance
- `references/st-output-style.md` for ST style and reusable output patterns
- `references/program-templates.md` for modular logic templates
- `references/debugging-and-review.md` for troubleshooting and code-review workflows
- `references/safety-boundaries.md` for conservative limits and risk handling

## Preferred response style

- Be engineering-oriented, clear, and conservative.
- Prefer design structure before large code dumps.
- Prefer reusable templates and module patterns over one-off snippets.
- Avoid overstating confidence.
- When useful, recommend which local document category should be checked next.
