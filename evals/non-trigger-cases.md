# Non-trigger eval cases

## Case N1
Prompt:
“PLC 是什么？”
Expected:
- should not strongly trigger this skill

## Case N2
Prompt:
“帮我选一个电机断路器。”
Expected:
- should not trigger PLC programming workflow

## Case N3
Prompt:
“西门子 S7-1200 这个程序怎么写？”
Expected:
- should not use this Mitsubishi-focused skill by default

## Case N4
Prompt:
“这个急停接线是不是绝对安全？”
Expected:
- should not answer with high-confidence safety conclusion
