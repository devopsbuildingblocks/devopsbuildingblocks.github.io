---
title: "ripgrep"
description: "Installs ripgrep (rg), a fast line-oriented search tool that respects .gitignore."
weight: 80
type: docs
---

**Current version:** `0.1.1` | [ripgrep on GitHub](https://github.com/BurntSushi/ripgrep)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/ripgrep:0": {}
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | ripgrep version to install |
| `theme` | string | `db2` | Color theme (`none` or `db2`) |
| `smartCase` | boolean | `true` | Case-insensitive unless pattern has uppercase |
| `enableAliases` | boolean | `true` | Add useful rg aliases |

## Shell integration

When `enableAliases=true`:

| Alias | Description |
|-------|-------------|
| `rgi` | Case-insensitive search |
| `rgf` | Search filenames only |
| `rgh` | Include hidden files |
