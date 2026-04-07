# PLC_SKILL

> 一个面向工业控制编程的生产级 AI Agent Skill。它采用“通用工程层 + 品牌特化层”的双层架构，既能处理 IEC 61131-3 通用逻辑，又能在识别出目标平台后切入品牌感知规则与文档。

[Read in English](./README.md)

## 这是什么？

PLC_SKILL 是为 OpenClaw、Cursor、Claude Code 等 LLM 编程工具准备的可扩展 Skill。

和把所有 PLC 混为一谈的通用 Prompt 不同，这个 Skill 会把上下文拆成两层：

1. **通用 PLC 层**：处理扫描周期、状态机、联锁、输出所有权、代码审查与调试流程等跨平台工程规则。
2. **品牌特化层**：根据品牌术语、软件环境、内存模型和项目结构规则做进一步路由。

这样可以减少“泛泛 IEC 伪代码”，让输出更结构化、可审查、可维护。

## 核心能力

- **逻辑设计与生成**：生成面向 ST、LD、FBD、SFC 的结构化输出。
- **状态机与顺控**：构建显式状态、显式流转、显式输出所有权的顺控逻辑。
- **代码审查与重构**：审查可维护性、扫描周期冲突和隐藏的多写点问题。
- **调试与排障**：使用“先观察、后假设”的故障隔离流程。
- **品牌感知路由**：根据 TIA Portal、Studio 5000、GX Works、Sysmac Studio、TwinCAT 等上下文切换规则。

## 当前支持深度

- **最深的生产级路径**：Mitsubishi FX3U + GX Works2 + Structured Project + ST。
- **定向增强模块**：Siemens、Rockwell、Omron，具备品牌路由、规则和针对性 eval 覆盖。
- **基础路由/参考模块**：Beckhoff、Schneider、Codesys、Delta、Keyence、Panasonic。

不要假设所有品牌路径都具备相同深度。

## 适用场景

当你需要 Agent 完成以下任务时，请触发此 Skill：

- 用 ST 编写状态机或顺控器。
- 审查梯形图中的扫描周期问题或多写点冲突。
- 把“面条式逻辑”重构成边界清晰、I/O 所有权明确的结构。
- 排查定时器、边沿触发、锁存/复位或联锁逻辑故障。
- 将通用控制概念映射到特定品牌的软件环境中。

不适用于纯电气接线、脱离控制程序上下文的网络问题，或要求给出明确 SIL/PL 安全认证结论的场景。

## 仓库结构

```text
PLC_SKILL/
├── SKILL.md
├── INSTALL.md
├── references/
│   ├── common/
│   └── vendors/
├── templates/
├── examples/
├── evals/
├── docs/guides/
└── bin/
```

## 安装与接入

### 方式 1：NPM 全局安装

```bash
npm install -g plc-skill
install-plc-skill
```

`npm install -g` 会安装包本身和 `install-plc-skill` 命令；`install-plc-skill` 会把 Skill 复制到 `~/.agents/skills/plc-skill`。

### 方式 2：Git Clone

```bash
git clone https://github.com/MIGO-OvO/plc-skill.git
cd plc-skill
```

然后把仓库移动或链接到 `~/.agents/skills/`，或者让你的工具直接读取这个本地仓库。

### 其他工具

Cursor、Claude Code 等工具的配置方式见 [INSTALL.md](./INSTALL.md)。

## 仓库校验

在发布或合并结构性文档修改前，先运行仓库一致性检查：

```bash
npm test
```

## 设计原则

1. **模块化优先于大而全**：输出应该是可复用、可审查的模块，而不是一大段难以维护的代码。
2. **品牌边界清晰**：不要随意混用不同品牌的语法；平台未知时要明确哪些细节依赖品牌。
3. **面对缺失信息保持克制**：使用假设或追问，不制造虚假的确定性。
4. **遵守安全边界**：没有现场条件确认时，不给出高置信度的安全结论。

## 扩展方式

当你需要新增或加深某个品牌模块时：

1. 定义品牌识别信号。
2. 添加或更新该品牌的 overview 和 rules 文件。
3. 维护 official-doc index。
4. 仅在通用层不够时增加品牌特化规则。
5. 将跨品牌工程规则保留在 `references/common/` 中。

更多细节见 [docs/guides/adding-new-vendors.md](./docs/guides/adding-new-vendors.md) 与 [docs/guides/architecture.md](./docs/guides/architecture.md)。
