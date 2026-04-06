# Function Block Diagram (FBD) Style Guide

**Scope of this file**: Block layout, signal flow, feedback loops, and review priorities for Function Block Diagram (FBD) programming.

Use this file when generating (via structural description), explaining, reviewing, or refactoring FBD Logic for this skill.

## Core style goals

Prefer FBD that is:
- **Data-flow oriented**: Left-to-Right signal processing.
- **Encapsulated**: Heavy use of reusable custom Function Blocks (FBs).
- **Cleanly routed**: Avoid overlapping connecting lines or "line spaghetti".
- **Explicit in execution order**: Where platforms allow, ensure the block execution order is logical and documented.

## Preferred code shape (for text/markdown representation)

When describing FBD:
- List the **Input Variables** and **Output Variables**.
- Describe the **Block Type** (e.g., PID, TON, SR_FlipFlop).
- Describe the **Connections**: `Sensor_A -> [ AND_1.In1 ]`, `[ AND_1.Out ] -> [ Motor_Run ]`.

## Layout and connection rules

Prefer:
- **Inputs on the left, Blocks in the middle, Outputs on the right**.
- **Page connectors / Jumpers**: If a line has to cross the entire screen and through 10 blocks, use a named connector/variable instead of drawing a physical line.
- **Standardized block spacing**: Group related mathematical or logical operations together.

Avoid:
- **Feedback loop ambiguity**: When output feeds back to an input of a previous block (creating a loop), ensure the delay/scan-cycle consequence is understood. Explicitly mark the feedback variable.
- **Unconnected pins**: If an input pin is not used, explicitly assign it a safe default value (e.g., `0`, `FALSE`) rather than leaving it floating, unless the vendor software safely defaults it.

## Encapsulation (Creating Custom FBs)

FBD shines when abstracting complexity.
- If a logic cluster (e.g., a motor starter with feedback delay, alarm, and manual override) is used more than twice, wrap it in a custom FB.
- Clearly define `VAR_INPUT`, `VAR_OUTPUT`, and `VAR_IN_OUT`.

## Review rule for FBD

When reviewing FBD, prioritize finding:
1. **Execution Order errors**: A block is executing before the block that feeds it data.
2. **Type Mismatches**: Connecting an INT to a REAL without an explicit conversion block (if the IDE doesn't auto-cast).
3. **Floating Inputs**: Critical enable pins left unconnected.
4. **Hidden State**: Using Functions (FC) when State is needed (FB is required), or vice versa.