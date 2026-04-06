# Mitsubishi overview

Use this module when the request is clearly in the Mitsubishi / MELSEC ecosystem.

## Role of this module

This is the first mature vendor module in the PLC skill.

Use it for:

- Mitsubishi terminology and platform framing
- GX Works / GX Works2 / GX Works3 environment recognition
- FX-family oriented structured-programming guidance
- device-based reasoning in Mitsubishi context
- routing to the right Mitsubishi references and official documents

## Current depth

Deepest support currently exists for:

- FX3U
- GX Works2
- Structured Project
- Structured Text (ST)

Do not pretend all Mitsubishi families are covered at the same depth.

## Read path

For Mitsubishi requests, start with:

- `references/vendors/mitsubishi/mitsubishi-rules.md` when the work is FX3U-centric
- `references/vendors/mitsubishi/fx3u-focus.md` for FX3U task framing
- `references/vendors/mitsubishi/gxworks2-structured-project.md` for project organization
- `references/vendors/mitsubishi/official-doc-index.md` for official evidence routing

## Boundary rule

If the request is Mitsubishi but not clearly FX3U/GX Works2/ST, keep the answer conservative:

- use the common PLC layer for engineering patterns
- use Mitsubishi terminology where safe
- explicitly mark unsupported family-specific details as needing manual confirmation
