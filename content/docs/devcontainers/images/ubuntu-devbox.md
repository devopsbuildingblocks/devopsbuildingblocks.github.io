---
title: "ubuntu-devbox"
description: "Ubuntu base image with Nix and Devbox pre-installed. Foundation for the toolbox images."
weight: 20
type: docs
---

`ubuntu-devbox` adds Nix and Devbox to [`ubuntu-base`](../ubuntu-base/), giving you a reproducible package management layer before any tool-specific features are applied.

**Current version:** `0.1.13`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/ubuntu-devbox:latest"
}
```

## What's included

Everything in [`ubuntu-base`](../ubuntu-base/), plus:

- Nix package manager
- Devbox v0.16.0
- VS Code terminal configured to open a `devbox shell` automatically
- `jetpack-io.devbox` VS Code extension

## When to use this

Use `ubuntu-devbox` when you want to manage your own toolset via a `devbox.json` in your project. On container start, `devbox install` runs automatically if a `devbox.json` is present. This is the recommended base for projects that need precise, per-project package pinning.

If you want a batteries-included environment with common CLI tools already configured, use [`ubuntu-toolbox`](../ubuntu-toolbox/) instead.
