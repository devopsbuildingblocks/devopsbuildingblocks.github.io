---
title: "delta"
description: "Installs delta, a syntax-highlighting pager for git diffs, with optional automatic git configuration."
weight: 40
type: docs
---

**Current version:** `0.2.0` | [delta on GitHub](https://github.com/dandavison/delta)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/delta:0": {}
}
```

With options:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/delta:0": {
  "version": "0.18.2",
  "theme": "Dracula",
  "features": "side-by-side"
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | delta version to install |
| `configureGit` | boolean | `true` | Set delta as git's default pager |
| `theme` | string | `TwoDark` | Syntax highlighting theme |
| `features` | string | `default` | Delta display features |

**Available themes:** `auto`, `Dracula`, `GitHub`, `gruvbox-dark`, `gruvbox-light`, `Monokai Extended`, `Nord`, `OneHalfDark`, `Solarized (dark)`, `Solarized (light)`, `TwoDark`

**Available features:** `default`, `side-by-side`, `line-numbers`, `decorations`

## Git configuration

When `configureGit=true`, the following is added to git config:

```ini
[core]
  pager = delta
[interactive]
  diffFilter = delta --color-only
[delta]
  navigate = true
[merge]
  conflictstyle = diff3
[diff]
  colorMoved = default
```

This is applied via `postCreateCommand` to ensure it takes effect even when custom dotfiles override the container's git config.

**Aliases:** `diff` → delta

**Commands:** `delta-themes`, `delta-theme <name>`
