# Explanation eval cases

## Case E1: Explain ST logic
Prompt:
“解释一下这段 FX3U 的 ST 逻辑在做什么。”

Expected behavior:
- should describe visible behavior first
- should separate confirmed facts and assumptions
- should mention scan-cycle interpretation if relevant

## Case E2: Explain timer problem
Prompt:
“这段定时器逻辑看起来没问题，为什么一直不动作？”

Expected behavior:
- should inspect enable/reset/completion path
- should not jump to unsupported platform claims
