# Siemens Project Structure and Scheduling

This file covers the conventions for organizing a Siemens (TIA Portal / STEP 7) project and how block scheduling works.

## 1. Organization Blocks (OB)

OBs are the interface between the operating system and the user program.

- **OB1 (Main / Program Cycle):** The main cyclic loop. Most general logic is called from here.
- **OB3x (Cyclic Interrupts):** e.g., OB30, OB35. Use these for PID controllers or logic that must execute at an exact, predictable time interval (e.g., exactly every 10ms).
- **OB100 (Startup):** Executes exactly once when the PLC transitions from STOP to RUN. Use this for initializing variables, resetting state machines, or home positions.
- **OB8x / OB12x (Error/Diagnostic OBs):** e.g., OB82 (Diagnostic Interrupt), OB86 (Rack Failure), OB121 (Programming Error). In S7-300/400, if these OBs are missing and an error occurs, the PLC goes to STOP. In S7-1200/1500, default behavior is generally to stay in RUN, but these OBs are still used to capture diagnostic information.

## 2. Program Modularization

A good Siemens program avoids dumping everything in OB1.

**Recommended Pattern:**
1. **OB1** calls organizational FCs (e.g., `FC_Read_Inputs`, `FC_Main_Logic`, `FC_Write_Outputs`).
2. `FC_Main_Logic` calls specific equipment FBs.
3. Keep hardware read/write separated from internal logic processing.

## 3. Data Block (DB) Conventions

- **Global DB:** Use for HMI communication, SCADA data, or system-wide configuration. Group variables logically (e.g., `DB_HMI_Interface`, `DB_System_Params`).
- **Optimized Block Access:** In S7-1200/1500, FBs and DBs should have "Optimized Block Access" enabled by default. This improves performance but means absolute addressing (byte offsets) is not available. Only disable it if you must communicate with legacy systems (like WinCC 7.x, 3rd party OPC using absolute addressing, or PUT/GET communication).

## 4. Retentive Memory

- Use DBs to store retentive data (data that survives a power cycle).
- In optimized DBs, you can set "Retain" on a per-variable basis.
- Avoid using the M-memory retentive area for complex structures.