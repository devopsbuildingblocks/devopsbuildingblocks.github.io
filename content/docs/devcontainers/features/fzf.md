---
title: "fzf"
description: "Installs fzf, a general-purpose command-line fuzzy finder with key bindings, shell completion, and theme support."
weight: 60
type: docs
---

**Current version:** `0.2.0` | [fzf on GitHub](https://github.com/junegunn/fzf)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/fzf:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | fzf version to install |
| `enableKeyBindings` | boolean | `true` | Enable shell key bindings |
| `enableCompletion` | boolean | `true` | Enable fuzzy tab completion |
| `theme` | string | `db2-dark` | Color theme |
| `defaultOptions` | string | `--height 40% --layout=reverse --border` | Sets `FZF_DEFAULT_OPTS` |

**Available themes:** `none`, `db2-dark`, `db2-light`, `tokyo-night`, `one-dark`, `dracula`, `catppuccin`, `nord`, `gruvbox`

## Key bindings

| Binding | Action |
|---------|--------|
| `CTRL-T` | Find file in current directory, insert path at cursor |
| `CTRL-R` | Search shell history, run selected command |
| `ALT-C` | Find directory and `cd` into it |

## bat integration

When `bat` is also installed, `CTRL-T` automatically uses bat for syntax-highlighted file previews. No additional configuration needed.

**Commands:** `fzf-themes`, `fzf-theme <name>`
