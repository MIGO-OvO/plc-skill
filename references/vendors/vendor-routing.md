# Vendor routing

Use this file after confirming the request is a PLC/programming task.

## Route order

1. Identify explicit vendor names
2. Identify software environment names
3. Identify CPU/model family names
4. Identify memory / tag / device terminology
5. Identify mixed-vendor conflicts
6. Fall back to common PLC guidance if vendor confidence is low

## Routing outcomes

### Mitsubishi

Route to Mitsubishi when cues include:

- Mitsubishi, MELSEC
- GX Works, GX Works2, GX Works3
- FX, FX3U, FX5U, Q, iQ-F, iQ-R
- X/Y/M/D/T/C style device references in a Mitsubishi context

Read:

- `references/vendors/mitsubishi/mitsubishi-overview.md`
- plus the narrowest Mitsubishi files needed

### Siemens

Route to Siemens when cues include:

- Siemens
- TIA Portal, STEP 7
- S7-1200, S7-1500, S7-300, S7-400
- OB / FB / FC / DB terminology

### Omron

Route to Omron when cues include:

- Omron
- CX-Programmer, Sysmac Studio
- CP, CJ, CS, NJ, NX

### Rockwell / Allen-Bradley

Route to Rockwell when cues include:

- Allen-Bradley, Rockwell
- RSLogix, Studio 5000, Logix Designer
- ControlLogix, CompactLogix, MicroLogix

### Schneider

Route to Schneider when cues include:

- Schneider, Modicon
- EcoStruxure, Unity Pro, Control Expert
- M221, M241, M251, M340, M580

### Delta

Route to Delta when cues include:

- Delta
- WPLSoft, ISPSoft
- DVP, AS series, AH series

### Keyence

Route to Keyence when cues include:

- Keyence
- KV Studio
- KV series

### Panasonic

Route to Panasonic when cues include:

- Panasonic
- FPWIN, Control FPWIN
- FP series

### Beckhoff

Route to Beckhoff when cues include:

- Beckhoff
- TwinCAT
- PLC project in TwinCAT ecosystem

### Codesys

Route to Codesys when cues include:

- CODESYS, Codesys
- SoftPLC / runtime wording tied to Codesys ecosystem
- IEC-tag oriented environment with explicit Codesys runtime mention

## Mixed-vendor warning rule

If the request mixes ecosystems, say so explicitly.

Examples:

- GX Works + TIA Portal
- Mitsubishi devices + Siemens OB/DB structure
- Studio 5000 + Codesys runtime semantics

Do not merge them into one answer unless the user is explicitly asking for comparison or migration.

## Low-confidence rule

If vendor recognition is weak:

- stay in the common PLC layer
- say which details are vendor-dependent
- ask only for the missing minimum context needed to specialize
