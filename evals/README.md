# Eval index

Use this folder as a lightweight regression set for the skill.

## Current eval groups

- `generation-cases.md`
- `explanation-cases.md`
- `review-cases.md`
- `debugging-cases.md`
- `incomplete-input-cases.md`
- `non-trigger-cases.md`
- `routing-cases.md`
- `output-behavior-cases.md`

## Intended usage

When iterating the skill, check whether changes preserve:

1. trigger accuracy
2. output structure quality
3. conservative handling of missing information
4. conservative handling of safety-sensitive questions
5. stable review/debugging behavior

## Minimum regression checklist

Before accepting a major skill edit, verify:

- should-trigger cases still clearly trigger
- non-trigger cases do not over-expand the skill
- incomplete-input cases produce assumptions or clarification, not fake certainty
- debugging cases prioritize fault isolation over guesswork
- review cases prioritize ownership and structure, not cosmetic comments
