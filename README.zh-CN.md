# PLC_SKILL

> 一个具有**通用层 + 品牌特化层**清晰分层的 PLC 工程 Skill。它能处理跨品牌 PLC 共性问题，同时保留更深的品牌特化模块；当前最成熟的特化模块仍然是 **Mitsubishi FX3U / GX Works2 / Structured Project / ST**。

[Read the primary English README / 阅读英文主文档](./README.md)

## 简介

`PLC_SKILL` 已不再定位为“只服务单一三菱平台”的窄技能。

它现在的结构是：

- **通用 PLC 层**：承载跨品牌的控制逻辑、程序结构、调试与审查共性能力
- **品牌特化层**：承载各品牌的软件环境、术语、工程组织、资料入口与平台差异

这样做的目标不是“什么都懂一点”，而是：

- 品牌未知时，先给出高质量通用工程化答案
- 品牌明确时，自动切换到更贴近该品牌的规则和术语
- 保留已有三菱积累，不把成熟知识冲淡

## 适用范围

适用于以下 PLC 工程任务：

- 控制逻辑设计
- 顺控 / 状态机 / 步进流程
- 报警、锁存、复位、联锁
- 定时器、计数器、边沿触发
- I/O 映射与程序结构设计
- ST / LD / FBD / SFC 的工程化理解
- 代码解释、审查、重构、调试、排障
- 已识别品牌后的品牌特化路由

## 设计目标

这个 Skill 同时满足四个目标：

1. 具备真正可用的 **PLC 共性工程能力**
2. 保留并扩展 **品牌特化能力**
3. 明确区分 **通用层** 与 **品牌层**
4. 避免退化成“大而散、无边界”的低质量技能

## 当前模块成熟度

| 层 / 模块 | 状态 |
| --- | --- |
| 通用 PLC 层 | 已启用 |
| Mitsubishi 模块 | 成熟 |
| Siemens 模块 | 已预留骨架 |
| Omron 模块 | 已预留骨架 |
| Rockwell / Allen-Bradley 模块 | 已预留骨架 |
| Schneider 模块 | 已预留骨架 |
| Delta 模块 | 已预留骨架 |
| Keyence 模块 | 已预留骨架 |
| Panasonic 模块 | 已预留骨架 |
| Beckhoff 模块 | 已预留骨架 |
| Codesys 模块 | 已预留骨架 |

## 仓库结构

```text
PLC_SKILL/
├─ SKILL.md
├─ references/
│  ├─ common/
│  ├─ vendors/
│  │  ├─ mitsubishi/
│  │  ├─ siemens/
│  │  ├─ omron/
│  │  ├─ rockwell/
│  │  ├─ schneider/
│  │  ├─ delta/
│  │  ├─ keyence/
│  │  ├─ panasonic/
│  │  ├─ beckhoff/
│  │  └─ codesys/
├─ templates/
│  ├─ common/
│  └─ vendors/
├─ examples/
│  ├─ common/
│  └─ vendors/
├─ evals/
└─ docs/
```

## 路由方式

Skill 的行为应遵循这个顺序：

1. 先判断是不是 PLC / 控制程序问题
2. 再判断品牌是否明确
3. 品牌明确 -> 进入对应品牌特化模块
4. 品牌不明确 -> 先走通用 PLC 层
5. 混用多个品牌术语 -> 先指出混淆，再回答

## 当前最深特化

原有的三菱积累已被完整保留，并作为第一个成熟品牌模块存在，重点支持：

- Mitsubishi FX3U
- GX Works2
- Structured Project
- Structured Text (ST)

## 知识组织方式

- `references/common/` -> 通用 PLC 工程规则
- `references/vendors/<vendor>/` -> 各品牌特化规则与官方资料入口
- `templates/common/` -> 通用控制模板
- `examples/common/` -> 通用示例与触发样例
- `docs/PLC_SKILL_KB/` -> 已收集的手册与资料

## 明确不做什么

本仓库**不**试图变成：

- 工业自动化百科全书
- 安全认证结论提供者
- 一个把所有品牌混在一起的大 prompt
- 一个默认认为所有品牌语法都差不多的模糊技能

## 推荐阅读顺序

1. `SKILL.md`
2. `references/skill-architecture.md`
3. `references/common/task-router.md`
4. `references/vendors/vendor-routing.md`
5. `references/doc-map.md`
6. `templates/common/template-map.md`

## 后续扩展建议

后续给某品牌加深时，建议按这个顺序：

- 先补品牌识别信号
- 再补 overview 文件
- 再补官方资料索引
- 最后按真实需求补规则、清单、示例
- 通用规则继续放在 `references/common/`，不要复制污染到各品牌目录里
