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
