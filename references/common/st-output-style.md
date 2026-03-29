# ST output style

Use this file when generating, explaining, reviewing, or refactoring Structured Text.

## Output goals

- Prefer readable, modular ST.
- Prefer reusable logic patterns over isolated one-off code.
- Explain assumptions when exact platform constraints are not confirmed.

## Preferred response order

1. Requirement understanding
2. Known conditions
3. Assumptions
4. Program structure
5. Variable or device mapping suggestion
6. ST code or pseudocode
7. Explanation
8. Risk points
9. Debugging steps
10. Test checklist

## Style guidance

- Prefer clear sectioned logic over dense nested conditionals when possible.
- Prefer explicit state naming or step semantics for sequential control.
- Prefer explicit reset and hold behavior for alarms and latches.
- Prefer comments only where they improve maintainability.
- Flag any portion that depends on exact Mitsubishi ST syntax or project declarations if not confirmed from docs.

## When details are missing

If declarations, addressing rules, or supported syntax are unclear:

- provide a platform-aware draft
- label syntax-sensitive parts as assumptions
- say which document category should be checked to finalize the code
