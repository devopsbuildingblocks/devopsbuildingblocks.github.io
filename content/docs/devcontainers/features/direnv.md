---
title: "direnv"
description: "Installs direnv, an environment switcher for the shell, with /workspaces automatically whitelisted."
weight: 60
date: 2026-06-05
type: docs
---

**Current version:** `0.1.0` | [direnv.net](https://direnv.net)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/direnv:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | direnv version to install |

## What's included

- `direnv` installed via `devbox global add`
- `~/.config/direnv/config.toml` created for both root and the remote user, whitelisting `/workspaces`
- zsh shell hook configured automatically via `~/.shellrc.d/`

## /workspaces whitelist

On container creation, the feature writes the following config for each user:

```toml
[whitelist]
prefix = ["/workspaces"]
```

This means any `.envrc` file inside `/workspaces` is trusted automatically — no manual `direnv allow` required after a rebuild.

## Notes

This feature requires the `devbox` feature (or an image that includes it) to be installed first:

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/devbox:0": {},
  "ghcr.io/devopsbuildingblocks/devcontainer-features/direnv:0": {}
}
```
