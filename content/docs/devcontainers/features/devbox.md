---
title: "devbox"
description: "Installs Devbox, a Nix-based tool for creating reproducible, isolated development environments."
weight: 20
type: docs
---

`devbox` is the foundational package management feature. All tool features in this collection install their software via `devbox global add`, so this feature (or an image that includes it) must be present.

**Current version:** `0.2.3`

## Usage

```json
"features": {
  "ghcr.io/devcontainers/features/nix:1": {},
  "ghcr.io/devopsbuildingblocks/devcontainer-features/devbox:0": {
    "version": "0.16.0"
  }
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `0.16.0` | Devbox version to install |
| `bin_dir` | string | `/usr/local/bin` | Directory to place the devbox binary |

## VS Code integration

The VS Code terminal is configured to open directly into a `devbox shell`:

```json
"terminal.integrated.defaultProfile.linux": "devbox",
"terminal.integrated.profiles.linux": {
  "devbox": { "path": "/usr/bin/zsh", "args": ["-ic", "devbox shell -q"] }
}
```

The `jetpack-io.devbox` extension is also installed.

## Post-create behavior

On container creation, the post-create command runs:

- If a `devbox.json` exists in the workspace: runs `devbox install`
- Otherwise: runs `devbox init`

This means your project's devbox packages are ready immediately when the container starts.

## Notes

Devbox requires Nix. The `ghcr.io/devcontainers/features/nix:1` feature must be installed before this one. The rocky-linux images add `filter-syscalls = false` to `/etc/nix/nix.conf` for compatibility.
