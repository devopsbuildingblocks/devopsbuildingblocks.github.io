---
title: "awscli2"
description: "Installs AWS CLI v2, the official command-line interface for Amazon Web Services."
weight: 10
date: 2026-06-06
type: docs
topics: ["devcontainers", "tools"]
---

**Current version:** `0.1.0` | [AWS CLI v2 documentation](https://docs.aws.amazon.com/cli/latest/userguide/)

## Usage

```json
"features": {
  "ghcr.io/devopsbuildingblocks/devcontainer-features/awscli2:0": {}
}
```

With options:

```json
"ghcr.io/devopsbuildingblocks/devcontainer-features/awscli2:0": {
  "version": "2.22.0"
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | string | `latest` | AWS CLI v2 version to install |

## Shell integration

Shell completion is configured automatically for both bash and zsh via `aws_completer`.
