---
title: "fd"
description: "Installs fd, a fast and user-friendly alternative to find."
weight: 90
date: 2026-05-20
type: docs
topics: ["devcontainers", "tools"]
---

**Current version:** `0.1.0` | [fd on GitHub](https://github.com/sharkdp/fd)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/fd:0": {}
}
```

With options:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/fd:0": {
  "enableAliases": false
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | fd version to install |
| `enableAliases` | boolean | `true` | Add useful fd aliases |

## Shell integration

When `enableAliases=true`:

| Alias | Description |
|-------|-------------|
| `fdi` | Case-insensitive search |
| `fdh` | Include hidden files |
| `fda` | Include hidden files and ignored files |
| `fde` | Search by file extension |
