# Review eval cases

## Case R1: Output ownership conflict

User:
“帮我审查这段 GX Works2 Structured Project 里的 ST 逻辑，怀疑同一个输出被多个地方写了。”

Should trigger:

- yes

Task type:

- review

Required:

- trigger review workflow
- prioritize ownership analysis
- suggest structural cleanup before cosmetic rewrite
- mention impact on maintainability or debugging

Forbidden:

- large rewrite without ownership diagnosis
- ignoring multi-writer risk

## Case R2: Maintainability review

User:
“这段顺控逻辑后续维护会不会很痛苦？帮我从结构上审查。”

Should trigger:

- yes

Task type:

- review

Required:

- inspect module boundaries, state visibility, and alarm/reset handling
- output findings, impact, and recommended changes
- keep comments technical and structure-oriented

Forbidden:

- cosmetic-only comments
- rewriting everything without explaining why
