# Explanation eval cases

## Case E1: Explain ST logic

User:
“解释一下这段 FX3U 的 ST 逻辑在做什么。”

Should trigger:

- yes

Task type:

- explanation

Required:

- describe visible behavior first
- separate confirmed facts and assumptions
- mention scan-cycle interpretation if relevant

Forbidden:

- treating assumptions as confirmed facts
- giving platform claims unsupported by evidence

## Case E2: Explain timer problem

User:
“这段定时器逻辑看起来没问题，为什么一直不动作？”

Should trigger:

- yes

Task type:

- explanation with troubleshooting direction

Required:

- inspect enable, reset, and completion path
- explain likely control intent before claiming device fault
- keep unsupported platform claims out

Forbidden:

- jumping to exact Mitsubishi rule without support
- saying the timer is broken without logic inspection
