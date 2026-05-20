---
title: "Features"
description: "Composable dev container features. Each installs one tool via devbox global with shell integration and VS Code settings."
weight: 20
---

Features are published to `ghcr.io/devopsbuildingblocks/devcontainer-features/` and follow the [Dev Container Feature spec](https://containers.dev/implementors/features/).

## Design

Each feature installs its tool via `devbox global add`, which means tools are isolated in Nix with no system package conflicts and reliable version-pinning across rebuilds. The `devbox` feature (or an image that already includes it) is a prerequisite for all tool features.

Shell integration is dropped into `~/.shellrc.d/` by the `common-utils` shell framework, sourced automatically by both bash and zsh.

## Feature list

| Feature | Description |
|---------|-------------|
| [`bat`](./bat/) | `cat` clone with syntax highlighting |
| [`claude`](./claude/) | Claude Code CLI and VS Code extension |
| [`common-utils`](./common-utils/) | Non-root user, shell framework, volume mounts |
| [`delta`](./delta/) | Syntax-highlighting pager for git diffs |
| [`devbox`](./devbox/) | Devbox package manager (Nix-based) |
| [`eza`](./eza/) | Modern `ls` replacement |
| [`fd`](./fd/) | Fast, user-friendly `find` replacement |
| [`fzf`](./fzf/) | Command-line fuzzy finder |
| [`gemini`](./gemini/) | Gemini CLI and VS Code extension |
| [`k9s`](./k9s/) | Terminal UI for Kubernetes |
| [`lazygit`](./lazygit/) | Terminal UI for git |
| [`oh-my-posh`](./oh-my-posh/) | Shell prompt theme engine |
| [`ripgrep`](./ripgrep/) | Fast line-oriented search tool |

## Dependency order

Most tool features require `devbox` first. The images handle this automatically. If you're composing features on a third-party image, add `nix`, `common-utils`, and `devbox` before any tool features:

```json
"features": {
  "ghcr.io/devcontainers/features/nix:1": {},
  "ghcr.io/devopsbuildingblocks/devcontainer-features/common-utils:0": {},
  "ghcr.io/devopsbuildingblocks/devcontainer-features/devbox:0": {},
  "ghcr.io/devopsbuildingblocks/devcontainer-features/bat:0": {}
}
```
