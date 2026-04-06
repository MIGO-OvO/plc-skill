# PLC Skill - Installation and Publishing Guide

## For Users: How to Install

### Option 1: Install via ClawHub (Recommended)

```bash
# Install the ClawHub CLI first (if not already installed)
npm install -g clawhub

# Install plc-skill
clawhub install plc-skill
```

The skill will be installed to your OpenClaw workspace at `~/.openclaw/workspace/skills/plc-skill/`.

### Option 2: Manual Installation (Git Clone)

```bash
# Clone the repository
cd ~/.openclaw/workspace/skills/
git clone https://github.com/YOUR_USERNAME/plc-skill.git

# Or download and extract the ZIP
```

### Option 3: Install from Local Path

```bash
# If you have the skill folder locally
clawhub install /path/to/plc-skill
```

## Verify Installation

After installation, the skill should be automatically available in OpenClaw. You can verify by asking:

```
"Can you help me with PLC programming?"
```

The AI should recognize the skill and load the appropriate references.

## Using with Different AI Coding Tools

### Claude Code (Anthropic)

Claude Code natively supports OpenClaw skills. Once installed via ClawHub, the skill is automatically available.

**Usage:**
```
# In Claude Code chat
"Write a Siemens S7-1500 motor control function block in SCL"
```

### Cursor

Cursor can use OpenClaw skills through the `.cursorrules` file.

**Setup:**
1. Create or edit `.cursorrules` in your project root:

```
# .cursorrules
You are a PLC programming expert. Use the plc-skill knowledge base located at:
~/.openclaw/workspace/skills/plc-skill/

When answering PLC-related questions:
1. Check references/vendors/ for vendor-specific rules
2. Use references/common/ for cross-vendor patterns
3. Follow templates/common/ for code generation
4. Consult references/common/vendor-pitfalls-and-pro-tips.md for real-world gotchas

Supported vendors: Siemens, Rockwell, Omron, Schneider, Beckhoff, Codesys, Delta, Keyence, Panasonic, Mitsubishi
```

2. Cursor will now reference the skill when answering PLC questions.

### Opencode (Open-source)

Opencode supports custom knowledge bases through configuration.

**Setup:**
1. Edit your Opencode config (usually `~/.opencode/config.json`):

```json
{
  "knowledgeBases": [
    {
      "name": "PLC Skill",
      "path": "~/.openclaw/workspace/skills/plc-skill",
      "enabled": true,
      "priority": "high"
    }
  ]
}
```

2. Restart Opencode.

### Windsurf (Codeium)

Windsurf can reference local documentation through its context system.

**Setup:**
1. Add the skill path to your workspace settings:

```json
{
  "codeium.contextPaths": [
    "~/.openclaw/workspace/skills/plc-skill/references",
    "~/.openclaw/workspace/skills/plc-skill/templates"
  ]
}
```

### Aider (Command-line AI coding)

Aider can read files from the skill directory.

**Usage:**
```bash
# Add skill references to Aider's context
aider --read ~/.openclaw/workspace/skills/plc-skill/references/vendors/siemens/siemens-rules.md

# Or add the entire skill directory
aider --read-tree ~/.openclaw/workspace/skills/plc-skill/references/
```

### Continue.dev (VS Code Extension)

Continue.dev supports custom context providers.

**Setup:**
1. Edit `~/.continue/config.json`:

```json
{
  "contextProviders": [
    {
      "name": "plc-skill",
      "params": {
        "path": "~/.openclaw/workspace/skills/plc-skill"
      }
    }
  ]
}
```

## For Maintainers: How to Publish

### Prerequisites

1. Install ClawHub CLI:
```bash
npm install -g clawhub
```

2. Log in to ClawHub:
```bash
clawhub login
```

### Publishing a New Version

1. Update the version in your skill metadata (if applicable)

2. Prepare a changelog describing what changed

3. Publish:
```bash
cd /path/to/plc-skill

clawhub publish . \
  --slug plc-skill \
  --name "PLC Programming Skill" \
  --version 1.0.0 \
  --changelog "Initial release with full vendor coverage (Siemens, Rockwell, Omron, Schneider, Beckhoff, Codesys, Delta, Keyence, Panasonic, Mitsubishi). Includes IDE integration, HMI patterns, hardware abstraction, pitfalls guide, and version control best practices."
```

### Publishing Updates

```bash
# Increment version and publish
clawhub publish . \
  --slug plc-skill \
  --name "PLC Programming Skill" \
  --version 1.1.0 \
  --changelog "Added motion control patterns and safety programming guidelines"
```

### Tagging Releases

You can tag releases for different use cases:

```bash
# Tag as stable
clawhub publish . --slug plc-skill --version 1.0.0 --tags stable,latest

# Tag as beta
clawhub publish . --slug plc-skill --version 1.1.0-beta --tags beta
```

## Updating the Skill

Users can update to the latest version:

```bash
# Update to latest
clawhub update plc-skill

# Update to specific version
clawhub update plc-skill --version 1.2.0

# Force update (overwrite local changes)
clawhub update plc-skill --force
```

## Uninstalling

```bash
clawhub uninstall plc-skill
```

## Troubleshooting

### Skill Not Recognized

1. Check installation:
```bash
clawhub list
```

2. Verify the skill folder exists:
```bash
ls ~/.openclaw/workspace/skills/plc-skill/
```

3. Check the SKILL.md frontmatter is valid

### Conflicts with Other Skills

If multiple skills handle PLC topics, OpenClaw will prefer the most specific match. You can check skill priority in the OpenClaw logs.

### Permission Issues

If you get permission errors during installation:
```bash
# Fix ownership
sudo chown -R $USER ~/.openclaw/workspace/skills/
```

## Contributing

To contribute to this skill:

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

Or publish your own fork:
```bash
clawhub publish . \
  --slug my-plc-skill-fork \
  --name "My PLC Skill Fork" \
  --version 1.0.0 \
  --fork-of plc-skill \
  --changelog "Added support for XYZ vendor"
```

## License

[Specify your license here, e.g., MIT, Apache 2.0, etc.]

## Support

- GitHub Issues: [Your repo URL]
- ClawHub: https://clawhub.com/skills/plc-skill
- Discord: [Your Discord invite]
