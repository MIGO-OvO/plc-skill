# GX Works2 structured project deep notes

Use this file when the request concerns GX Works2 Structured Project layout, modular engineering style, or maintainability-oriented project organization.

## Evidence basis

This file compresses the guidance that matters most for skill execution:

- GX Works2 structured-project programming concepts
- beginner-oriented project organization guidance
- FXCPU structured programming patterns that affect modular ST work

If the task depends on exact editor workflow, exact object naming, or exact compiler limitation, direct Mitsubishi manual confirmation is still required.

## What this reference is for

This file guides how the skill should think about structured-project work, even when the exact project tree is not provided.

## Default engineering stance

Prefer GX Works2 Structured Project outputs that look like maintainable engineering work, not like a single giant code block.

Default preference:

- separate sequence logic from interlock logic
- separate alarm logic from normal run logic
- separate mode handling from process execution
- make output ownership explicit
- make reset paths explicit
- keep the main execution path readable

## When the user asks to generate code

Prefer this order:

1. identify the module boundary
2. propose the program structure
3. propose variable / device allocation
4. provide ST skeleton or code
5. explain scan interaction between modules
6. give a test / debug checklist

## When the user asks to explain or review a project

Inspect for:

- whether responsibilities are split clearly
- whether the same output is written in multiple places
- whether state transitions are understandable
- whether alarm and reset logic are explicit
- whether future maintenance will likely create conflicts

## Refactoring direction

When improving a weak project structure, prefer:

- smaller logical modules
- fewer conflicting writes
- explicit state or step ownership
- clear reset and fault handling
- patterns that are easy to online-monitor during commissioning

Avoid:

- rewriting everything if a targeted structural cleanup is enough
- cosmetic renaming without solving ownership or flow problems
- introducing excessive abstraction that hides field-debug behavior

## Information gaps and how to behave

If the user does not provide the actual project tree or module list:

- propose a maintainable structure
- mark it as a recommended project organization, not a confirmed reconstruction
- ask only for the minimum missing structure details if they matter to the answer

## Practical compressed guidance

Use structured-project reasoning to keep these concerns visible:

- one place for output ownership when practical
- clear separation between normal sequence flow and protection logic
- explicit fault, reset, and restart behavior
- state visibility that supports online monitoring
- module boundaries that make future edits less risky
