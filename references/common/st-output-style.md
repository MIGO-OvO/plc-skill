# ST output style

Use this file when the response should present Structured Text clearly and consistently.

## Goal

Keep ST responses easy to review during commissioning, code review, and troubleshooting.

## Preferred response order

1. Requirement understanding
2. Known conditions
3. Assumptions
4. Program structure or module boundary
5. Variable / device / tag mapping suggestion
6. ST code block
7. Logic explanation
8. Risks and vendor-sensitive points
9. Debug / validation checklist

## Code presentation rules

- Prefer fenced `iecst` or `st` code blocks.
- Prefer explicit state, latch, reset, and ownership handling over compressed one-liners.
- Keep signal naming and comments aligned with the surrounding vendor context.
- Separate code that is confirmed from code that is still an assumption.

## Vendor-sensitive rule

If exact syntax depends on the platform:

- keep the ST structure generic enough to review
- call out the syntax-sensitive line or construct
- name the vendor file or manual category needed to finalize it

## Read with

- `references/common/st-style-guide.md`
- `references/common/output-format.md`
- the active vendor module when platform details matter
