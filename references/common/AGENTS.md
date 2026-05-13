# Common PLC Layer

Purpose: vendor-neutral PLC engineering rules and response behavior.

## Entry

| Need | File |
| --- | --- |
| classify request | `task-router.md` |
| choose exact refs | `query-to-doc-routing.md` |
| evidence/confidence | `knowledge-priority.md` |
| incomplete prompt | `input-completeness-rules.md`, `response-fallback-rules.md` |
| output shape | `output-format.md` |

## High-Centrality Files

- `debugging-and-review.md`: review/debug workflow hub.
- `scan-cycle-and-output-ownership.md`: overwrite, writer, scan-order reasoning.
- `code-review-checklists.md`: review findings.
- `debugging-checklists.md`: fault isolation.
- `alarm-and-interlock-patterns.md`: alarm/reset/interlock behavior.
- `program-templates.md`: common template bridge.

## Deep References

- `hmi-interface-patterns.md`: load only for HMI/SCADA command/status, recipes, heartbeat.
- `hardware-abstraction-mapping.md`: load only for I/O mapping architecture.
- `ide-integration-formats.md`: load only for import/export format requests.
- `version-control-and-code-review.md`: load only for PLC project diff/version-control workflow.

## Rules

- Keep this layer vendor-neutral.
- Prefer behavior and ownership rules over syntax details.
- Use templates for generation; do not hand-roll large logic when a template matches.
- Safety-sensitive output must downgrade confidence and identify field-confirmation needs.

## Forbidden

- No Siemens/Rockwell/Mitsubishi syntax as default.
- No memory/register model claims without vendor route.
- No final SIL/PL approval.
- No duplicated vendor gotchas.
