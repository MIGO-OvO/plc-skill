# Siemens Vendor Routing

Use this file to guide the routing of Siemens-specific requests.

## Routing Signals

When any of the following cues are present, route the request to the Siemens vendor module:

### Explicit Mentions
- Siemens
- SIMATIC
- TIA Portal
- STEP 7
- WinCC (in context of PLC)

### Controller Families
- S7-1200
- S7-1500
- S7-300
- S7-400
- ET 200SP / ET 200MP

### Terminology and Architecture
- OB (Organization Block)
- FB (Function Block)
- FC (Function)
- DB (Data Block)
- Instance DB
- Multi-instance
- Optimized block access
- SCL (Structured Control Language - Siemens name for ST)

## Recommended Reading Path for Siemens Requests

When a Siemens context is confirmed, load the following files in order:

1. `references/vendors/siemens/siemens-overview.md` (Context setting)
2. `references/vendors/siemens/siemens-rules.md` (Core engineering rules)
3. `references/vendors/siemens/siemens-project-structure.md` (Program organization)
4. `references/vendors/siemens/siemens-device-and-instruction-notes.md` (Addressing and instructions)
5. `references/vendors/siemens/siemens-st-programming-guide.md` (If request involves ST/SCL programming)
6. `references/vendors/siemens/official-doc-index.md` (For official manual citations)

## Boundary Conditions

### Legacy vs. Modern
- The primary focus is on **S7-1200/1500** using **TIA Portal**.
- If the request explicitly involves **S7-300/400** or classic **STEP 7 V5.x**, note the differences (e.g., non-optimized block access, heavy reliance on absolute addressing, different timer/counter usage).

### SCL vs. ST
- Siemens calls Structured Text "SCL" (Structured Control Language). Treat them synonymously, but prefer "SCL" in responses if the user uses that term.

### Mixing Vendors
- If a user asks to migrate from Siemens to another vendor (or vice versa), explicitly map the concepts:
  - Siemens OB1 -> Main cyclic task in Codesys/TwinCAT
  - Siemens FB + Instance DB -> Function Block with local memory
  - Siemens DB (Global) -> Global Variable List (GVL)
