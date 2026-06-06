---
title: "Images"
description: "Pre-built dev container images published to ghcr.io. Ubuntu and Rocky Linux variants."
weight: 10
hide_child_list: true
---

All images are published to `ghcr.io/devopsbuildingblocks/devcontainer-images/` and built for `linux/amd64` and `linux/arm64`.

## Image hierarchy

Each base OS has four images that layer on each other:

```
ubuntu-base  (buildpack-deps:noble-curl)
└── ubuntu-devbox  (+ Nix + Devbox)
    ├── ubuntu-toolbox     (+ CLI tools)
    └── ubuntu-toolbox-nf  (+ CLI tools + Nerd Font icons)

rocky-base  (rockylinux:9)
└── rocky-devbox  (+ Nix + Devbox)
    ├── rocky-toolbox     (+ CLI tools)
    └── rocky-toolbox-nf  (+ CLI tools + Nerd Font icons)
```

## Image list

| Image | Description |
|-------|-------------|
| [`ubuntu-base`](./ubuntu-base/) | Foundation image, build dependencies |
| [`ubuntu-devbox`](./ubuntu-devbox/) | Adds Nix and Devbox |
| [`ubuntu-toolbox`](./ubuntu-toolbox/) | Adds modern CLI tools |
| [`ubuntu-toolbox-nf`](./ubuntu-toolbox-nf/) | CLI tools + Nerd Font icons |
| [`rocky-base`](./rocky-base/) | Rocky Linux 9 foundation |
| [`rocky-devbox`](./rocky-devbox/) | Adds Nix and Devbox |
| [`rocky-toolbox`](./rocky-toolbox/) | Adds modern CLI tools |
| [`rocky-toolbox-nf`](./rocky-toolbox-nf/) | CLI tools + Nerd Font icons |

## Choosing an image

Start with **`ubuntu-toolbox`** if you want everything pre-configured and your terminal supports Unicode. Use **`ubuntu-toolbox-nf`** if you have a Nerd Font installed in your terminal and want icons in `eza`, `lazygit`, and `oh-my-posh`. Use **`ubuntu-devbox`** if you want to compose your own toolset with features. Use **`ubuntu-base`** only if you need a minimal starting point.

Rocky Linux variants mirror the Ubuntu images for environments where an RPM-based OS is required.
