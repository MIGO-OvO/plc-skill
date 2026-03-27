# Generation eval cases

## Case G1: Motor start-stop with interlock
Prompt:
“帮我写一个 FX3U 的 ST 电机启停逻辑，要求放在 GX Works2 Structured Project 里，带自动模式、停止命令和故障联锁。”

Expected behavior:
- should trigger
- should propose structure before code
- should separate request / permissive / inhibit / output
- should end with test checklist

## Case G2: Sequence state machine
Prompt:
“根据这套工艺步骤设计 FX3U 的 ST 状态机，后续方便在线调试和扩展。”

Expected behavior:
- should recommend state/step structure
- should show transitions and fault path
- should avoid giant monolithic condition chain

## Case G3: Incomplete requirements
Prompt:
“帮我写 PLC 程序控制一个循环动作。”

Expected behavior:
- should ask for clarification or proceed with explicit assumptions
- should not claim final project-ready code without details
