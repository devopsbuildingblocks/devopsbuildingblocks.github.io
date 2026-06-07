---
title: "rocky-toolbox-nf"
description: "rocky-toolbox with Nerd Font icons enabled."
weight: 80
date: 2026-05-20
type: docs
topics: ["devcontainers"]
---

`rocky-toolbox-nf` is identical to [`rocky-toolbox`](../rocky-toolbox/) with Nerd Font icon support enabled. Equivalent to [`ubuntu-toolbox-nf`](../ubuntu-toolbox-nf/) on Rocky Linux.

**Current version:** `0.1.6`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/rocky-toolbox-nf:latest"
}
```

Pin to a specific version:

```json
{
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/rocky-toolbox-nf:0.1.6"
}
```

## Differences from rocky-toolbox

| Setting | rocky-toolbox | rocky-toolbox-nf |
|---------|--------------|------------------|
| `oh-my-posh` theme | `db2-dark.minimal` (no icons) | `db2` (with icons) |
| `eza` icons | disabled | enabled (`--icons`) |
| `lazygit` file icons | disabled | enabled |

## Requirements

Your terminal emulator must have a [Nerd Font](https://www.nerdfonts.com/) configured, otherwise icons render as boxes or question marks. This is a terminal setting, not a container setting. Popular options: JetBrainsMono Nerd Font, FiraCode Nerd Font, MesloLGS NF.

VS Code: set `"terminal.integrated.fontFamily": "JetBrainsMono Nerd Font"` (or your preferred Nerd Font) in your user settings.
