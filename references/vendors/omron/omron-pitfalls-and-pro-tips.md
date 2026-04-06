# Omron Sysmac Studio (NJ/NX Series) - Pitfalls and Pro Tips

This document captures real-world gotchas, workarounds, and battle-tested tricks specific to Omron Sysmac Studio PLCs.

## Pitfall 1: Task Period Exceeded Fault
**Problem:** If your program takes longer to execute than the task period (e.g., program takes 12ms but task period is 10ms), you get a "Task Period Exceeded" fault and the controller stops.

**Pro Tip:** 
- Monitor task execution time in the "Task Settings" diagnostics.
- Move heavy calculations (e.g., FFT, complex math) to a slower, lower-priority task.
- Use the `Inline ST` feature sparingly—it can bloat execution time.

## Pitfall 2: Global Variables vs. Local Variables Scope Confusion
**Problem:** Sysmac Studio uses strict variable scoping. A variable declared in a Program is **not** accessible from another Program unless it's in the Global Variable Table.

**Pro Tip:** 
- Use the Global Variable Table for I/O mapping and inter-program communication.
- Use Program-local variables for internal calculations.
- If you get "Variable not found" errors, check the scope first.

## Pro Tip: Use "Retain" Attribute Carefully
**Scenario:** You mark a variable as `Retain` (survives power cycle), but after a firmware update, the retained value causes unexpected behavior.

**Workaround:** 
- Always initialize retained variables on first scan:
  ```st
  IF FirstScan THEN
      RetainedCounter := 0;
  END_IF;
  ```
- Or use a "Reset to Defaults" button on the HMI to clear retained values.
