---
title: "gemini"
description: "Installs Gemini CLI and the google.geminicodeassist VS Code extension, with config persistence across rebuilds."
weight: 130
type: docs
---

**Current version:** `0.2.0` | [Gemini CLI docs](https://geminicli.com/docs/)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/gemini:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | Gemini CLI version to install |

## What's included

- `gemini-cli` installed via `devbox global`
- `google.geminicodeassist` VS Code extension
- `~/.gemini` symlinked to a persistent Docker volume

## Config persistence

Gemini CLI stores configuration and auth in `~/.gemini`. This feature mounts a named Docker volume and symlinks `~/.gemini` there, so authentication persists across container rebuilds.
