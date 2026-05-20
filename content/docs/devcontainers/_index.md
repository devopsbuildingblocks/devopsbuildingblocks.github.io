---
title: "Dev Containers"
description: "Reusable dev container images and features for consistent, modern development environments."
weight: 2
---

DevOps Building Blocks publishes a set of dev container images and features to GitHub Container Registry. They're designed to work together but each can be used independently.

- **[Images](./images/)** — pre-built container images published to `ghcr.io/devopsbuildingblocks/devcontainer-images/`. Pull one as your `image` and get a working environment immediately.
- **[Features](./features/)** — composable add-ons installed on top of any image. Each feature installs one tool via `devbox global`, drops shell integration into `~/.shellrc.d/`, and wires up VS Code settings where relevant.

## Registry

```
ghcr.io/devopsbuildingblocks/devcontainer-images/<image>:<tag>
ghcr.io/devopsbuildingblocks/devcontainer-features/<feature>:<major>
```

Tags follow semver. Use `latest` for the newest build or pin to a specific version for reproducibility.
