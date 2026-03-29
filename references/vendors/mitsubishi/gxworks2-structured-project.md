# GX Works2 Structured Project guidance

Use this file when the task concerns project organization, modular structure, or engineering layout in GX Works2 Structured Project.

## Intent

Prefer outputs that fit structured engineering rather than monolithic one-shot logic.

## Default organization mindset

- Separate sequence control, device conditioning, alarm handling, interlocks, and mode handling where practical.
- Prefer explicit module responsibilities.
- Keep main execution flow readable.
- Avoid scattering repeated logic in many places when a reusable pattern can be proposed.

## Review points

When reviewing or refactoring:

- Check whether responsibilities are separated cleanly.
- Check whether outputs are written in one clear place or risk being overwritten.
- Check whether states, transitions, and reset paths are understandable.
- Check whether alarm logic and interlock logic are explicit.
- Check whether device allocation reflects the role of the logic.

## Output preference

When generating solutions, prefer this order:

1. Program structure proposal
2. Variable or device allocation proposal
3. ST block or pseudocode
4. Explanation of scan behavior and module interaction
5. Debug and test checklist
