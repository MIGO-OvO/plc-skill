# PLC Skill - Installation and Usage Guide

## For Users: How to Install

### Option 1: NPM Global Install

The easiest way to install this skill for OpenClaw or similar AI agents is via NPM:

```bash
# 1. Install the package globally
npm install -g plc-skill

# 2. Copy the skill into ~/.agents/skills/plc-skill
install-plc-skill
```

`npm install -g` installs the package and the `install-plc-skill` helper. The actual copy into `~/.agents/skills/plc-skill` happens when you run `install-plc-skill`.

On Windows PowerShell, use the same commands.

### Option 2: Manual Git Clone

```bash
mkdir -p ~/.agents/skills/
cd ~/.agents/skills/
git clone https://github.com/MIGO-OvO/plc-skill.git
```

If your tool supports direct local-document references, you can also point it at a normal local clone instead of moving it into `~/.agents/skills/`.

## Verify Installation

After installation, the skill files should be available as a local knowledge base. You can verify by asking your AI assistant a PLC-programming question and checking that it loads `SKILL.md` plus the relevant `references/` and `templates/` material.

## Using with Different AI Coding Tools

### OpenClaw / Oh My OpenCode

These environments can use the skill repository directly.

Setup:

1. Place the repository at `~/.agents/skills/plc-skill/`, or run `install-plc-skill`.
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

### Claude Code and Other Tools

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
4. Validate the relevant eval cases in `evals/`.
5. Submit a pull request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

See [LICENSE](./LICENSE) for license details.

## Support

- GitHub Issues: https://github.com/MIGO-OvO/plc-skill/issues
- Repository: https://github.com/MIGO-OvO/plc-skill
