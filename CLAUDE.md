# Claude Code context for devopsbuildingblocks.github.io

This is a Hugo static site documenting devcontainer features and images published by [DevOps Building Blocks](https://github.com/devopsbuildingblocks).

## Repo structure

```
content/docs/devcontainers/
  features/          # one .md per devcontainer feature
  images/            # one .md per devcontainer image
layouts/
  partials/
    post-meta.html   # date display — suppressed for type: docs (intentional)
```

## Sidebar weight conventions

Weights control sidebar ordering within Hugo. They are assigned **chronologically** (the order features/images were added to the collection), not alphabetically.

### Features (`content/docs/devcontainers/features/`)

Weights are assigned alphabetically (steps of 10) so the sidebar stays in alphabetical order. Current assignments:
`awscli2=10, bat=20, claude=30, common-utils=40, delta=50, devbox=60, direnv=70, eza=80, fd=90, fzf=100, gemini=110, helm=120, k9s=130, kubectl=140, lazygit=150, oh-my-posh=160, ripgrep=170, terragrunt=180`

When adding a new feature, insert it alphabetically and renumber affected features to maintain the steps-of-10 sequence.

### Images (`content/docs/devcontainers/images/`)

- Ubuntu family: ubuntu-base (10), ubuntu-devbox (20), ubuntu-toolbox (30), ubuntu-toolbox-nf (40)
- Rocky family: rocky-base (50), rocky-devbox (60), rocky-toolbox (70), rocky-toolbox-nf (80)
- New images continue the sequence in steps of 10.

## Adding a new feature doc

1. Create `content/docs/devcontainers/features/<name>.md` — use `devcontainer-feature.json` and `install.sh` from the source repo as the source of truth
2. Set `weight` to the next available multiple of 10 (check existing files)
3. Add a row to the feature table in `content/docs/devcontainers/features/_index.md` (alphabetical order in the table)

### Feature doc structure

Follow this section order:

- **Version line** — `**Current version:** \`x.y.z\` | [link to upstream docs]()`. Omit the link for internal/meta features (e.g. `common-utils`) that have no meaningful upstream URL.
- **`## Usage`** — bare JSON example first, then a "With options:" block for every feature that has any option (even if only `version`). The "With options" block shows the feature entry without the outer `"features": {}` wrapper, and should demonstrate the most useful non-default values.
- **`## Options`** — table of all options.
- **`## What's included`** — use when the feature installs multiple distinct components beyond binary + shell config: VS Code extensions, persistent volume mounts, generated config files. Use `## Shell integration` instead for features that only add aliases, env vars, or key bindings.
- **Devbox dependency** — documented centrally in `features/_index.md` under "Dependency order". Individual feature pages do NOT repeat it.
- **Config persistence** — only `claude` and `gemini` do the named-volume symlink pattern (`~/.claude`, `~/.gemini`). Other features do not need a config persistence section.

## Adding a new image doc

1. Create `content/docs/devcontainers/images/<name>.md` — use the Dockerfile as the source of truth
2. Set `weight` following the sequence above
3. Update the image table in `content/docs/devcontainers/images/_index.md`

### Image doc structure

Follow this section order:

- **Version line** — `**Current version:** \`x.y.z\`` (no external link).
- **`## Usage`** — bare `latest` JSON example first, then a "Pin to a specific version:" block using the current version tag.
- **`## What's included`** — bullet list or table of what this image adds on top of its parent.
- **`## When to use this`** — all images except `-nf` variants (see below).
- **`-nf` variants** — use `## Differences from <base>` (table) + `## Requirements` (Nerd Font setup instructions) instead of `## When to use this`.

## Index page conventions

Both `features/_index.md` and `images/_index.md` use `hide_child_list: true` in front matter to suppress the auto-generated Hugo child page list. The linked table in the content body serves as navigation instead. Any new section index page that provides its own navigation table should also set this.

## Writing style

- No emojis in content files
- No em dashes (`--` or `—`) in content files; use commas, colons, or rewrite the sentence instead
