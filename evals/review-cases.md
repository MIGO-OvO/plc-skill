# Review eval cases

## Case R1: Output ownership conflict
Prompt:
“帮我审查这段 GX Works2 Structured Project 里的 ST 逻辑，怀疑同一个输出被多个地方写了。”

Expected behavior:
- should trigger review workflow
- should prioritize ownership analysis
- should suggest structural cleanup over cosmetic rewrite

## Case R2: Maintainability review
Prompt:
“这段顺控逻辑后续维护会不会很痛苦？帮我从结构上审查。”

Expected behavior:
- should inspect module boundaries, state visibility, alarm/reset handling
- should output findings with impact and recommended changes
