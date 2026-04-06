# Logic Output Style

**Scope of this file**: response output format, section order, and presentation rules when delivering PLC code (ST, LD, FBD, SFC) in a response.
For language-specific rules, see `st-style-guide.md`, `ld-style-guide.md`, or `fbd-style-guide.md`.

Use this file when generating, explaining, reviewing, or refactoring PLC logic.

## Output goals

- Prefer readable, modular logic.
- Prefer reusable logic patterns over isolated one-off code.
- Explain assumptions when exact platform constraints are not confirmed.
- When generating visual languages (LD/FBD/SFC) in text, use clear ASCII diagrams or unambiguous structural descriptions.

## Preferred response order

1. Requirement understanding
2. Known conditions
3. Assumptions
4. Program structure & Architecture
5. Variable or device mapping suggestion (Tags / I/O)
6. **The Code** (ST code block, LD ASCII/structural description, or FBD data-flow description)
7. Explanation of the logic
8. Risk points & Edge cases
9. Debugging steps
10. Test checklist

## Style guidance for multi-language output

- **ST (Structured Text)**: Use standard code blocks ```iecst . Provide clear sectioned logic over dense nested conditionals.
- **LD (Ladder Diagram)**: Provide textual representation of the rungs. Clearly separate Conditions (Inputs) from Actions (Coils/Outputs).
  - Example representation: `[Condition A] --| |-- [Condition B] --|/|---- (Output C)`
- **FBD (Function Block Diagram)**: Describe the data flow. List the blocks and their interconnections.
  - Example: `Input_Sensor -> [ TON_1.IN ] ; TON_1.Q -> [ Motor_Start ]`
- **General**:
  - Prefer explicit state naming or step semantics for sequential control.
  - Prefer explicit reset and hold behavior for alarms and latches.
  - Flag any portion that depends on exact vendor syntax (e.g., Mitsubishi vs Siemens ST timers) if not confirmed from docs.

## When details are missing

If declarations, addressing rules, or supported syntax are unclear:

- provide a platform-aware draft using generic IEC 61131-3 concepts
- label syntax-sensitive parts as assumptions
- say which vendor document category should be checked to finalize the code