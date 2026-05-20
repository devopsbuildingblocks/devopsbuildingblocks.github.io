---
title: "lazygit"
description: "Installs lazygit, a terminal UI for git, with configurable themes and optional delta diff pager integration."
weight: 100
type: docs
---

**Current version:** `0.2.1` | [lazygit on GitHub](https://github.com/jesseduffield/lazygit)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/lazygit:0": {}
}
```

With delta integration:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/lazygit:0": {
  "enableGitDiffPager": true,
  "enableFileIcons": true
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | lazygit version to install |
| `theme` | string | `db2-dark` | UI color theme |
| `enableGitDiffPager` | boolean | `false` | Use delta for diffs inside lazygit |
| `enableFileIcons` | boolean | `false` | Show file icons (requires Nerd Font) |

**Available themes:** `db2-dark`, `db2`, `db2-light`, `default`, `tokyo-night-vibrant`, `tokyo-night`, `catppuccin-mocha`, `nord`, `dracula`, `gruvbox-dark`, `solarized-dark`, `github-dark`, `one-dark`

## Shell integration

- Alias: `lzg` → `lazygit`
- Commands: `lzg-themes` (list themes), `lzg-theme <name>` (switch and regenerate config)

## delta integration

When `enableGitDiffPager=true` and the `delta` feature is also installed, lazygit uses delta for side-by-side diff rendering. This gives you the same diff experience inside lazygit as on the command line.
