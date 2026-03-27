# PLC_SKILL Collection Report

Date: 2026-03-27
Output root: `D:\GitHub projects\PLC_SKILL\docs\PLC_SKILL_KB`

## 1. Summary

- 本次已发现资料链接：**至少 24 条候选**
- 已成功保存本地文件：**15 个**
  - PDF: 10
  - HTML 快照: 5
- 采集策略：**官方优先**，优先保留 Mitsubishi Electric / PLCopen 官方原始资料与官方页面快照

## 2. Saved files by category

- `01_vendor_mitsubishi/fx3u_hardware`: **1**
- `01_vendor_mitsubishi/fx_series_programming`: **1**
- `01_vendor_mitsubishi/gxworks2_structured_project`: **2**
- `01_vendor_mitsubishi/fxcpu_structured_programming`: **3**
- `01_vendor_mitsubishi/communication_and_special_modules`: **0**
- `02_standards/iec_61131_3`: **2**
- `03_guidelines/plcopen`: **1**
- `04_reference_pages/official_html_snapshots`: **5**
- `99_inbox_unsorted`: **0**

## 3. Most important files to feed into PLC_SKILL first (Top 15)

按“最适合训练 PLC 编程 / ST / 结构化设计 / 工程操作”的优先级排序：

1. `01_vendor_mitsubishi/fxcpu_structured_programming/mitsubishielectric__fxcpu__structured_programming_manual_device_common__en__jy997d16701.pdf`
2. `01_vendor_mitsubishi/fxcpu_structured_programming/mitsubishielectric__fxcpu__structured_programming_manual_basic_applied_instruction__en__jy997d36701.pdf`
3. `01_vendor_mitsubishi/fxcpu_structured_programming/mitsubishielectric__fxcpu__structured_programming_manual_application_functions__en__jy997d37801e.pdf`
4. `01_vendor_mitsubishi/gxworks2_structured_project/mitsubishielectric__gxworks2__structured_project__programming_manual__en__jy997d40901e.pdf`
5. `01_vendor_mitsubishi/gxworks2_structured_project/mitsubishielectric__gxworks2__structured_project__beginners_manual__en__jy997d16801.pdf`
6. `01_vendor_mitsubishi/fx_series_programming/mitsubishielectric__fx3u__programming_manual_basic_applied_instructions__en__jy997d16601.pdf`
7. `02_standards/iec_61131_3/plcopen__iec_61131_3__introduction__en.pdf`
8. `02_standards/iec_61131_3/plcopen__iec_61131_3__preview__en.pdf`
9. `01_vendor_mitsubishi/fx3u_hardware/mitsubishielectric__fx3u__hardware_manual__en__jy997d15401e.pdf`
10. `03_guidelines/plcopen/plcopen__evaluation_of_software__en.pdf`
11. `04_reference_pages/official_html_snapshots/plcopen__iec_61131_3__official_overview__en.html`
12. `04_reference_pages/official_html_snapshots/plcopen__guidelines__directory__en.html`
13. `04_reference_pages/official_html_snapshots/plcopen__iec_61131_3__status__en.html`
14. `04_reference_pages/official_html_snapshots/plcopen__iec_61131_3__recognize_programming_system__en.html`
15. `04_reference_pages/official_html_snapshots/plcopen__iec_61131_3__faqs__en.html`

## 4. Missing critical materials

以下资料仍建议继续补采：

### Mitsubishi
- FX3U 更完整的 **hardware edition / user’s manual / installation-related variants**
- FX 系列 **通信手册**（串口、以太网、MODBUS、网络模块）
- FX 系列 **定位 / 脉冲输出 / 特殊功能模块** 手册
- GX Works2 **Structured Project** 相关中文官方资料（如果存在且质量高）
- FXCPU 结构化编程相关的更多补充手册、示例集、应用说明

### PLCopen
- **Coding Guidelines** 具体 PDF
- **Software Construction Guidelines** 具体 PDF
- **SFC structuring / do's and don'ts** 具体 PDF
- **Training guidelines / whitepapers**

### IEC
- IEC 官方 webstore 的 **IEC 61131-3 产品页 / 摘要页 / 目录页**
- 合法公开的 IEC 61131-3 解释性资料与简介

## 5. Items needing manual handling or confirmation

- **IEC webstore**: 某些标准详情可能需要人工确认版本或遇到付费内容；本次未尝试规避。
- **Mitsubishi 发布日期**: 多数 PDF 已拿到手册号，但具体发布日期尚未逐份核验，manifest 先记为“未确认”。
- **PLCopen 指南子文档**: 目录页已保存，但具体指南 PDF 仍需进一步从其站点结构中展开。

## 6. Notes on traceability

- 所有已入库条目均在 `05_indexes/manifest.csv` 中记录 `source_url`。
- 文档命名已统一为：`[来源域名]__[主题]__[文档类型]__[语言]__[版本或编号]`
- 目前未删除任何已有文件，也未覆盖不同内容的旧文件。
- 目前未发现需要标记 `duplicate_of` 的字节级重复项。

## 7. Recommended AI ingestion order

如果你要立刻给 PLC_SKILL 喂资料，推荐顺序：

### 第一批：核心结构化编程能力
1. FXCPU Structured Programming Manual - Device & Common
2. FXCPU Structured Programming Manual - Basic & Applied Instruction
3. FXCPU Structured Programming Manual - Application Functions
4. GX Works2 Structured Project Programming Manual
5. GX Works2 Structured Project Beginner's Manual

### 第二批：FX 指令与设备基础
6. FX3U Programming Manual - Basic & Applied Instructions
7. FX3U Hardware Manual

### 第三批：标准与设计语义层
8. PLCopen introduction on IEC 61131-3
9. IEC 61131-3 Preview
10. PLCopen IEC 61131-3 overview / FAQ / status pages

### 第四批：工程规范补充
11. PLCopen Evaluation of software
12. 后续补采到的 PLCopen Coding / Construction / SFC Guidelines

## 8. Next recommended acquisition pass

下一轮最值得做的是：
1. 深挖 PLCopen guidelines 目录下的具体 PDF
2. 补 Mitsubishi 通信 / 特殊模块手册
3. 为已下载 Mitsubishi PDF 自动提取首页标题、手册号、版本、发布日期
4. 补抓 IEC 官方目录页与摘要页
