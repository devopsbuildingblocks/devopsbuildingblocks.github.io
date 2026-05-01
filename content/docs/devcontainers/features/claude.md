---
title: "claude"
description: "Installs Claude Code CLI and the anthropic.claude-code VS Code extension, with config persistence across rebuilds."
weight: 120
type: docs
---

**Current version:** `0.2.0` | [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/claude:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | Claude Code version to install |

## What's included

- `claude-code` CLI installed via `devbox global`
- `anthropic.claude-code` VS Code extension
- `~/.claude` and `~/.claude.json` symlinked to a persistent Docker volume

## Config persistence

Claude Code stores its configuration, authentication, and conversation history in `~/.claude`. This feature mounts a named Docker volume at `/mnt/devcontainer-features/claude` and symlinks `~/.claude` there via a `postCreateCommand` script. Your Claude auth and settings survive container rebuilds without needing to re-authenticate each time.
