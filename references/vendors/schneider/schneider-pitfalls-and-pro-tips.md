# Schneider Electric (Modicon M580 / M340) - Pitfalls and Pro Tips

This document captures real-world gotchas, workarounds, and battle-tested tricks specific to Schneider Electric PLCs.

## Pitfall 1: MAST Task Overrun
**Problem:** If the MAST task takes too long, you get a task overrun fault. Unlike some PLCs, Modicon does **not** automatically extend the task—it faults.

**Pro Tip:** 
- Use the "Task Monitor" in Control Expert to see execution time.
- Move non-critical logic to AUX tasks (lower priority).

## Pitfall 2: DFB (Derived Function Block) Instances and Memory
**Problem:** Each DFB instance allocates memory. If you create 1000 instances of a large DFB, you can run out of memory.

**Pro Tip:** 
- Keep DFBs lean. Don't declare large arrays inside DFBs unless necessary.
- Use global arrays and pass pointers/references to DFBs instead.
