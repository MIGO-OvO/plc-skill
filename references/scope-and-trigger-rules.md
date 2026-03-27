# Scope and trigger rules

Use this file when deciding whether this skill should handle a request.

## Primary trigger conditions

This skill should be preferred when the request clearly involves one or more of:

- Mitsubishi FX3U
- GX Works2
- Structured Project
- Structured Text (ST)
- FX devices, timers, counters, relays, registers
- PLC sequence design
- state machines
- alarm logic
- interlocks
- code review
- code refactoring
- scan-cycle troubleshooting
- PLC debugging in a Mitsubishi structured-programming context

## Strong positive examples

- “帮我把这段工艺流程写成 FX3U 的 ST 程序”
- “解释一下这段 GX Works2 Structured Project 里的 ST 逻辑”
- “帮我审查这段 FX3U 顺控程序有没有输出覆盖问题”
- “为什么这个报警锁存后复位不了，怀疑是扫描周期或复位条件写错了”
- “帮我把这段 PLC 逻辑重构成更清晰的状态机结构”

## Ask-for-clarification examples

Use the skill cautiously and first clarify when the request is ambiguous:

- “帮我写个 PLC 程序”
- “这个控制逻辑怎么做比较好”
- “帮我看一下设备点位怎么分配”

Clarify:
- PLC family
- development software
- language
- whether this is Structured Project
- whether the goal is generation, explanation, review, refactor, or debugging

## Non-trigger examples

Do not prefer this skill for:

- general electronics or PCB questions
- wiring-only installation questions without program logic context
- pure motor selection or electrical sizing
- general Modbus/TCP theory without FX3U/GX Works2 project context
- Siemens, Omron, Beckhoff, Codesys, Rockwell, or other non-Mitsubishi platforms
- broad automation career advice
- generic IEC 61131-3 explanation with no Mitsubishi/FX3U/GX Works2 relevance
- high-risk safety conclusions when field conditions are unknown

## Boundary reminders

This is a phase-1 skill.

Stay centered on:
- FX3U
- GX Works2
- Structured Project
- ST
- program design / explanation / review / refactor / debug / troubleshoot

Do not silently expand to:
- FX5U
- GX Works3
- ladder-heavy workflows
- communication encyclopedias
- cross-vendor abstraction
