# Code review checklists

Use this file for review findings, review checkpoints, and review-output structure.

## Role boundary

This file defines review checklist content.
It does not define the shared workflow.

Read first when needed:

- `references/common/debugging-and-review.md` for the common review workflow
- `references/vendors/mitsubishi/gxworks2-project-review-patterns.md` for GX Works2 project-level maintainability patterns

## Core checklist

### Structure

- Are responsibilities separated clearly?
- Is sequence logic separated from alarm logic and interlock logic?
- Is the main flow understandable without tracing many unrelated bits?

### State handling

- Are states explicit?
- Are transitions understandable?
- Are reset and recovery paths explicit?

### Output ownership

- Is each critical output written in one clear place?
- If not, is the ownership conflict documented and justified?

### Alarm and reset logic

- Are set, hold, and reset paths explicit?
- Is repeated re-latching possible unintentionally?
- Are permissive and inhibit conditions distinguishable?

### Timing behavior

- Are timers and counters used transparently?
- Is edge-sensitive behavior obvious?
- Can online monitoring quickly explain why timing did or did not complete?

### Maintainability

- Is duplicate logic present?
- Can repeated patterns be turned into reusable structure?
- Will future edits likely introduce conflicts?

## Review output recommendation

For each finding, report:

1. issue
2. impact
3. recommended change
4. optional example rewrite

## Escalate to companion references

Use `references/vendors/mitsubishi/gxworks2-project-review-patterns.md` when the problem is project-level organization.
Use `references/common/scan-cycle-and-output-ownership.md` when multi-writer or scan-order conflict is suspected.
