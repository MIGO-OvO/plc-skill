# Omron overview

Use this module when the request is clearly in the Omron ecosystem.

## Current state

This module covers the core differences between the legacy memory-mapped ecosystem (CX-Programmer) and the modern tag-based ecosystem (Sysmac Studio).

## Reference Priority

When an Omron context is confirmed, read this file in addition to the common PLC rules:

1. `references/vendors/omron/omron-cheatsheet.md`

## Key Focus Areas

- Determining the era: **CX-Programmer** (Absolute addressing: CIO, D, W, H) vs **Sysmac Studio** (Tag-based, IEC 61131-3).
- Standard IEC timer (`TON`, `PT=T#2s`) and array conventions.
- Awareness of the **EtherCAT Primary Periodic Task** in NJ/NX controllers.
