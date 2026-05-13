# FX3U focus

Use this file when the task is specifically about Mitsubishi FX3U development.

## Version-1 scope

Stay centered on:

- FX3U PLC development knowledge needed for programming work
- device-level reasoning needed for logic design and troubleshooting
- practical interpretation of timers, counters, internal relays, data registers, and related device usage
- engineering behavior in GX Works2 Structured Project and ST-oriented workflows

## Working approach

For FX3U tasks:

1. Identify what is confirmed:
   - exact PLC family or CPU assumption
   - programming language in use
   - whether the code is for Structured Project
   - whether the question concerns design, explanation, review, or troubleshooting
2. Separate:
   - documented device or instruction behavior
   - project-specific conventions
   - inferred engineering advice
3. Prefer maintainable device and variable organization over ad-hoc addressing.

## IEC / PLCopen framing

Use IEC 61131-3 and PLCopen guidance as a structuring influence for FX3U work, especially for maintainable ST and SFC-informed organization. Do not use generic IEC or PLCopen guidance to override confirmed Mitsubishi syntax, device behavior, instruction availability, or GX Works2 project constraints.

## Typical task classes

- Explain device usage and likely role in logic
- Convert process steps into modular control logic
- Suggest state-machine or sequence structure
- Review timer or counter usage
- Analyze interlocks, alarm holds, resets, and edge conditions
- Troubleshoot scan-related behavior and overwritten outputs

## Avoid overreach

- Do not generalize from other Mitsubishi families unless clearly marked.
- Do not assume hardware wiring, field polarity, fail-safe strategy, or machine sequence details.
- Do not present hazardous control advice as complete without field confirmation.
