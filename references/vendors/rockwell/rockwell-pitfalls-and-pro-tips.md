# Rockwell / Allen-Bradley Studio 5000 - Pitfalls and Pro Tips

This document captures real-world gotchas, workarounds, and battle-tested tricks specific to Rockwell/Logix PLCs.

## Pitfall 1: AOI (Add-On Instruction) Cannot Be Edited Online
**Problem:** Once an AOI is downloaded to the controller, you **cannot** edit its logic online. You must go offline, edit, and re-download (which stops the controller).

**Pro Tip:** 
- For complex, evolving logic, use regular FBs (Function Blocks) instead of AOIs during development.
- Reserve AOIs for truly stable, reusable components.
- Pre-allocate spare parameters in AOIs:
  ```
  Input Parameters:
      Enable : BOOL
      Setpoint : REAL
      Spare_Input_1 : REAL  // For future use
      Spare_Input_2 : REAL
  ```

## Pitfall 2: Array Out-of-Bounds Causes Major Fault (Controller Stops)
**Problem:** Accessing an array element outside its declared range causes a **major fault** and the controller stops immediately.

**Example:**
```st
VAR
    DataArray : ARRAY[0..99] OF DINT;
    Index : DINT := 150;
END_VAR

Value := DataArray[Index];  // MAJOR FAULT! Controller stops.
```

**Pro Tip:** Always validate array indices before access:
```st
IF Index >= 0 AND Index <= 99 THEN
    Value := DataArray[Index];
ELSE
    FaultFlag := TRUE;
END_IF;
```

## Pitfall 3: Produced/Consumed Tags and Network Latency
**Problem:** Produced/Consumed tags (for sharing data between controllers over Ethernet) have a **Requested Packet Interval (RPI)**. If you set it too slow (e.g., 500ms), your control loop will be sluggish.

**Pro Tip:** 
- For time-critical data, set RPI to 10-20ms.
- For non-critical status data, 100-500ms is fine.
- Monitor the "Connection Status" in the Controller Tags to detect communication failures.

## Pro Tip: Use "Inhibit" Bit for Debugging Specific Rungs
**Scenario:** You want to temporarily disable a specific rung of ladder logic without deleting it.

**Workaround:** Add a debug tag:
```
VAR_GLOBAL
    Debug_Inhibit_Rung_5 : BOOL := FALSE;
END_VAR
```

Then in your ladder rung:
```
XIC Debug_Inhibit_Rung_5  ----[/]----  (Your original logic)
```

Set `Debug_Inhibit_Rung_5 := TRUE` from the HMI or watch window to disable that rung.
