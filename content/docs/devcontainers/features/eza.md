---
title: "eza"
description: "Installs eza, a modern ls replacement with Git status, color themes, and optional Nerd Font icons."
weight: 50
type: docs
---

**Current version:** `0.2.0` | [eza on GitHub](https://github.com/eza-community/eza)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/eza:0": {}
}
```

With Nerd Font icons:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/eza:0": {
  "enableIcons": true
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | eza version to install |
| `theme` | string | `db2-dark` | Color theme |
| `aliasAsLs` | boolean | `true` | Replace `ls`, `ll`, `la`, `lt`, `l` with eza |
| `enableIcons` | boolean | `false` | Add `--icons` flag (requires Nerd Font) |

**Available themes:** `db2-dark`, `db2-light`, `none`

## Shell integration

When `aliasAsLs=true`, the following aliases are created:

| Alias | Command |
|-------|---------|
| `ls` | `eza --color=always --group-directories-first` |
| `ll` | `eza -la --color=always --group-directories-first --git` |
| `la` | `eza -a --color=always --group-directories-first` |
| `lt` | `eza --tree --color=always --group-directories-first` |
| `l` | `eza -l --color=always --group-directories-first --git` |

**Commands:** `eza-themes`, `eza-theme <name>`
