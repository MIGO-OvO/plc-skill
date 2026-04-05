# Beckhoff overview

Use this module when the request is clearly in the Beckhoff / TwinCAT 3 ecosystem.

## Current state

This module covers the core conventions of TwinCAT 3, its Codesys heritage, and its specific I/O mapping syntax.

## Reference Priority

When a Beckhoff / TwinCAT context is confirmed, read this file in addition to the common PLC rules:

1. `references/vendors/beckhoff/beckhoff-cheatsheet.md`

## Key Focus Areas

- Understanding hardware linking via `AT %I*` and `AT %Q*`.
- Leveraging advanced IEC 61131-3 features (OOP, Pointers, References).
- Using Global Variable Lists (GVL) and Data Unit Types (DUT).
- Avoiding critical runtime exceptions (Division by zero, Array Out of Bounds).
