---
title: "ubuntu-toolbox"
description: "Ubuntu dev environment with a curated set of modern CLI tools pre-installed and configured."
weight: 30
type: docs
---

`ubuntu-toolbox` builds on [`ubuntu-devbox`](../ubuntu-devbox/) and layers in a curated set of modern CLI tools, all pre-configured with sensible defaults.

**Current version:** `0.1.5`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/ubuntu-toolbox:latest"
}
```

## What's included

Everything in [`ubuntu-devbox`](../ubuntu-devbox/), plus:

| Tool | Version | Description |
|------|---------|-------------|
| `oh-my-posh` | 26.23.6 | Shell prompt theme engine |
| `eza` | 0.23.4 | Modern `ls` replacement |
| `bat` | 0.26.1 | `cat` with syntax highlighting |
| `fzf` | 0.67.0 | Fuzzy finder (CTRL-T, CTRL-R, ALT-C) |
| `delta` | 0.18.2 | Syntax-highlighting git diff pager |
| `lazygit` | 0.57.0 | Terminal UI for git |

All tools are installed via `devbox global` and configured with shell aliases and integrations. `delta` is set as the default git pager. `bat` is aliased to `cat`. `eza` aliases replace `ls`, `ll`, `la`, `lt`, `l`.

## When to use this

This is the recommended starting point for most projects. Everything works out of the box without Nerd Fonts. If your terminal has a Nerd Font installed, use [`ubuntu-toolbox-nf`](../ubuntu-toolbox-nf/) to also enable icons.
