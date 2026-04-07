# PLC Skill - Installation and Usage Guide

## For Users: How to Install

### Option 1: NPM Global Install (Recommended)

The easiest way to install this skill for Oh My OpenCode or other AI Agents is via NPM:

```bash
# 1. Install the package globally
npm install -g plc-skill

# 2. Run the installer to copy files to ~/.agents/skills/plc-skill
install-plc-skill
```

### Option 2: Manual Git Clone

```bash
# Clone to OpenCode skills directory
mkdir -p ~/.agents/skills/
cd ~/.agents/skills/
git clone https://github.com/MIGO-OvO/plc-skill.git
```

## Verify Installation

After installation, the skill files are ready to be used as a knowledge base. You can verify by asking your AI assistant:

```
"Can you help me with PLC programming using the plc-skill repository?"
```

The AI should be able to read the SKILL.md file and load the appropriate references.

## Using with Different AI Coding Tools

### Oh My OpenCode (Recommended)

Oh My OpenCode natively supports skill repositories. 

**Setup:**
1. Clone this repository to `~/.agents/skills/plc-skill/`
2. Add the skill to your agent configuration.

**Usage:**
```
# In chat
"Write a Siemens S7-1500 motor control function block in SCL"
```

### Cursor

Cursor can use this skill through the `.cursorrules` file.

**Setup:**
1. Create or edit `.cursorrules` in your project root:

```
# .cursorrules
You are a PLC programming expert. Use the plc-skill knowledge base located at:
/path/to/plc-skill/

When answering PLC-related questions:
1. Check references/vendors/ for vendor-specific rules
2. Use references/common/ for cross-vendor patterns
3. Follow templates/common/ for code generation
4. Consult references/vendors/<vendor>/<vendor>-pitfalls-and-pro-tips.md for real-world gotchas

Supported vendors: Siemens, Rockwell, Omron, Schneider, Beckhoff, Codesys, Delta, Keyence, Panasonic, Mitsubishi
```

2. Cursor will now reference the skill when answering PLC questions.

### Other AI Coding Tools

Most AI coding tools can reference local documentation. Point them to the skill directory:

**Setup:**
1. Configure your tool to read from the plc-skill directory
2. Reference the SKILL.md file as the entry point
3. Point to references/ and templates/ directories for detailed knowledge

## For Maintainers: Publishing and Distribution

### Preparing a Release

1. Update version information in relevant files
2. Prepare a changelog describing what changed
3. Tag the release in git:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Distribution Methods

**GitHub Releases:**
1. Create a release on GitHub
2. Attach a ZIP archive of the skill
3. Include release notes

**Direct Git Clone:**
Users can clone directly from your repository:
```bash
git clone https://github.com/YOUR_USERNAME/plc-skill.git
```

## Troubleshooting

### Skill Not Recognized

1. Verify the skill folder exists in the expected location
2. Check that the SKILL.md file is accessible to the AI
3. Make sure you are using the correct trigger words (e.g., "PLC programming", "Structured Text", specific vendor names)

### Permission Issues

If your AI tool cannot read the files, check file permissions:
```bash
# Fix ownership if needed
sudo chown -R $USER /path/to/plc-skill/
```

## Contributing

To contribute to this skill:

1. Fork the repository
2. Make your changes
3. Test thoroughly with your AI tool
4. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

See [LICENSE](./LICENSE) file for details.

## Support

- GitHub Issues: [Your repo URL]
- Documentation: See README.md and SKILL.md
