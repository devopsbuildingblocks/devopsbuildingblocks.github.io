---
title: "ubuntu-toolbox-nf"
description: "ubuntu-toolbox with Nerd Font icons enabled across all tools."
weight: 40
type: docs
---

`ubuntu-toolbox-nf` is identical to [`ubuntu-toolbox`](../ubuntu-toolbox/) but with Nerd Font icon support enabled in `eza`, `lazygit`, and `oh-my-posh`.

**Current version:** `0.1.5`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/ubuntu-toolbox-nf:latest"
}
```

## Differences from ubuntu-toolbox

| Setting | ubuntu-toolbox | ubuntu-toolbox-nf |
|---------|---------------|-------------------|
| `oh-my-posh` theme | `db2-dark.minimal` (no icons) | `db2` (with icons) |
| `eza` icons | disabled | enabled (`--icons`) |
| `lazygit` file icons | disabled | enabled |

## Requirements

Your terminal emulator must have a [Nerd Font](https://www.nerdfonts.com/) configured — otherwise icons render as boxes or question marks. This is a terminal setting, not a container setting. Popular options: JetBrainsMono Nerd Font, FiraCode Nerd Font, MesloLGS NF.

VS Code: set `"terminal.integrated.fontFamily": "JetBrainsMono Nerd Font"` (or your preferred Nerd Font) in your user settings.
