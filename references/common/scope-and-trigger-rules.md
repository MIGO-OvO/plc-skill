# Scope and trigger rules

Use this file when deciding whether this skill should handle a request.

## Primary trigger conditions

Prefer this skill when the request clearly involves one or more of:

- PLC logic design or explanation
- sequence control, step flow, or state machines
- alarm, latch, reset, or interlock logic
- timer, counter, edge-trigger, or scan-cycle behavior
- I/O mapping or program structuring
- Structured Text (ST), Ladder Diagram (LD), Function Block Diagram (FBD), or Sequential Function Chart (SFC)
- code review, refactoring, maintainability review, or troubleshooting for PLC logic
- IEC 61131-3 style controller software work
- a known vendor ecosystem such as Mitsubishi, Siemens, Omron, Rockwell, Schneider, Delta, Keyence, Panasonic, Beckhoff, or Codesys

## Strong positive examples

- “帮我设计一个PLC顺控状态机”
- “这段ST程序为什么输出会被覆盖”
- “帮我审查一下这段报警复位逻辑”
- “西门子TIA Portal里这段逻辑应该怎么拆模块”
- “GX Works2 的 FX3U 项目帮我重构一下”
- “Codesys 上这段 ST 逻辑可维护性怎么样”

## Clarify-first examples

Use the skill, but clarify key context first when needed:

- “帮我写个 PLC 程序”
- “这个控制逻辑怎么设计更稳”
- “帮我看一下点位和程序结构”

Clarify:

- vendor / PLC family
- software environment
- language in use
- whether the goal is generation, explanation, review, refactor, or debugging
- whether field behavior, alarms, or safety-related outputs are involved

## Non-trigger examples

Do not prefer this skill for:

- generic electronics or PCB questions
- pure wiring / installation questions without control-program context
- motor sizing or electrical calculation with no PLC logic angle
- broad industrial networking with no program behavior context
- career advice, product shopping, or marketing comparisons without engineering logic work
- high-confidence machinery safety conclusions without confirmed field conditions

## Boundary reminders

This skill is **general across PLC development**, but not a free-form industrial encyclopedia.

Stay centered on:

- control logic
- program structure
- review/debugging
- IEC language reasoning
- vendor-aware routing

Do not silently expand to unsupported depth just because a brand name appears.

If the vendor module is shallow, answer from the common PLC layer and explicitly mark the vendor-specific gaps.
