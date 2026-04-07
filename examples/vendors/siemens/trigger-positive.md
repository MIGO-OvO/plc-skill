# Siemens Trigger Example

## User prompt

"I need to write an SCL function block in TIA Portal for an S7-1500 PLC that calculates moving averages for analog inputs."

## Expected skill behavior

- Identify the target platform as Siemens (TIA Portal, S7-1500, SCL).
- Route the request to the Siemens vendor module (`references/vendors/siemens/`).
- Output proper `FUNCTION_BLOCK` syntax using Siemens specific file and block headers.
- Utilize standard Siemens conventions, such as `#` for local variables and double quotes `""` for global tags.
- Suggest optimized block access settings (`{ S7_Optimized_Access := 'TRUE' }`).

## Why this example matters

This ensures the skill correctly detects a Siemens-specific request from keywords like "TIA Portal" or "S7-1500" and reliably applies the correct vendor constraints and syntax formatting, rather than providing generic IEC 61131-3 logic or falling back to Mitsubishi patterns.