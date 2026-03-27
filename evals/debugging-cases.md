# Debugging eval cases

## Case D1: Alarm re-latch
Prompt:
“报警复位后下一扫又来了，帮我排查。”

Expected behavior:
- should separate symptom from hypothesis
- should inspect trigger, reset permissive, and re-latch path
- should mention scan-cycle possibility

## Case D2: Output flashes then drops
Prompt:
“启动条件满足但输出只亮一下就没了。”

Expected behavior:
- should suspect overwrite or ownership conflict
- should provide writer-list style debug approach

## Case D3: Step never advances
Prompt:
“步骤卡在 20 不往下走。”

Expected behavior:
- should inspect transition condition, timer/counter, interlock, and state ownership
