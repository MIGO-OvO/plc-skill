# Siemens TIA Portal / S7-1200 / S7-1500 - Pitfalls and Pro Tips

This document captures the "tribal knowledge" that official manuals don't tell you—the real-world gotchas, workarounds, and battle-tested tricks specific to Siemens PLCs.

## Pitfall 1: ENO (Enable Output) Silent Failures
**Problem:** In SCL (Structured Text), when you call a function or FB, if the `ENO` (Enable Output) goes FALSE due to an error, the subsequent code may not execute as expected.

**Example:**
```scl
result := SQRT(inputValue);  // If inputValue is negative, ENO goes FALSE
nextValue := result + 10;    // This line STILL executes, but result is undefined!
```

**Pro Tip:** Always check `ENO` explicitly when calling functions that can fail:
```scl
result := SQRT(inputValue);
IF ENO THEN
    nextValue := result + 10;
ELSE
    // Handle error
    errorFlag := TRUE;
END_IF;
```

## Pitfall 2: Optimized Block Access and Absolute Addressing Don't Mix
**Problem:** If you enable "Optimized block access" on a DB, you **cannot** use absolute addressing (e.g., `DB1.DBW10`). The compiler will reject it.

**Pro Tip:** 
- For new projects, always use Optimized blocks and symbolic addressing.
- If you must interface with legacy HMI/SCADA that requires absolute addresses, create a separate non-optimized DB just for that interface.

## Pitfall 3: ARRAY Indices Start at 0 (Not 1)
**Problem:** Unlike some other languages, Siemens arrays are zero-indexed by default unless you explicitly declare otherwise.

```scl
VAR
    myArray : ARRAY[0..9] OF INT;  // 10 elements: 0 to 9
END_VAR

myArray[10] := 100;  // OUT OF BOUNDS! Will cause a runtime error.
```

**Pro Tip:** Always declare arrays with explicit bounds and add boundary checks in your code.

## Pro Tip: Pre-Allocate "Spare" Variables in Critical FBs
**Scenario:** You've deployed a machine with a complex FB. Later, you discover a bug that requires adding a new internal variable to the FB. But you can't modify the FB online without stopping the machine.

**Workaround:** In critical FBs, always pre-allocate a few spare variables:
```scl
VAR
    // ... your normal variables
    
    // Spares for future use (DO NOT DELETE)
    spare_Bool : ARRAY[0..4] OF BOOL;
    spare_Int : ARRAY[0..4] OF INT;
    spare_Real : ARRAY[0..2] OF REAL;
END_VAR
```

If you need to add logic later, you can use these spares and patch the logic externally without modifying the FB structure.
