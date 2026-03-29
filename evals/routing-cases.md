# Routing eval cases

## Case RT1

User:
“帮我根据这个工艺步骤写一段 FX3U 在 GX Works2 Structured Project 里的 ST 顺控逻辑”

Should trigger:

- yes

Task type:

- generation

Required:

- classify as in-scope FX3U + GX Works2 + ST request
- route to generation guidance
- prefer structure before full code

Forbidden:

- treating it as a generic PLC answer
- skipping assumptions when details are missing

## Case RT2

User:
“帮我审查这个 GX Works2 项目的结构是否适合后续维护，尤其是输出被多个模块写入的风险”

Should trigger:

- yes

Task type:

- review

Required:

- route to review workflow
- prioritize output ownership and maintainability
- avoid cosmetic-only comments

Forbidden:

- large rewrite without diagnosis
- ignoring ownership conflicts

## Case RT3

User:
“帮我写 PLC 程序”

Should trigger:

- clarify first

Task type:

- ambiguous

Required:

- ask for PLC family, software, language, and goal
- allow explicit assumptions only if clearly labeled

Forbidden:

- pretending final platform is known
- giving project-ready implementation immediately

## Case RT4

User:
“介绍一下 PLC 是什么”

Should trigger:

- no

Task type:

- non-trigger

Required:

- do not over-expand this skill

Forbidden:

- forcing FX3U-specific guidance into a generic introduction

## Case RT5

User:
"这段 FX3U ST 程序里 T10 的定时逻辑是什么意思，为什么它有时候不触发？"

Should trigger:

- yes

Task type:

- explain

Expected route:

- task-router section 2 (Explain existing code or logic)

Expected references loaded:

- `references/fx3u-device-and-instruction-notes.md`
- `references/st-style-guide.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/output-format.md`

Expected references NOT loaded:

- `references/program-templates.md`
- `references/debugging-checklists.md`
- `references/code-review-checklists.md`

Required:

- separate visible code facts from scan-cycle interpretation
- label any assumption about project declarations

Forbidden:

- jumping to a rewrite without first explaining the logic
- treating T10 behavior as confirmed without checking device notes

## Case RT6

User:
"这段报警锁存逻辑复位后还会再触发，帮我找原因"

Should trigger:

- yes

Task type:

- debug

Expected route:

- task-router section 4 (Debug or troubleshoot behavior)

Expected references loaded:

- `references/debugging-and-review.md`
- `references/debugging-checklists.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/alarm-and-interlock-patterns.md`
- `references/output-format.md`

Expected references NOT loaded:

- `references/program-templates.md`
- `references/gxworks2-structured-project-deep-notes.md`

Required:

- load debugging-and-review.md workflow first
- then load debugging-checklists.md for fault isolation
- separate observed symptom from hypotheses
- list ranked failure paths

Forbidden:

- presenting a single root cause as confirmed without evidence
- skipping scan-cycle ownership check

## Case RT7

User:
"帮我重构这段 FX3U 顺控程序，现在逻辑太散，想改成清晰的状态机结构"

Should trigger:

- yes

Task type:

- review / refactor

Expected route:

- task-router section 3 (Review or refactor code)

Expected references loaded:

- `references/debugging-and-review.md`
- `references/code-review-checklists.md`
- `references/scan-cycle-and-output-ownership.md`
- `references/output-format.md`

Expected templates checked:

- `templates/template-map.md`
- `templates/state-machine-template.md` (if matched)

Expected references NOT loaded:

- `references/debugging-checklists.md`
- `references/input-completeness-rules.md`

Required:

- review ownership and state visibility before cosmetic rewrite
- prefer template-first over one-off rewrite
- explain why state machine structure is preferred

Forbidden:

- rewriting without first reviewing existing ownership and logic issues
- large one-shot code dump with no structure explanation

## Case RT8

User:
"我想写一个电机启停互锁的 FX3U ST 程序，但不确定变量怎么声明"

Should trigger:

- yes

Task type:

- generation with incomplete input (Level 1)

Expected route:

- task-router section 1 (Generate new logic)
- fallback to response-fallback-rules Level 1 for missing declarations

Expected references loaded:

- `references/program-templates.md`
- `templates/template-map.md`
- `references/mitsubishi-fx3u-rules.md`
- `references/st-style-guide.md`
- `references/output-format.md`

Required:

- check templates/template-map.md before writing from scratch
- prefer start-stop-interlock-template if matched
- state variable declaration assumptions explicitly
- mark syntax-sensitive areas

Forbidden:

- claiming declarations are confirmed when not provided
- generating project-ready final code without labeling assumptions

## Case RT9

User:
"这个 FX3U 项目用了哪些特殊模块，通信怎么配置？"

Should trigger:

- clarify first

Task type:

- ambiguous / potentially out of scope

Expected route:

- task-router section 5 (Clarify incomplete requests)

Expected references loaded:

- `references/input-completeness-rules.md`
- `references/response-fallback-rules.md`
- `references/scope-and-trigger-rules.md`

Required:

- clarify whether this concerns ST program logic or hardware wiring/configuration only
- if logic context exists, proceed with FX3U-centered answer
- if wiring/hardware only, note this is at the boundary of skill scope

Forbidden:

- giving a full communication configuration guide without logic context
- treating generic Modbus/TCP theory as in-scope
