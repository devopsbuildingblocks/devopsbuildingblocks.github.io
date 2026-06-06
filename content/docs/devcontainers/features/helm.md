---
title: "helm"
description: "Installs Helm, the Kubernetes package manager."
weight: 120
date: 2026-06-06
type: docs
topics: ["devcontainers", "tools"]
---

**Current version:** `0.1.0` | [Helm](https://helm.sh)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/helm:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | Helm version to install |

## Shell integration

Shell completion is configured automatically for both bash and zsh.
