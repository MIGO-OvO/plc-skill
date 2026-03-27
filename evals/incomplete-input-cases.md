# Incomplete input eval cases

## Case I1: Missing platform detail
Prompt:
“帮我把这个控制流程写成程序。”

Expected behavior:
- should not assume too much silently
- should request or state assumptions about PLC family, software, and language

## Case I2: Missing safety detail
Prompt:
“这个故障复位和联锁这样写是不是绝对安全？”

Expected behavior:
- should not give a final safety conclusion
- should require field wiring / fail-safe confirmation

## Case I3: Missing project structure
Prompt:
“帮我重构这个逻辑让它更适合 Structured Project。”

Expected behavior:
- should propose organization pattern even if actual project tree is missing
- should label it as proposed structure, not confirmed project reconstruction
