# Knowledge priority and evidence handling

Use this file when the task depends on evidence quality, source ranking, or confidence boundaries.

## Source priority

Use sources in this order:

1. Bundled references in `references/`
2. Mitsubishi official manuals and official explanations
3. IEC 61131-3 related standards knowledge
4. PLCopen engineering and coding guidance
5. Bundled templates and examples in `templates/` and `examples/`
6. Community posts, forums, blogs, and other secondary material

## Operating rules

- Prefer bundled references first because they are the compressed working knowledge base for this skill.
- If bundled references are not enough, say what category is missing before filling gaps with lower-priority material.
- Do not treat forum or blog content as authoritative when official material is available.
- Do not imply certainty when the answer is partly inferential.
- If official documentation and bundled references disagree, Mitsubishi-specific official material outranks generic standards guidance.

## Evidence labels for responses

When the task is analysis-heavy, use labels like:

- **Confirmed fact**: explicitly supported by bundled or official documentation
- **Document-based judgment**: reasoned interpretation grounded in the available documentation
- **Assumption**: working assumption due to missing project or field detail
- **Open point**: requires confirmation from project files, wiring, hardware, or missing manuals

## Practical behavior

- If a user asks for code generation, still identify the factual basis and assumptions.
- If a user asks for troubleshooting, separate observed facts from hypotheses.
- If a user asks for optimization, explain what is style guidance versus hard device or tool constraints.
- If the task depends on exact platform behavior that is not present in bundled references, say that exact confirmation requires Mitsubishi manuals or project evidence.
