# Ladder Diagram (LD) Style Guide

**Scope of this file**: Network/Rung organization, coil ownership, contact layout, sequence control, and review priorities for Ladder Diagram (LD) programming.

Use this file when generating (via ASCII/text representation or structural description), explaining, reviewing, or refactoring Ladder Logic for this skill.

## Core style goals

Prefer Ladder Logic that is:
- **Left-to-Right, Top-to-Bottom readable**: Signals flow clearly from permissive conditions to outputs.
- **Single-Coil safe**: Avoid multiple destructive writes to the same coil (Double Coil Syndrome).
- **Network/Rung segregated**: One logical action per rung. Avoid overly complex "spaghetti rungs".
- **Self-documenting**: Clear naming and rung comments explaining *why*, not just *what*.

## Preferred code shape (for text/markdown representation)

Since LLMs output text, represent Ladder Logic clearly:
- Use standard text symbols `| |` (NO), `|/|` (NC), `( )` (Coil), `(S)` (Set), `(R)` (Reset), `[ ]` (Instruction Box).
- Or describe the logic structurally: `IF [Conditions] THEN [Output]`.
- Always provide Variable/Tag mappings before the logic.

## Layout and Rung rules

Prefer:
- **Conditions on the left, Outputs on the right**.
- **Interlocks and Safety first**: Place safety, e-stop, and hard interlocks closest to the power rail (leftmost) or immediately preceding the coil (rightmost) depending on vendor best practice, but keep them consistent.
- **Parallel branches for OR logic**: Keep them shallow. If an OR branch gets too deep, map it to an intermediate relay/flag first.
- **One primary output per rung**: If multiple coils must trigger together, place them in parallel at the end of the rung.

Avoid:
- **Reverse power flow**: IEC 61131-3 allows some complex routing, but it kills readability.
- **Double Coils**: Never use `( )` for the same tag in different rungs. If multiple conditions drive an output, use intermediate flags or `(S)`/`(R)` (with caution).

## Sequence and state logic in LD

For state machines in Ladder:
- **Step Relays**: Use explicit integer step values (e.g., `Step = 10`) and compare instructions `[CMP]`, OR use sequential internal relays (e.g., `M10` for Step 1, `M11` for Step 2).
- **Clear Transitions**: Rung 1: Check Step N + Transition Condition -> Latch Step N+1, Unlatch Step N.
- **Action Rungs**: Separate the "State logic" from the "Action logic". Map `Step X` to drive physical outputs in dedicated rungs at the bottom of the program.

## Set / Reset (Latch / Unlatch) usage

- Use `(S)` and `(R)` carefully. 
- Always place the `(R)` reset condition *after* the `(S)` set condition in the scan cycle so that a continuous reset command overrides a set command (Reset Dominant), unless the process explicitly requires Set Dominant behavior.
- Document where the matching pair is located if they are not in adjacent rungs.

## Review rule for LD

When reviewing Ladder Logic, prioritize finding:
1. **Double Coils**: The most common LD bug.
2. **Scan Cycle hazards**: Relying on an intermediate flag that gets overwritten before it is used.
3. **Missing Interlocks**: E.g., Motor Forward and Motor Reverse missing hardware/software cross-interlocks.
4. **Timer/Counter Reset bugs**: Failing to drop the permissive condition to reset a timer.