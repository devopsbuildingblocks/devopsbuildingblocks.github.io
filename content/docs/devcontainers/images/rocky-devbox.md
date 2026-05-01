---
title: "rocky-devbox"
description: "Rocky Linux 9 with Nix and Devbox pre-installed."
weight: 60
type: docs
---

`rocky-devbox` adds Nix and Devbox to [`rocky-base`](../rocky-base/). Equivalent to [`ubuntu-devbox`](../ubuntu-devbox/) on Rocky Linux.

**Current version:** `0.1.5`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/rocky-devbox:latest"
}
```

## What's included

Everything in [`rocky-base`](../rocky-base/), plus:

- Nix package manager (with `filter-syscalls = false` for Rocky Linux compatibility)
- Devbox v0.16.0
- VS Code terminal configured to open a `devbox shell` automatically
- `jetpack-io.devbox` VS Code extension
