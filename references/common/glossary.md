# Glossary

Use this file to keep core review and debugging terms consistent.

## Terms

- **Output ownership**: one output should have one clear controlling write location or one clearly defined arbitration structure.
- **Hidden state dependency**: behavior depends on an unstated or poorly visible state, previous write, or scan-order effect.
- **Latch / reset conflict**: set, hold, and reset conditions can re-assert or cancel each other unexpectedly.
- **Scan-cycle reasoning**: analysis based on repeated PLC scan execution, write order, retained values, and condition timing.
- **Structured Project**: GX Works2 project organization that separates logic into clearer units instead of a flat monolithic block.
- **Module boundary**: the responsibility line between sequence logic, alarm logic, interlock logic, I/O mapping, and state handling.
- **Interlock completeness**: whether all required inhibit and protection conditions are covered, visible, and reset correctly.
- **State visibility**: whether the active step, transition conditions, and fault branch are easy to monitor online.
- **Template-first response**: provide a reusable structure or skeleton before producing a large one-off implementation.
- **Document-based judgment**: a conclusion supported by available references but still involving engineering interpretation.

