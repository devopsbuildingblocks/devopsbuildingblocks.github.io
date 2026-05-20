---
title: "rocky-base"
description: "Foundation Rocky Linux 9 image with common build dependencies."
weight: 50
type: docs
---

`rocky-base` mirrors [`ubuntu-base`](../ubuntu-base/) on a Rocky Linux 9 foundation, for environments where an RPM-based OS is required.

**Current version:** `0.1.5`

## Usage

```json
{
  "name": "My Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/rocky-base:latest"
}
```

## What's included

- Base: `rockylinux:9`
- Non-root user `vscode` (UID/GID 1000)
- zsh as default shell
- Persistent volume mounts for `~/.cache`, `~/.local`, and shell history
- Common build utilities: `curl`, `git`, `xz`, `util-linux-user`, `glibc-langpack-en`
- `LANG=en_US.UTF-8` locale set

## When to use this

Use `rocky-base` when your production environment runs RHEL/Rocky Linux and you want a matching dev container base. For most projects with no OS constraint, the Ubuntu variants are recommended.
