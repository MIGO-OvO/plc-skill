# FX3U device and instruction notes

Use this file when the request depends on FX3U device usage, instruction interpretation, timer/counter behavior, or address-role reasoning.

## Evidence basis

Primary local sources currently available:

- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/fx_series_programming/mitsubishielectric__fx3u__programming_manual_basic_applied_instructions__en__jy997d16601.pdf`
- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/fxcpu_structured_programming/mitsubishielectric__fxcpu__structured_programming_manual_device_common__en__jy997d16701.pdf`
- `docs/PLC_SKILL_KB/01_vendor_mitsubishi/fxcpu_structured_programming/mitsubishielectric__fxcpu__structured_programming_manual_basic_applied_instruction__en__jy997d36701.pdf`

## Purpose of this reference

This is not a full device table.
It tells the skill how to behave when reasoning about FX3U devices and instructions.

## Core rule

When the user asks what a device, instruction, timer, counter, or register is doing:

- prefer a device-role explanation before a generic PLC explanation
- distinguish documented behavior from project-specific usage
- do not invent exact Mitsubishi semantics if not confirmed from local manuals

## Device-role interpretation rule

When the exact project naming convention is missing, interpret devices cautiously by likely role:

- inputs as field conditions or permissives
- outputs as actuators or commands
- internal relays as intermediate logic state, mode flags, step flags, or latch bits
- timers as delay / timeout / debounce / pulse timing elements
- counters as quantity / repetition / event accumulation elements
- data registers as parameter, state, calculation, or exchanged value storage

But always say these are likely roles unless the project provides the actual mapping.

## Timer and counter reasoning rules

When troubleshooting timers or counters:

- verify enable condition first
- verify completion condition second
- verify reset path third
- verify whether another section rewrites the same done-dependent logic

Do not jump to "timer broken" or "counter broken" without checking the enabling logic and reset path.

## Instruction reasoning rules

When asked about an instruction:

- if the exact Mitsubishi instruction meaning is needed, rely on Mitsubishi programming manuals
- if local extraction is incomplete, say manual confirmation is still required
- if the user only needs engineering interpretation, explain likely control intent first, then note where exact manual confirmation matters

## Practical explanation pattern

For device or instruction explanation, prefer:

1. what is directly visible
2. likely engineering role
3. assumptions
4. scan-cycle implication
5. what must be confirmed from the manual or project mapping

## Review rule for device usage

When reviewing code, inspect whether:

- the same class of device is used consistently
- timer/counter resets are understandable
- internal relays are acting as hidden state without explanation
- data registers carry multiple unrelated responsibilities
- device usage is maintainable for online troubleshooting

## Common pitfalls to call out

- timer never starts because enable condition is never stable
- timer resets every scan due to conflicting logic
- counter never reaches target because the counted event never edges as expected
- internal relay is used as hidden memory in too many places
- output depends on multiple intermediate bits with unclear ownership

## Evidence limits

This file supports cautious FX3U-first reasoning.
If the answer depends on exact Mitsubishi device ranges, exact instruction syntax, exact operand restrictions, or exact execution details, direct manual confirmation is still required.
