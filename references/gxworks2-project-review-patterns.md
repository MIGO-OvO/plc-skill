# GX Works2 project review patterns

Use this file when reviewing, refactoring, or explaining a GX Works2 Structured Project from a maintainability and fault-isolation perspective.

## Purpose

This file turns general review advice into concrete project-review patterns.

## Review priorities

Inspect in this order when possible:

1. module boundaries
2. step/state ownership
3. output ownership
4. alarm and fault handling
5. reset behavior
6. online-monitoring friendliness

## Pattern 1: Good module boundary

Healthy signs:

- sequence logic is grouped clearly
- mode logic is not scattered everywhere
- alarm logic is not mixed into every output rung/block
- outputs have one obvious decision point

Weak signs:

- one block mixes sequencing, alarm reset, mode control, and direct outputs
- many small fragments write the same behavior from different places

## Pattern 2: State ownership is explicit

Healthy signs:

- current state or step is visible
- transition conditions are visible
- fault branch is visible
- reset/recovery path is visible

Weak signs:

- step progression depends on many unrelated bits with no clear owner
- the current active mode/state cannot be inferred quickly during online debugging

## Pattern 3: Output ownership is explicit

Healthy signs:

- one place clearly decides whether a critical output is on or off
- inhibit and permissive conditions are visible near that decision

Weak signs:

- output is set in one place and cleared elsewhere without an explicit priority model
- manual, auto, reset, and fault logic all fight over the same output

## Pattern 4: Alarm handling is reviewable

Healthy signs:

- set condition, hold behavior, and reset behavior are visible
- alarm logic is easy to online-monitor

Weak signs:

- alarm logic is embedded inside step logic with no explicit alarm owner
- reset appears to work only because another condition happens to fall away

## Pattern 5: Future maintenance risk is visible

High-risk signs:

- duplicate logic copied across steps or modules
- hidden state bits reused for unrelated purposes
- no clear distinction between process permissive and fault inhibit
- comments explain intent, but structure still hides execution flow

## Refactoring rule

When suggesting changes:

- prefer structural cleanup over total rewrite
- preserve the user's likely control intent
- reduce writer conflicts first
- make the next debugging session easier, not just the code prettier

## Suggested review output

For each key finding, report:

1. finding
2. likely impact
3. why it matters in GX Works2 project maintenance
4. recommended change
5. optional rewrite sketch
