# Code review checklists

Use this file when reviewing or refactoring PLC logic.

## Review goals

Evaluate:
- clarity
- maintainability
- module boundaries
- output ownership
- hidden dependencies
- reset behavior
- alarm/interlock completeness

## Core checklist

### Structure
- Are responsibilities separated clearly?
- Is sequence logic separated from alarm logic and interlock logic?
- Is the main flow understandable?

### State handling
- Are states explicit?
- Are transitions understandable?
- Are reset and recovery paths explicit?

### Output ownership
- Is each critical output written in one clear place?
- If not, is the ownership conflict documented and justified?

### Alarm logic
- Are set, hold, and reset paths explicit?
- Is repeated re-latching possible unintentionally?

### Timing behavior
- Are timers and counters used transparently?
- Is edge-sensitive behavior obvious?

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
