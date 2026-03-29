# PLCopen and IEC 61131-3 notes

Use this file when the task needs standards-level grounding for Structured Text, SFC-oriented structuring, or software-construction guidance.

## Evidence basis

Confirmed from compressed skill references and official PLCopen sources.

Typical evidence categories behind this file:

- IEC 61131-3 overview material for language and configuration concepts
- PLCopen guidance on software construction, structuring, reuse, and maintainability
- Cross-checking against Mitsubishi-specific constraints when platform behavior matters

## IEC 61131-3 baseline relevant to this skill

The most relevant confirmed points are:

- ST is one of the textual IEC 61131-3 languages
- LD and FBD are graphical languages
- SFC is defined for structuring the internal organization of controller programs and function blocks
- configuration elements are part of the standardized model for installing controller programs into controller systems

## What this means for this skill

For FX3U + GX Works2 + Structured Project + ST work:

- ST output should be treated as a standards-aligned textual language, not as free-form pseudocode
- SFC ideas can inform program structuring even when the final answer stays in ST
- structured program organization is not just style preference; it is aligned with the broader IEC / PLCopen model of organized controller software

## PLCopen software-construction guidance relevant to this skill

The relevant guidance themes are:

- industrial control software needs structured development processes
- project complexity and maintenance cost increase over the software life cycle
- rules, coding patterns, and guidance are important for industrial automation software quality
- re-use of pre-defined functionality improves efficiency and maintainability

Published topic areas commonly referenced here include:

- Coding Guidelines
- Compliant library creation
- Structuring with SFC do's and don'ts
- Software quality metrics

## How to apply this in PLC_SKILL

Use PLCopen / IEC knowledge as:

- a structuring influence
- a naming and consistency influence
- a review framework for maintainability
- a justification for modular design and reuse

Do not use it as a reason to silently override Mitsubishi-specific behavior.

When Mitsubishi-specific syntax, device behavior, or project constraints matter:

- Mitsubishi manuals and Mitsubishi-focused references outrank generic PLCopen guidance

## Practical rules for responses

When standards-level guidance is useful:

- prefer modular program structure over giant monolithic logic
- prefer explicit state / step behavior for sequential processes
- prefer reusable patterns for alarms, interlocks, and common control structures
- prefer code that is reviewable and maintainable over clever compression

## Evidence limits

Current confirmed material is enough to support:

- standards-aligned ST framing
- SFC-informed structuring guidance
- software-construction and maintainability guidance

It is not enough to claim:

- exact Mitsubishi ST syntax from PLCopen alone
- exact FX3U instruction support from IEC / PLCopen alone
- platform-specific compiler behavior from standards pages alone
