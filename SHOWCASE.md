# PLC_SKILL Showcase

Why use this skill instead of a "vanilla" AI assistant? 

General LLMs understand IEC 61131-3 syntax, but they lack **industrial engineering common sense**. They write PLC code like it's a generic Python script. 

Here is the difference `PLC_SKILL` makes.

## Scenario: Motor Start/Stop with Faults

**User Prompt:**
> "Write a motor control block. It has a start button, a stop button, and a thermal overload fault."

### ❌ Vanilla AI Output (The "Toy" Code)

```iecst
IF StartButton AND NOT StopButton AND NOT ThermalFault THEN
    MotorRun := TRUE;
ELSIF StopButton OR ThermalFault THEN
    MotorRun := FALSE;
END_IF;
```
**Why this is dangerous in a real plant:**
1. **No Auto/Manual mode:** How does maintenance jog the motor?
2. **No Fault Latching:** If the thermal switch bounces back to normal, the fault disappears. The operator doesn't know why it stopped.
3. **Implicit logic:** Mixing physical inputs directly with the output coil makes simulation and SCADA integration a nightmare.

---

### ✅ PLC_SKILL Output (The "Industrial" Code)

Using the `equipment-module-template.md` and `alarm-latch-reset-template.md`, the skill generates an isolated, SCADA-ready block:

```iecst
// 1. Fault Handling (Latched)
IF NOT Interlocks.ThermalOK THEN
    AlarmFaulted := TRUE;
END_IF;

IF Commands.ReqReset AND Interlocks.ThermalOK THEN
    AlarmFaulted := FALSE;
END_IF;

Status.IsFaulted := AlarmFaulted;

// 2. Mode Selection
IF Commands.ReqAuto AND NOT AlarmFaulted THEN
    StateAuto := TRUE;
ELSIF Commands.ReqManual OR AlarmFaulted THEN
    StateAuto := FALSE;
END_IF;

// 3. Execution (Auto vs Manual)
IF AlarmFaulted THEN
    StateRunning := FALSE;
ELSIF StateAuto THEN
    // SCADA or Sequence driven
    IF Commands.CmdStart THEN StateRunning := TRUE; END_IF;
    IF Commands.CmdStop THEN StateRunning := FALSE; END_IF;
ELSE
    // Maintenance Jog
    StateRunning := Commands.ManualFwd AND NOT Commands.ManualRev;
END_IF;

// 4. Clean Output Mapping
OutMotorContactor := StateRunning;
```
**Why this is production-ready:**
1. **Decoupled I/O:** Easy to map physical inputs or simulate.
2. **State Isolation:** Manual and Auto modes are strictly separated.
3. **Safe Faults:** Faults drop the system to Manual/Stop and MUST be explicitly reset.

## Scenario: Mixed Vendor Mismatch

**User Prompt:**
> "I'm using TIA Portal. Please write a state machine and output it to Y0."

### ❌ Vanilla AI Output
*Silently complies, generating Siemens SCL code but using Mitsubishi `Y0` memory addresses, which will cause a syntax error when pasted into TIA Portal.*

### ✅ PLC_SKILL Output
> ⚠️ **Vendor Mismatch Detected:** You mentioned using **TIA Portal (Siemens)**, but asked to output to **Y0 (Mitsubishi addressing)**. 
> In Siemens, physical outputs are typically addressed using `Q` (e.g., `Q0.0`). 
> Are we writing this for a Siemens S7 PLC, or a Mitsubishi PLC? I will use standard standard IEC `Q` addresses for the SCL code below...