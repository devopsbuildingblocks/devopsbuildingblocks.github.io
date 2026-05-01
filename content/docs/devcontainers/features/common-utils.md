---
title: "common-utils"
description: "Creates the non-root vscode user, sets up the shellrc.d framework, and mounts volumes for shell history and cache persistence."
weight: 10
type: docs
---

`common-utils` is the foundation feature that all other features in this collection depend on. It's automatically included in all published images — you only need to add it explicitly if you're building on a third-party base image.

**Current version:** `0.1.1`

## What it does

**User setup:** Creates a non-root `vscode` user (UID 1000, GID 1000) with zsh as the default shell. VS Code is configured to use zsh in the integrated terminal.

**Shell framework:** Creates `~/.shellrc.d/` — a directory where other features drop `.sh` scripts that are sourced automatically by both bash and zsh. This is how tool aliases, environment variables, and integrations are wired in without modifying `~/.bashrc` or `~/.zshrc` directly.

**Persistence via volumes:** Three Docker volumes are mounted to survive container rebuilds:

| Mount | Path | Purpose |
|-------|------|---------|
| `cache-<id>` | `~/.cache` | Tool caches (avoids re-downloading on rebuild) |
| `local-<id>` | `~/.local` | User-local installs and data |
| `shell-history-<id>` | `~/.shell_history` | Shared bash/zsh history |

## Usage

Included automatically in all images. To use it on a custom base:

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/common-utils:0": {}
}
```

This feature depends on and wraps `ghcr.io/devcontainers/features/common-utils:2` with opinionated defaults (zsh, no oh-my-zsh, `vscode` user).
