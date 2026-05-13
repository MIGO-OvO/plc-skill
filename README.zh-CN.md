# PLC Skill

> 面向工业 PLC 编程的生产级 AI Agent Skill。它把通用工程规则与品牌感知路由分开，
> 帮助 Agent 生成结构化、可审查的 IEC 61131-3 控制逻辑，而不是泛泛的 PLC 伪代码。

[![npm](https://img.shields.io/npm/v/plc-skill?logo=npm)](https://www.npmjs.com/package/plc-skill)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[Read in English](./README.md)

## 项目概览

PLC Skill 是一个可扩展知识库，面向 OpenClaw、Cursor、Claude Code 等由 LLM 驱动的
开发工具。它适合处理 PLC 逻辑、顺序控制、联锁、报警、调试审查，以及具体品牌自动化
环境下的工程约束。

这个 Skill 采用双层结构：

1. **通用 PLC 层**：处理扫描周期、状态机、输出所有权、联锁、调试、代码审查、
   IEC 61131-3 风格逻辑等跨品牌工程规则。
2. **品牌特化层**：处理品牌术语、语法、内存模型、项目结构、软件行为和官方文档索引。

这种分层能减少品牌混用、语法臆造，以及把所有 PLC 请求都写成模糊 IEC 风格代码的问题。

## 核心能力

- **逻辑设计与生成**：覆盖 Structured Text (ST)、Ladder Diagram (LD)、
  Function Block Diagram (FBD)、Sequential Function Chart (SFC) 相关输出。
- **状态机与顺控器**：强调显式状态所有权、转换条件和输出映射。
- **代码审查与重构**：检查扫描周期风险、多写点、隐藏锁存、联锁不清晰和可维护性问题。
- **调试与排障**：围绕定时器、边沿触发、复位、报警和顺控故障执行“先观察、后假设”的流程。
- **品牌感知路由**：识别 TIA Portal、Studio 5000、GX Works、Sysmac Studio、
  TwinCAT、CODESYS 等平台线索。

可参考 [SHOWCASE.md](./SHOWCASE.md) 查看它和普通 AI PLC 输出的差异。

## 支持深度

| 深度 | 品牌与环境 | 预期行为 |
| --- | --- | --- |
| 成熟路径 | Mitsubishi FX3U + GX Works2 + Structured Project + ST | 最完整的内置规则、示例和审查模式。 |
| 定向模块 | Siemens、Rockwell / Allen-Bradley、Omron | 具备品牌路由、规则、示例和针对性 eval 覆盖。 |
| 基础模块 | Beckhoff、Schneider、CODESYS、Delta、Keyence、Panasonic | 具备识别、参考路由、速查表和官方文档索引。 |

不要假设所有品牌路径都有相同深度。平台未知或覆盖不完整时，应先使用通用 PLC 层回答，
并明确标出依赖品牌、型号或软件版本的细节。

## 适用场景

当你希望 Agent 完成以下任务时，适合触发此 Skill：

- 编写或审查 PLC 状态机、顺控器、设备模块、联锁逻辑。
- 把混乱的梯形图或 ST 逻辑重构成边界清晰、I/O 所有权明确的模块。
- 排查定时器、计数器、边沿检测、锁存、复位、报警或扫描顺序问题。
- 将通用控制概念映射到具体 PLC 软件环境。
- 检查品牌混用问题，例如在 Siemens TIA Portal 场景中使用 Mitsubishi 的 `Y` 输出地址。

这个 Skill 不能替代电气设计审查、现场调试、SIL/PL 认证或品牌官方验证。遇到依赖现场条件
的安全关键结论时，应保持保守。

## 快速开始

### 通过 npm 安装

前提：安装器和仓库校验需要 Node.js 18 或更高版本。

```bash
npm install -g plc-skill
install-plc-skill --target claude-code
```

npm 包会安装 `install-plc-skill` 辅助命令。运行该命令后，Claude Code 的运行时
Skill 会被复制到：

```text
~/.claude/skills/plc-skill
```

如需安装到 OpenClaw 风格的 `.agents` 目录，运行 `install-plc-skill --target agents`。
如需同时安装两份，运行 `install-plc-skill --target both`；加上 `--dry-run` 可以只查看目标路径。

### 通过 Git 安装

```bash
git clone https://github.com/MIGO-OvO/plc-skill.git
cd plc-skill
node bin/install.js --target claude-code
```

Claude Code 建议使用安装器复制运行时载荷，不要把仓库根目录整体放进 skill 目录。
仓库根目录还包含维护文档和 eval，这些不是运行时上下文。

更多工具接入说明见 [INSTALL.md](./INSTALL.md)。

## 使用方式

把 [SKILL.md](./SKILL.md) 作为入口。兼容的 Agent 应先读取它，判断任务类型，加载通用
PLC 层；如果能识别平台，再加载最窄范围的品牌文件。

推荐入口：

- [references/common/task-router.md](./references/common/task-router.md)：任务分类。
- [references/common/knowledge-priority.md](./references/common/knowledge-priority.md)：证据优先级。
- [references/vendors/vendor-routing.md](./references/vendors/vendor-routing.md)：品牌识别与路由。
- [templates/common/template-map.md](./templates/common/template-map.md)：可复用输出模板。

## 仓库内容

当前仓库快照：

| 区域 | 数量 | 用途 |
| --- | ---: | --- |
| 品牌模块 | 10 | 品牌识别、规则、速查表、坑点和官方文档索引。 |
| 通用参考 | 26 | 跨品牌工程规则、审查规则和调试流程。 |
| 通用模板 | 17 | 用于生成和重构的可复用 ST/控制模式。 |
| 示例 | 20 | 通用和品牌特化行为示例。 |
| Eval 文档 | 16 | 覆盖路由、生成、审查、调试和兜底行为的 Markdown 与 JSON 回归用例。 |

```text
plc-skill/
|-- SKILL.md                  # Skill 入口与路由约定
|-- INSTALL.md                # 安装和工具接入说明
|-- references/
|   |-- common/               # 品牌无关的 PLC 工程指导
|   `-- vendors/              # 品牌特化路由和规则
|-- templates/common/         # 可复用 PLC 输出模板
|-- examples/                 # 通用和品牌特化示例
|-- evals/                    # 回归与行为测试用例
|-- docs/guides/              # 架构、测试和扩展指南
|-- bin/install.js            # npm 辅助命令
`-- scripts/verify-repo.js    # 仓库一致性检查
```

## 维护流程

发布或提交结构性文档修改前，运行仓库一致性检查：

```bash
npm test
```

该检查会验证内部 Markdown 引用、占位文本、package 元数据一致性、`SKILL.md`
frontmatter、运行时载荷边界、编码异常、通用模板品牌中立性和机器可读 eval 覆盖。

新增或加深品牌模块时：

1. 定义品牌识别信号和路由规则。
2. 添加或更新该品牌的 overview、rules、cheatsheet、pitfalls 和 official-doc index。
3. 将跨品牌工程规则保留在 `references/common/`。
4. 在 `examples/vendors/` 下添加真实的品牌示例。
5. 在 `evals/` 中添加或更新 eval 用例。

更多细节见 [docs/guides/adding-new-vendors.md](./docs/guides/adding-new-vendors.md)、
[docs/guides/architecture.md](./docs/guides/architecture.md) 和
[CONTRIBUTING.md](./CONTRIBUTING.md)。

## 问题反馈

如果发现 bug、路由规则不清晰、示例错误或缺少品牌行为，请在
[GitHub Issues](https://github.com/MIGO-OvO/plc-skill/issues) 提交。

建议提供：

- PLC 品牌、型号和工程软件版本。
- 编程语言或图形类型，例如 ST、LD、FBD、SFC。
- 具体的 Agent 提示词或看起来错误的生成结果。
- 期望行为，如有官方文档链接请一并附上。

## 许可证

本仓库使用 [MIT License](./LICENSE)。
