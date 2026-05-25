---
title: "oh-my-posh"
description: "Installs oh-my-posh, a shell prompt theme engine, with custom DB2 themes."
weight: 90
type: docs
---

**Current version:** `0.2.0` | [oh-my-posh docs](https://ohmyposh.dev/)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/oh-my-posh:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | oh-my-posh version to install |
| `theme` | string | `db2-dark.minimal` | Prompt theme to use |

## Bundled themes

Three custom themes are included:

| Theme | Description |
|-------|-------------|
| `db2-dark.minimal` | Dark background, minimal segments, no icons required |
| `db2-light.minimal` | Light background, minimal segments, no icons required |
| `db2` | Full theme with Nerd Font icons |

The `db2` theme requires a Nerd Font. The `.minimal` variants work in any terminal.

## Using built-in oh-my-posh themes

Any theme name from the [oh-my-posh theme gallery](https://ohmyposh.dev/docs/themes) will be fetched from GitHub at install time:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/oh-my-posh:0": {
  "theme": "tokyo"
}
```

**Commands:** `omp-themes` (list available themes), `omp-theme <name>` (switch theme)
