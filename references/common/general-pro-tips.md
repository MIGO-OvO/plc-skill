# General Pro Tips (All Vendors)

This document captures cross-platform, battle-tested tricks that separate junior engineers from veterans.

### Pro Tip 1: Always Use a "FirstScan" Flag
Most PLCs have a system flag for the first scan (e.g., Siemens FirstScan, Rockwell S:FS, Mitsubishi M8002). Use it to initialize variables and state machines safely:
``st
IF FirstScan THEN
    Counter := 0;
    State := 0;
    ErrorFlag := FALSE;
END_IF;
``

### Pro Tip 2: Implement a "Soft Reset" Command
Add an HMI button that resets the machine to a known state without power-cycling. This prevents operators from abusing the main power breaker.
``st
IF HMI_SoftReset THEN
    Counter := 0;
    State := 0;
    ErrorFlag := FALSE;
    // ... reset all critical variables
    HMI_SoftReset := FALSE;  // Self-clearing
END_IF;
``

### Pro Tip 3: Pre-Allocate "Spare" Variables in Critical Blocks
Scenario: You've deployed a machine with a complex Function Block. Later, you discover a bug that requires adding a new internal variable. In many PLCs, modifying the structure requires a download that stops the controller.

Workaround: In critical FBs, always pre-allocate a few spare variables:
``st
VAR
    // ... normal variables
    
    // Spares for future use (DO NOT DELETE)
    spare_Bool : ARRAY[0..4] OF BOOL;
    spare_Int : ARRAY[0..4] OF INT;
    spare_Real : ARRAY[0..2] OF REAL;
END_VAR
``

### Pro Tip 4: Log Faults to Retained/Non-Volatile Memory
When a fault occurs, log the timestamp, fault code, and relevant machine state (e.g., sequence step) to non-volatile memory or send it to SCADA. This is invaluable for post-mortem debugging of intermittent faults.
