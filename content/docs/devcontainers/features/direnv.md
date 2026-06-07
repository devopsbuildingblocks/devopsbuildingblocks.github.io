---
title: "direnv"
description: "Installs direnv, an environment switcher for the shell, with /workspaces automatically whitelisted."
weight: 70
date: 2026-06-05
type: docs
topics: ["devcontainers", "tools"]
---

**Current version:** `0.1.0` | [direnv.net](https://direnv.net)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/direnv:0": {}
}
```

With options:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/direnv:0": {
  "version": "2.35.0"
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

