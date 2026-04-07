# Contributing to PLC_SKILL

We welcome contributions to expand the common layer and vendor support! However, to prevent the repository from bloating into an unreadable "encyclopedia," we have strict rules for adding knowledge.

## The "Zero-Bloat" Manifesto

1. **No Manual Copy-Pasting:** Do NOT paste entire tables of vendor error codes, instruction sets, or wiring diagrams. Provide the *link* to the official manual instead. 
2. **Focus on "Gotchas", not "Basics":** The AI already knows basic IEC 61131-3 syntax. Tell the AI what it *doesn't* know (e.g., "In Siemens, FCs don't retain memory between scans", "In Mitsubishi, timers are strictly bound to T-devices").
3. **Prefer compact files:** Aim to keep markdown references under roughly 200 lines. If a file grows past that, split it unless the topic genuinely needs a longer cohesive reference, such as a vendor programming guide or official-doc index.

## Adding a New Vendor

If you are fleshing out a stub (e.g., Omron, Beckhoff), follow this strict checklist:

1. **Create/Update `<vendor>-overview.md`**: What is the primary software environment?
2. **Create `<vendor>-cheatsheet.md`**: A dense, 50-line summary of how memory addressing works (e.g., I/Q vs X/Y vs %I/%Q), block types, and timer/counter quirks.
3. **Update `vendor-recognition-signals.md`**: Add the unique keywords that trigger this vendor module.
4. **Update `vendor-routing.md`**: Route the AI to your new cheatsheet.

## Updating the Common Layer

If you have a great PLC design pattern (e.g., FIFO, Shift Register, PID wrapper):
1. Place it in `templates/common/`.
2. Ensure the code is strictly IEC 61131-3 generic Structured Text.
3. Decouple it from physical I/O (use generic UDTs/Structs).
4. Register it in `templates/common/template-map.md`.

## Validation Before PR

Before opening a pull request:

1. Run `npm test` to check internal markdown links, placeholder text, and package metadata consistency.
2. Review touched files for support-depth wording so it stays aligned with `references/vendors/vendor-module-map.md`.
