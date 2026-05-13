# PLC Skill - Installation and Usage Guide

## For Users: How to Install

### Option 1: NPM Global Install

The easiest way to install this skill for Claude Code, OpenClaw, or similar AI agents is via NPM:

```bash
# 1. Install the package globally
npm install -g plc-skill

# 2. Copy the runtime skill payload into Claude Code
install-plc-skill --target claude-code
```

`npm install -g` installs the package and the `install-plc-skill` helper. The Claude Code target copies the runtime payload into `~/.claude/skills/plc-skill`.

Other targets:

```bash
install-plc-skill --target agents       # ~/.agents/skills/plc-skill
install-plc-skill --target both         # both Claude Code and ~/.agents
install-plc-skill --target both --dry-run
```

On Windows PowerShell, use the same commands.

### Option 2: Manual Git Clone

```bash
mkdir -p ~/.agents/skills/
cd ~/.agents/skills/
git clone https://github.com/MIGO-OvO/plc-skill.git
```

For Claude Code, prefer installing from a normal local clone instead of placing the full repository under the skill directory:

```bash
git clone https://github.com/MIGO-OvO/plc-skill.git
cd plc-skill
node bin/install.js --target claude-code
```

This keeps maintainer docs, package metadata, and eval files out of the runtime skill context.

## Verify Installation

After installation, the skill files should be available as a local knowledge base. You can verify by asking your AI assistant a PLC-programming question and checking that it loads `SKILL.md` plus the relevant `references/` and `templates/` material.

## Using with Different AI Coding Tools

### OpenClaw / Oh My OpenCode

These environments can use the skill repository directly.

Setup:

1. Run `install-plc-skill --target agents`.
2. Add the skill to your agent configuration.

### Cursor

Cursor can reference this repository through local rules or project documentation.

Recommended rule text:

```text
You are a PLC programming expert. Use the plc-skill knowledge base located at:
/path/to/plc-skill/

When answering PLC-related questions:
1. Check references/vendors/ for vendor-specific rules.
2. Use references/common/ for cross-vendor engineering patterns.
3. Follow templates/common/ for code generation.
4. Use vendor official-doc indexes when vendor-specific certainty matters.
```

### Claude Code

Claude Code reads skills from `~/.claude/skills/`.

Setup:

1. Run `install-plc-skill --target claude-code`.
2. Confirm `~/.claude/skills/plc-skill/SKILL.md` exists.
3. Ask a PLC-programming question that should trigger the skill.

### Other Tools

Most AI coding tools can reference local documentation.

Setup:

1. Configure the tool to read from the local `plc-skill` directory.
2. Use `SKILL.md` as the entry point.
3. Point the tool at `references/` and `templates/` for detailed guidance.

## For Maintainers: Publishing and Distribution

### Preparing a Release

1. Update version information where needed.
2. Run `npm test`.
3. Prepare a changelog describing what changed.
4. Tag the release in git:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Distribution Methods

GitHub Releases:

1. Create a release on GitHub.
2. Attach a ZIP archive of the skill if desired.
3. Include release notes.

Direct Git Clone:

```bash
git clone https://github.com/MIGO-OvO/plc-skill.git
```

## Troubleshooting

### Skill Not Recognized

1. Verify the skill folder exists in the expected location.
2. Check that `SKILL.md` is readable by the tool.
3. Make sure the request actually falls into PLC/programming scope.

### Permission Issues

If your tool cannot read the files, check that the local user running the tool can access the repository path.

## Contributing

To contribute:

1. Fork the repository.
2. Make your changes.
3. Run `npm test`.
4. Validate the relevant eval cases in `evals/`, including `evals/evals.json` and `evals/trigger-queries.json`.
5. Submit a pull request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

See [LICENSE](./LICENSE) for license details.

## Support

- GitHub Issues: https://github.com/MIGO-OvO/plc-skill/issues
- Repository: https://github.com/MIGO-OvO/plc-skill
