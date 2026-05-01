---
title: "ubuntu-base"
description: "Foundation Ubuntu image with common build dependencies. The base for all ubuntu-* images."
weight: 10
type: docs
---

`ubuntu-base` is built on `buildpack-deps:noble-curl` (Ubuntu 24.04 LTS) and provides a clean foundation with the `vscode` non-root user and common development utilities installed via the `common-utils` feature.

**Current version:** `0.1.11`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/ubuntu-base:latest"
}
```

Pin to a specific version:

```json
{
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/ubuntu-base:0.1.11"
}
```

## What's included

- Base: `buildpack-deps:noble-curl` (Ubuntu 24.04)
- Non-root user `vscode` (UID/GID 1000)
- zsh as default shell
- Persistent volume mounts for `~/.cache`, `~/.local`, and shell history
- `~/.shellrc.d/` framework for modular shell integration
- Common build utilities: `curl`, `git`, `xz`, `gzip`

## When to use this

Use `ubuntu-base` when you need a minimal Ubuntu starting point and plan to layer your own tooling via features or a custom Dockerfile. If you want Devbox for package management, start with [`ubuntu-devbox`](../ubuntu-devbox/) instead.
