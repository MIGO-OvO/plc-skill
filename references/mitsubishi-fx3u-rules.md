# Mitsubishi FX3U rules

Use this file when the request depends on Mitsubishi FX3U platform behavior, engineering limits, or model-specific caution.

## Evidence basis in current local docs

Primary local sources currently available for this topic include:

- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/fx_series_programming/mitsubishielectric__fx3u__programming_manual_basic_applied_instructions__en__jy997d16601.pdf`
- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/fx3u_hardware/mitsubishielectric__fx3u__hardware_manual__en__jy997d15401e.pdf`
- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/fxcpu_structured_programming/mitsubishielectric__fxcpu__structured_programming_manual_device_common__en__jy997d16701.pdf`

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

- prefer local Mitsubishi manuals before giving a firm conclusion
- separate documented behavior from engineering convention
- mark project-local naming or addressing conventions as assumptions unless provided
- if the exact instruction rule is not confirmed from current docs, say so

## Safety and field-boundary rules

Current local manuals repeatedly emphasize that:

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
- if the local hardware/manual extraction is incomplete, say the hardware detail still needs manual confirmation

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

Current local docs are enough to establish FX3U-first scope and conservative behavior, but not enough yet to claim every detailed instruction rule has been extracted into text form.

If the answer depends on:

- exact instruction semantics
- exact special-register behavior
- exact declaration or device allocation rule
- exact analog / communication module detail

say that document confirmation is still required from the relevant Mitsubishi manual.
