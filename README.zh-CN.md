# PLC_SKILL

> 面向 Mitsubishi FX3U PLC、GX Works2 Structured Project 和 Structured Text (ST) 的生成、审查、解释与排障 Skill。

[Read the primary English README / 阅读英文主文档](./README.md)

## 简介

`PLC_SKILL` 是一个面向 **Mitsubishi FX3U**、**GX Works2 Structured Project**、**Structured Text (ST)** 的结构化 Skill 仓库。

它并不是一堆零散 prompt，而是一个可维护的 Skill 包：把触发规则、参考知识、复用模板、示例和轻量 eval 分开组织，让 Agent 以更窄的上下文完成更稳定的 PLC 工作。

## 为什么使用这个 Skill

当你希望 Agent 的 PLC 输出具备以下特征时，可以使用本仓库：

- 比临时 prompt 更结构化
- 在生成、审查和调试任务中更一致
- 在信息不足或安全敏感场景下更保守
- 随着 Skill 演进更容易维护

## Quick start

当前仓库**没有提供仓库内自带的安装器或 CLI**。

现在可按以下方式使用：

1. 克隆或复制本仓库到本地 skills/workspace 目录。
2. 将 `SKILL.md` 作为 Skill 主入口接入 Agent 环境。
3. 保持 `references/`、`templates/`、`examples/`、`evals/` 与其同级存在。
4. 让 Agent 按需读取更窄的文件，而不是把全部内容压成一个 prompt。

```text
git clone <your-fork-or-local-path> PLC_SKILL
```

> 如果你的平台暂不支持打包 Skill，仍可手动加载 `SKILL.md`，并保持当前目录结构不变。

## 项目状态

| 项目 | 状态 |
| --- | --- |
| Scope | 已聚焦，且有意保持窄范围 |
| 主平台 | Mitsubishi FX3U |
| 工程环境 | GX Works2 Structured Project |
| 主要语言 | Structured Text (ST) |
| 打包流程 | 仓库根目录中尚未文档化 |
| Eval 覆盖 | 已有轻量回归用例 |
| License | MIT |

## 这个 Skill 能做什么

这个 Skill 可以帮助 Agent：

- 根据工艺步骤和控制意图生成 ST 逻辑
- 解释已有 ST 代码块、设备使用方式和逻辑流程
- 审查 PLC 代码结构、可维护性和输出归属问题
- 排查扫描周期、报警复位、定时器、计数器、联锁等问题
- 用模板快速组织高频控制模式
- 在输入不完整时保守处理并指出缺失的工程信息
- 在已定义的范围和安全边界内输出结果

## 什么时候使用

在以下场景中适合使用本 Skill：

- 为 GX Works2 Structured Project 编写新的 FX3U ST 逻辑
- 解释、重构或审查已有 ST 代码
- 分析步骤、报警、定时器或计数器为什么行为异常
- 检查隐藏状态、重复写输出或扫描周期风险
- 为顺控、状态机、联锁或报警模块建立清晰结构
- 将 PLC 请求路由到合适的模板或工程清单

**不建议**把它当作覆盖所有厂商、所有语言、所有安全系统的通用 PLC 专家来使用。

## 支持范围

| 领域 | 当前支持 | 说明 |
| --- | --- | --- |
| Mitsubishi FX3U | 是 | 当前主目标平台 |
| GX Works2 Structured Project | 是 | 主要工程语境 |
| Structured Text (ST) | 是 | 当前主语言和示例中心 |
| PLC 代码生成 | 是 | 基于指导、模板和模式 |
| PLC 审查 / 重构 | 是 | 包含可维护性与输出归属检查 |
| 调试 / 排障 | 是 | 包含扫描周期和报警类工作流 |
| 其他 Mitsubishi 系列 | 暂未覆盖 | 需要谨慎扩展，不能默认通用 |
| Ladder / FBD / SFC 广泛覆盖 | 暂未覆盖 | 当前仓库以 ST 为中心 |
| 完整安全系统设计 | 否 | 需要现场确认条件与正式评审 |

## 仓库结构

```text
PLC_SKILL/
├─ SKILL.md
├─ references/
├─ templates/
├─ examples/
├─ evals/
├─ docs/
├─ LICENSE
└─ .gitignore
```

| 路径 | 作用 |
| --- | --- |
| `SKILL.md` | Skill 入口、触发规则和操作约束 |
| `references/` | FX3U 规则、GX Works2 结构、ST 风格、调试、安全、路由等专门资料 |
| `templates/` | 状态机、报警复位、联锁、输出归属审查等复用模式 |
| `examples/` | 正向触发、反向触发和推荐输出形态 |
| `evals/` | 触发、路由、审查和调试行为的轻量回归用例 |
| `docs/` | 本地项目文档和知识库材料 |

## 推荐阅读路径

1. `README.zh-CN.md`
2. `SKILL.md`
3. `references/task-router.md`
4. `references/doc-map.md`
5. `templates/template-map.md`
6. `examples/trigger-positive.md`
7. `evals/README.md`

## 安装 / 接入

### 方式 1：本地 Skill 仓库

- 将本仓库放入本地 skills/workspace 目录
- 在 Agent 环境中注册或引用 `SKILL.md`
- 保持目录结构不变，确保内部引用有效

### 方式 2：手动集成

- 将 `SKILL.md` 作为主 Skill 定义加载
- 保持 `references/` 和 `templates/` 可按需读取
- 在扩展或验证行为时使用 `examples/` 与 `evals/`

> 当前仓库根目录中还没有文档化的 `.skill` 构建流程。

## 使用方式

```text
为一个电机启停顺控写 FX3U Structured Text，运行环境是 GX Works2 Structured Project。
要求将 permissive、latch 和 output 逻辑分开，并包含报警复位处理。
```

```text
帮我审查这段 GX Works2 ST 代码的可维护性。
重点关注输出归属冲突、隐藏状态依赖和扫描周期风险。
```

```text
帮我分析为什么这个报警在复位后立刻再次锁存。
假设平台是 FX3U + GX Works2 Structured Project + ST，请给出可能原因和安全检查点。
```

## 设计原则

- **先做窄范围优化** —— 优先服务 FX3U + GX Works2 + ST，而不是泛化到所有 PLC
- **渐进式信息加载** —— 保持 `SKILL.md` 精简，详细资料按需进入上下文
- **复用优先** —— 将高频 PLC 场景沉淀为模板和检查清单
- **保守输出** —— 明确假设和缺失信息，不伪装确定性
- **可维护结构** —— 路由、参考、模板、示例、评估按角色分离

## 当前限制

- 主要聚焦 Mitsubishi FX3U
- 主要聚焦 GX Works2 Structured Project
- 主要聚焦 Structured Text (ST)
- 不是完整的多品牌 PLC 仓库
- 不能替代现场接线确认、调试实测或正式安全评审
- 不是覆盖全部 IEC 61131-3 语言的完整知识库

## 贡献 / 后续扩展

适合的后续改进包括：更多模板、更真实的示例、更强的 eval 覆盖，以及打包/版本流程文档。

扩展时建议保持 `SKILL.md` 简洁，在 `references/` 中增加窄主题文件，优先复用 `templates/`，并同步更新 `examples/` 与 `evals/`。

## 为进一步完善 README 仍缺失的信息

- 目标 Skill 运行平台 / Agent 平台的准确名称
- 本地 Skill 自动发现的推荐安装路径
- 是否在仓库外部还有 `.skill` 打包流程
- 版本 / 发布策略
