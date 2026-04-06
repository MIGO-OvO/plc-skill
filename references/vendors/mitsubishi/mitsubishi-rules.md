# Mitsubishi FX3U rules

Use this file when the request depends on Mitsubishi FX3U platform behavior, engineering limits, or model-specific caution.

## Evidence basis

This file compresses the FX3U-specific constraints and conservative rules that most often affect generation, explanation, review, and troubleshooting tasks.

Use it for:

- FX3U-first platform scoping
- conservative handling of syntax and feature assumptions
- hardware-boundary caution
- FX3U-centered troubleshooting order

## Scope of this reference

This file is not a full FX3U device encyclopedia.
It defines how the skill should behave for FX3U-first programming, explanation, review, and troubleshooting tasks.

## Platform-first rules

When the user clearly works on FX3U:

- keep the answer FX3U-centered unless the user explicitly broadens scope
- do not silently generalize from other Mitsubishi CPU families
- do not assume feature parity with newer platforms
- treat exact instruction syntax, availability, and declaration behavior as document-sensitive if not confirmed

## Programming behavior rules

For FX3U work, prefer:

- explicit sequence structure
- explicit alarm and reset behavior
- readable device / variable role separation
- clear output ownership
- practical scan-cycle reasoning

Avoid:

- platform-agnostic generic PLC prose when FX3U-specific reasoning is needed
- large monolithic code dumps without module structure
- assuming the platform supports every IEC-style convenience automatically

## Device and instruction reasoning

When asked about device usage, instruction behavior, timers, counters, relays, or registers:

- prefer Mitsubishi-focused references before giving a firm conclusion
- separate documented behavior from engineering convention
- mark project-local naming or addressing conventions as assumptions unless provided
- if the exact instruction rule is not confirmed from bundled references, say so

## Safety and field-boundary rules

Mitsubishi-oriented guidance for this skill should be treated conservatively:

- the PLC is a general-purpose industrial product
- fail-safe and backup measures are required where failure could cause major accidents or losses
- safe machinery operation must not depend only on PLC internal behavior
- external circuits and mechanisms are required for emergency stop, protection, and critical interlock functions

Therefore:

- do not present FX3U code alone as a complete safety solution
- do not treat field wiring or actuator behavior as known unless confirmed
- when outputs could create hazardous motion or damage, require external protection / interlock confirmation

## Hardware-boundary rules

When the request touches hardware limits, wiring, grounding, or analog/special modules:

- answer conservatively
- prefer hardware-manual-backed statements
- distinguish CPU logic issues from wiring or module-side issues
- if bundled hardware detail is incomplete, say the hardware detail still needs manual confirmation

## Troubleshooting rules for FX3U

For abnormal behavior on FX3U projects, check in this order when possible:

1. expected input condition
2. current state / step
3. timer or counter completion condition
4. interlock block
5. output overwrite by another section
6. reset or latch conflict
7. hardware / wiring / module-side issue

## Known evidence gaps

This file is enough to establish FX3U-first scope and conservative behavior, but not enough to claim every detailed instruction rule has been fully extracted.

If the answer depends on:

- exact instruction semantics
- exact special-register behavior
- exact declaration or device allocation rule
- exact analog / communication module detail

say that Mitsubishi manual confirmation is still required.
