---
title: "rocky-toolbox"
description: "Rocky Linux dev environment with a curated set of modern CLI tools pre-installed."
weight: 70
date: 2026-05-20
type: docs
topics: ["devcontainers"]
---

`rocky-toolbox` is the Rocky Linux equivalent of [`ubuntu-toolbox`](../ubuntu-toolbox/), built on [`rocky-devbox`](../rocky-devbox/).

**Current version:** `0.1.6`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/rocky-toolbox:latest"
}
```

## What's included

Everything in [`rocky-devbox`](../rocky-devbox/), plus:

| Tool | Version | Description |
|------|---------|-------------|
| `oh-my-posh` | 26.23.6 | Shell prompt theme engine |
| `eza` | 0.23.4 | Modern `ls` replacement |
| `bat` | 0.26.1 | `cat` with syntax highlighting |
| `fzf` | 0.67.0 | Fuzzy finder |
| `delta` | 0.18.2 | Git diff pager |
| `lazygit` | 0.57.0 | Terminal UI for git |

Configuration and shell aliases are identical to the Ubuntu toolbox variant.

## When to use this

Use `rocky-toolbox` when your environment requires Rocky Linux and you want a pre-configured set of modern CLI tools. If your terminal has a Nerd Font installed, use [`rocky-toolbox-nf`](../rocky-toolbox-nf/) to also enable icons.
