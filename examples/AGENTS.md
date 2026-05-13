# Examples

Purpose: few-shot behavior samples; not the primary rule source.

## Areas

| Need | Area |
| --- | --- |
| vendor-neutral fallback | `common/` |
| vendor trigger behavior | `vendors/<vendor>/trigger-positive.md` |
| vendor-specific output flavor | `vendors/<vendor>/*-example.md` |

## Rules

- References beat examples when they conflict.
- Examples prove expected response shape and routing behavior.
- Add examples only for recurring model failures or important vendor flavor.
- Keep examples realistic: addresses, tags, software names, and failure symptoms must match the vendor.

## Current Coverage

- Common: motor control, state machine, debugging, overwrite diagnosis.
- Mitsubishi: richest example set, including negative trigger and review.
- Siemens/Rockwell/Omron: targeted generation/routing examples.

## Forbidden

- No generic PLC tutorials.
- No copied common rules.
- No examples for baseline vendors unless they prevent a real routing or syntax failure.
