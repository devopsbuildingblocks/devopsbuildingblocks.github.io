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
.github/
  workflows/
    generate-docs.yml   # AI-powered doc generation via repository_dispatch
    deploy.yml          # Hugo build + GitHub Pages deploy
  scripts/
    generate_doc.py     # calls Claude Sonnet API to generate new doc pages
```

## Sidebar weight conventions

Weights control sidebar ordering within Hugo. They are assigned **chronologically** (the order features/images were added to the collection), not alphabetically.

### Features (`content/docs/devcontainers/features/`)

Weights are assigned alphabetically (steps of 10) so the sidebar stays in alphabetical order. Current assignments:
`bat=10, claude=20, common-utils=30, delta=40, devbox=50, direnv=60, eza=70, fd=80, fzf=90, gemini=100, k9s=110, lazygit=120, oh-my-posh=130, ripgrep=140`

When adding a new feature, insert it alphabetically and renumber affected features to maintain the steps-of-10 sequence.

### Images (`content/docs/devcontainers/images/`)

- Ubuntu family: ubuntu-base (10), ubuntu-devbox (20), ubuntu-toolbox (30), ubuntu-toolbox-nf (40)
- Rocky family: rocky-base (50), rocky-devbox (60), rocky-toolbox (70), rocky-toolbox-nf (80)
- New images continue the sequence in steps of 10.

## Adding a new feature doc

1. Create `content/docs/devcontainers/features/<name>.md` — use `devcontainer-feature.json` and `install.sh` from the source repo as the source of truth
2. Set `weight` to the next available multiple of 10 (check existing files)
3. Add a row to the feature table in `content/docs/devcontainers/features/_index.md` (alphabetical order in the table)

## Writing style

- No emojis in content files
- No em dashes (`--` or `—`) in content files; use commas, colons, or rewrite the sentence instead

## Adding a new image doc

1. Create `content/docs/devcontainers/images/<name>.md` — use the Dockerfile as the source of truth
2. Set `weight` following the sequence above
3. Update the image table in `content/docs/devcontainers/images/_index.md`
