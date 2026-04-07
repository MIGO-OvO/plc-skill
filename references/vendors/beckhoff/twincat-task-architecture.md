# TwinCAT task architecture

Use this file when the request involves TwinCAT task scheduling, cycle-time behavior, watchdogs, or splitting logic across tasks and programs.

## Why this file exists

TwinCAT projects often fail for architectural reasons rather than syntax reasons:

- the wrong program is assigned to the wrong task
- cycle time is too aggressive for the amount of work
- fast and slow logic are mixed in one task
- blocking logic trips the watchdog

## Core model

In TwinCAT:

1. A task defines the cycle time and priority.
2. One or more PLC programs are assigned to that task.
3. The task executes cyclically according to the TwinCAT runtime scheduler.

## Review priorities

When reviewing or debugging TwinCAT task architecture, check in this order:

1. task cycle time versus measured execution time
2. task priority relationships
3. which program or FBs belong in fast versus slow tasks
4. whether motion, fieldbus, and HMI-oriented logic are isolated appropriately
5. watchdog risk from loops, blocking calls, or excessive per-scan work

## Good patterns

- fast motion or tight control loops in a dedicated high-priority task
- slower HMI, logging, recipe, or housekeeping work in lower-frequency tasks
- explicit handoff variables or FB interfaces between tasks
- bounded work per scan

## High-risk patterns

- one giant task containing motion, logging, HMI, and diagnostics together
- long `FOR` / `WHILE` loops over large arrays every scan
- synchronous waiting for external events
- implicit shared-state coupling between tasks with no ownership model

## Debug cues

If the symptom is intermittent or timing-related, check:

- task execution time trend
- watchdog or overload events
- fieldbus update timing
- edge-triggered logic spanning multiple tasks
- whether the observed variable is written in more than one task

## Read with

- `references/vendors/beckhoff/beckhoff-rules.md`
- `references/common/scan-cycle-and-output-ownership.md`
- `references/common/debugging-and-review.md`
