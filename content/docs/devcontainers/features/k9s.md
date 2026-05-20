---
title: "k9s"
description: "Installs k9s, a terminal UI for managing Kubernetes clusters."
weight: 110
type: docs
---

**Current version:** `0.2.0` | [k9s on GitHub](https://github.com/derailed/k9s)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/k9s:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | k9s version to install |
| `theme` | string | `db2-dark` | UI color theme |

**Available themes:** `db2-dark`, `db2`, `default`, `nord`, `dracula`, `one-dark`, `gruvbox-dark`, `solarized-dark`

## Notes

k9s requires a valid `KUBECONFIG` or `~/.kube/config` to connect to a cluster. The feature only installs the binary and configures the theme — kubeconfig management is left to your project's dev container setup.
