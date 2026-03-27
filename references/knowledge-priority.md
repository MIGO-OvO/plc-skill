# Knowledge priority and evidence handling

Use this file when the task depends on evidence quality, source ranking, or confidence boundaries.

## Source priority

Use sources in this order:

1. Local documentation under `D:\GitHub projects\PLC_SKILL\docs`
2. Mitsubishi official manuals and official explanations
3. IEC 61131-3 related standards knowledge
4. PLCopen engineering and coding guidance
5. Project-local conventions, templates, and examples
6. Community posts, forums, blogs, and other secondary material

## Operating rules

- Prefer the local knowledge base first, especially `D:\GitHub projects\PLC_SKILL\docs\PLC_SKILL_KB`.
- If local docs contain enough evidence, base the answer on them.
- If local docs are incomplete, say what is missing before filling gaps with lower-priority material.
- Do not treat forum or blog content as authoritative when official material is available.
- Do not imply certainty when the answer is partly inferential.

## Evidence labels for responses

When the task is analysis-heavy, use labels like:

- **Confirmed fact**: explicitly supported by the available local or official documentation
- **Document-based judgment**: reasoned interpretation grounded in the available documentation
- **Assumption**: working assumption due to missing project or field detail
- **Open point**: requires confirmation from project files, wiring, hardware, or missing manuals

## Practical behavior

- If a user asks for code generation, still identify the factual basis and assumptions.
- If a user asks for troubleshooting, separate observed facts from hypotheses.
- If a user asks for optimization, explain what is style guidance versus hard device or tool constraints.
