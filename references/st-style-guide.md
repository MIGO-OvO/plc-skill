# ST style guide

**Scope of this file**: naming conventions, variable declarations, code organization, sequence/alarm/output logic structure, and review priorities.
For response output format and presentation order, see `references/st-output-style.md`.

Use this file when generating, explaining, reviewing, or refactoring Structured Text for this skill.

## Scope

This guide is for phase-1 Mitsubishi FX3U + GX Works2 Structured Project work.
It is not a generic style guide for all IEC 61131-3 environments.

## Core style goals

Prefer ST that is:

- readable during commissioning
- easy to explain line by line
- modular enough for structured projects
- explicit about state, reset, and interlock behavior
- conservative about syntax-sensitive assumptions

## Preferred code shape

Prefer this order in most responses:

1. requirement understanding
2. known conditions
3. assumptions
4. module boundary
5. variable / device role suggestion
6. ST skeleton or code
7. logic explanation
8. test / debug checklist

## Naming and logic style

Prefer:

- names that express role or condition clearly
- explicit state or step semantics for sequence control
- explicit set / hold / reset handling for alarms
- explicit interlock conditions for outputs
- comments only where they improve future maintenance

Avoid:

- deeply nested conditionals when a clearer staged structure is possible
- hidden write ownership for outputs
- reset logic mixed so tightly with normal run logic that online troubleshooting becomes unclear
- large one-shot code dumps with no structure explanation

## Sequence and state logic

For machine or process sequence behavior, strongly prefer:

- explicit step/state variables
- visible transition conditions
- visible fault branches
- visible reset or recovery branches

If the process is sequential, a state-machine or step-driven structure is usually preferable to scattered condition chains.

## Alarm logic style

For alarms, prefer separating:

- trigger condition
- latch behavior
- reset permissive
- reset command
- re-latch risk

This makes review and troubleshooting much easier.

## Output ownership rule

Prefer each important output to have one obvious owner.
If multiple sections affect one output, make the ownership and priority explicit.

## Syntax-sensitive caution

If the exact GX Works2 / Mitsubishi ST syntax is not confirmed from local docs for a specific construct:

- provide a platform-aware draft
- label syntax-sensitive areas as assumptions
- say which local manual category should be checked to finalize syntax

## Evidence-aware explanation rule

When explaining ST code:

- separate what is directly visible in the code
- separate what is a scan-cycle interpretation
- separate what depends on project declarations, device mapping, or external wiring

## Review rule

When reviewing ST, prioritize findings that affect:

1. wrong behavior
2. hazardous ambiguity
3. output overwrite risk
4. maintainability
5. readability

Do not over-focus on cosmetic style if the core execution logic is still unclear.
