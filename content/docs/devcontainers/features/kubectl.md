---
title: "kubectl"
description: "Installs kubectl, the Kubernetes command-line tool."
weight: 140
date: 2026-06-06
type: docs
topics: ["devcontainers", "tools"]
---

**Current version:** `0.1.0` | [kubectl documentation](https://kubernetes.io/docs/reference/kubectl/)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/kubectl:0": {}
}
```

With options:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/kubectl:0": {
  "version": "1.32.0"
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | kubectl version to install |

## Shell integration

Shell completion is configured automatically for both bash and zsh.

## Notes

kubectl requires a valid `KUBECONFIG` or `~/.kube/config` to connect to a cluster. The feature only installs the binary and configures shell completion. Kubeconfig management is left to your project's dev container setup.
