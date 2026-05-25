---
title: "bat"
description: "Installs bat, a cat clone with syntax highlighting, Git integration, and a built-in pager."
weight: 30
type: docs
---

**Current version:** `0.2.0` | [bat on GitHub](https://github.com/sharkdp/bat)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/bat:0": {}
}
```

With options:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/bat:0": {
  "version": "0.26.1",
  "theme": "Dracula",
  "aliasAsCat": false
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | bat version to install |
| `aliasAsCat` | boolean | `true` | Alias `cat` to bat (plain style, no paging) |
| `theme` | string | `TwoDark` | Syntax highlighting theme |

**Available themes:** `Monokai Extended`, `Dracula`, `Nord`, `OneHalfDark`, `OneHalfLight`, `GitHub`, `gruvbox-dark`, `gruvbox-light`, `Solarized (dark)`, `Solarized (light)`, `TwoDark`, `Visual Studio Dark+`, `ansi`, `auto`

## Shell integration

Sets the `BAT_THEME` environment variable. Configures `man` to use bat as its pager for syntax-highlighted man pages.

**Aliases:**

| Alias | Equivalent |
|-------|-----------|
| `cat` | `bat --style=plain --paging=never` (if `aliasAsCat=true`) |
| `batn` | `bat --style=numbers` |
| `batf` | `bat` (full decorations) |

**Commands:**

- `bat-themes`:list all available themes with previews
- `bat-theme <name>`:switch to a different theme

## fzf integration

When both `bat` and `fzf` are installed, `CTRL-T` in fzf uses bat for syntax-highlighted file previews automatically.
