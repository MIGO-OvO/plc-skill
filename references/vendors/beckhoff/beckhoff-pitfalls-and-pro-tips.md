# Beckhoff TwinCAT - Pitfalls and Pro Tips

This document captures real-world gotchas, workarounds, and battle-tested tricks specific to Beckhoff TwinCAT PLCs (which are based on Codesys).

## Pitfall 1: POINTER TO Without NULL Check = Runtime Crash
**Problem:** If you use `POINTER TO` and forget to check if the pointer is valid (not NULL), dereferencing it will crash the PLC runtime (Blue Screen / Exception).

**Example:**
```st
VAR
    pData : POINTER TO INT;
END_VAR

pData^ := 100;  // If pData = 0 (NULL), CRASH!
```

**Pro Tip:** Always check pointers before dereferencing:
```st
IF pData <> 0 THEN
    pData^ := 100;
ELSE
    ErrorFlag := TRUE;
END_IF;
```

**Better:** Use `REFERENCE TO` instead of `POINTER TO` when possible. References are safer and automatically dereferenced.

## Pitfall 2: Online Change Limitations
**Problem:** Not all code changes can be applied online. If you change the structure of a FB (add/remove variables), you must do a full download (which stops the PLC).

**Pro Tip:** 
- During development, use a separate "Development" FB that you can freely modify.
- Once stable, copy it to the "Production" FB.

## Pro Tip: Use `__ISVALIDREF` for Reference Validation
**Scenario:** You pass a `REFERENCE TO` variable to an FB, but you're not sure if it's valid.

**Workaround:**
```st
FUNCTION_BLOCK FB_Example
VAR_INPUT
    refData : REFERENCE TO INT;
END_VAR

IF __ISVALIDREF(refData) THEN
    refData := 100;
ELSE
    ErrorFlag := TRUE;
END_IF;
```
