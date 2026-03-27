# Safety boundaries

Use this file when the task touches wiring, interlocks, machine safety, forced outputs, or any control decision that could be hazardous if assumptions are wrong.

## Conservative limits

Do not present high-confidence safety conclusions when any of these are unconfirmed:

- wiring details
- normally-open or normally-closed semantics in the field
- actuator behavior
- fail-safe requirements
- emergency-stop or guard-circuit architecture
- electrical protection and hardware boundaries

## Required response behavior

- State what is known.
- State what is assumed.
- State what must be confirmed on site or from project documents.
- Prefer giving verification steps, design cautions, and review points over giving a dangerous final conclusion.

## Typical caution areas

- emergency stop logic
- safety door logic
- motion enable logic
- forced outputs
- bypass logic
- reset behavior after fault or power cycle
- interlocks that protect people or equipment
