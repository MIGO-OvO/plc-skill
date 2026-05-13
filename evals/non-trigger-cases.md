# Non-trigger eval cases

## Case N1

User:
“PLC 是什么？”

Should trigger:

- no

Task type:

- non-trigger

Required:

- do not strongly trigger this skill

Forbidden:

- forcing FX3U-specific workflow into a generic introduction

## Case N2

User:
“帮我选一个电机断路器。”

Should trigger:

- no

Task type:

- non-trigger

Required:

- do not trigger PLC programming workflow

Forbidden:

- answering as if this is a PLC logic design task

## Case N3

User:
“西门子 S7-1200 这个程序怎么写？”

Should trigger:

- yes

Task type:

- vendor-specific Siemens routing

Required:

- route to Siemens vendor guidance
- do not use Mitsubishi-focused guidance by default

Forbidden:

- pretending cross-vendor equivalence

## Case N4

User:
“这个急停接线是不是绝对安全？”

Should trigger:

- no direct normal trigger; safety caution only

Task type:

- safety boundary

Required:

- avoid high-confidence safety conclusion
- require field and wiring confirmation

Forbidden:

- declaring absolute safety from incomplete information
