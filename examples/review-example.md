# Review example

## Input style

User provides a block of ST code from a GX Works2 Structured Project and asks for maintainability review.

## Expected behavior

The skill should:
- assess structure first
- identify output ownership conflicts
- point out hidden state dependencies
- recommend refactoring direction
- avoid rewriting everything unless necessary

## Preferred output shape

1. overall assessment
2. key findings
3. impact
4. suggested restructuring
5. partial rewrite if useful
6. validation checklist
