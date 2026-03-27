# PLCopen and IEC 61131-3 notes

Use this file when the task needs standards-level grounding for Structured Text, SFC-oriented structuring, or software-construction guidance.

## Evidence basis

Confirmed from current local and official sources:

Local sources:
- `docs/PLC_SKILL_KB/02_standards/iec_61131_3/plcopen__iec_61131_3__introduction__en.pdf`
- `docs/PLC_SKILL_KB/02_standards/iec_61131_3/plcopen__iec_61131_3__preview__en.pdf`
- `docs/PLC_SKILL_KB/03_guidelines/plcopen/plcopen__evaluation_of_software__en.pdf`
- `docs/PLC_SKILL_KB/04_reference_pages/official_html_snapshots/plcopen__guidelines__directory__en.html`
- `docs/PLC_SKILL_KB/04_reference_pages/official_html_snapshots/plcopen__iec_61131_3__official_overview__en.html`

Official PLCopen pages fetched during this iteration:
- `https://www.plcopen.org/standards/logic/iec-61131-3/`
- `https://www.plcopen.org/guidelines/software-construction-guidelines/`

## IEC 61131-3 baseline relevant to this skill

PLCopen's official IEC 61131-3 overview states that IEC 61131-3 specifies syntax and semantics of programming languages for programmable controllers.

For this skill, the most relevant confirmed points are:

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

PLCopen's Software Construction Guidelines page confirms the following themes:

- industrial control software needs structured development processes
- project complexity and maintenance cost increase over the software life cycle
- rules, coding patterns, and guidance are important for industrial automation software quality
- re-use of pre-defined functionality improves efficiency and maintainability

The same PLCopen page also confirms that published guideline topics include:

- Coding Guidelines
- Creating PLCopen Compliant Libraries
- Structuring with SFC do's and don'ts
- Object Oriented Programming guidance
- Software Quality Metrics

## How to apply this in PLC_SKILL

Use PLCopen / IEC knowledge as:

- a structuring influence
- a naming and consistency influence
- a review framework for maintainability
- a justification for modular design and reuse

Do not use it as a reason to silently override Mitsubishi-specific behavior.

When Mitsubishi-specific syntax, device behavior, or project constraints matter:
- Mitsubishi manuals outrank generic PLCopen guidance

## Practical rules for responses

When standards-level guidance is useful:

- prefer modular program structure over giant monolithic logic
- prefer explicit state / step behavior for sequential processes
- prefer reusable patterns for alarms, interlocks, and common control structures
- prefer code that is reviewable and maintainable over clever compression

## Evidence limits

Current confirmed official material is enough to support:

- standards-aligned ST framing
- SFC-informed structuring guidance
- software-construction and maintainability guidance

It is not enough to claim:

- exact Mitsubishi ST syntax from PLCopen alone
- exact FX3U instruction support from IEC / PLCopen alone
- platform-specific compiler behavior from standards pages alone
