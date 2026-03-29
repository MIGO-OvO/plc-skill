# Alarm and interlock patterns

Use this file when generating, reviewing, or debugging alarm logic, permissives, interlocks, and reset behavior.

## Why this matters

Current Mitsubishi safety text and PLCopen software-construction guidance both point in the same direction:

- critical behavior should be explicit
- hidden dependencies are dangerous
- safety-related assumptions must not be buried inside convenient code
- maintenance and troubleshooting must remain practical over the life cycle

## Core alarm pattern

Prefer alarm logic with clearly separated parts:

1. trigger condition
2. latch behavior
3. hold behavior if applicable
4. reset permissive condition
5. reset command handling
6. re-latch prevention check

This separation improves:
- readability
- online debugging
- review quality
- avoidance of immediate re-latch confusion

## Core interlock pattern

Prefer interlock logic with clearly separated parts:

1. run request
2. mode permissive
3. process permissive
4. fault / abnormal inhibit
5. output enable decision

Do not bury interlock decisions in many unrelated places.

## Reset behavior rules

For fault reset or alarm reset:

- make the reset command explicit
- make reset permissive explicit
- do not imply that pressing reset should always clear a condition
- if the root trigger still exists, say that re-latch is expected behavior

## Review questions

When reviewing alarm or interlock code, inspect:

- Is the set condition obvious?
- Is the reset condition obvious?
- Can the logic re-latch immediately after reset?
- Does another block force the same condition back on?
- Is there one clear owner for the alarm/output state?
- Are fault inhibits and process permissives mixed together in a confusing way?

## Debugging questions

When troubleshooting:

- Is the alarm source still true?
- Is reset permissive false?
- Is another section writing the same output or state bit?
- Is the current step/state preventing reset?
- Is the visible symptom actually field-side rather than logic-side?

## Safety boundary reminder

Do not confuse program interlocks with complete machine safety.
If the question touches emergency stop, guard circuits, hazardous motion, or protection against serious damage:

- require external circuit / fail-safe confirmation
- do not claim the ST logic alone is a complete safety answer

## Output preference

When producing answers in this area, prefer:

1. known conditions
2. assumptions
3. alarm / interlock structure
4. ST skeleton or review notes
5. likely failure paths
6. verification checklist
