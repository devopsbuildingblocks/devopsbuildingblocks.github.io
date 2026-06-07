---
title: "Why I Invested So Much Time in Devcontainers (and Why I Added Devbox on Top)"
date: 2026-06-07
draft: false
type: article
description: "I've seen workshops derailed by setup chaos, onboardings that took weeks, and corporate laptops that couldn't run anything. Here's what I landed on."
topics: ["devcontainers", "devbox", "nix", "developer-experience"]
tone: informal
authors: ["joshua-ward"]
---

I've spent a lot of time on devcontainer tooling. More than most people would consider reasonable. The problem it solves is real, and I've seen it up close: workshops derailed because no two machines in the room are in the same state, onboardings that stretch into weeks because the setup doc is always six months out of date, and corporate laptops so locked down that installing a basic tool requires a help desk ticket and a manager's approval.

A README doesn't fix any of that. It documents the problem and calls it solved.

## The teaching problem

A few years ago I was running a workshop on infrastructure tooling. The lab guide opened with a section called "Quick Start": install a CLI, authenticate against an API, run your first command. Five minutes, tops.

Thirty minutes later, half the room was still stuck on step one.

Not because they weren't capable. Because one person was on Windows (corporate had helpfully disabled WSL), two were on Macs with M-series chips (Apple's shift from x86 to ARM was still new, and the ecosystem hadn't fully caught up), one had an older version of the tool already installed that was incompatible, and several others had hit permission errors because corporate IT had locked down their machines.

By the time most people got through setup, we'd lost the thread of what we were actually trying to teach. The people who did get through it were frustrated. The people who didn't were embarrassed. Nobody was learning the thing I came to teach.

That's not just a bad afternoon. Someone wrote a business case for that room, got budget approved, and called in favors to fill it. The goal was momentum around a new technology. What they got was a room full of people who'll remember the part where their laptop didn't work, not the part where the technology was impressive.

This is not an unusual story. This is what happens every time you hand a room full of people a list of setup steps and assume it'll work.

## The onboarding problem

New engineer joins the team. Smart, motivated, ready to contribute. Their first week is largely consumed by getting their laptop to a state where they can actually run the codebase.

The setup doc is six months out of date. A dependency version changed and nobody updated the doc. The tool that "just works on Mac" doesn't install the same way on Windows. The environment variable that needs to be set isn't mentioned anywhere because it's been tribal knowledge for so long that no one thinks to write it down.

Two weeks in, they finally have something working. They're not sure it's fully right because there were so many workarounds. They're also not sure what "fully right" even looks like because there's no reference environment to compare against.

This is an expensive problem. It wastes the new hire's time at exactly the moment they're most eager to contribute. It taxes senior engineers who field the same questions for every new person. And it embeds a sense of fragility from day one: "this works, probably, for now, on my specific machine."

## The corporate environment problem

Corporate IT environments exist for legitimate reasons. Security policies, compliance requirements, software licensing. I don't dispute any of that.

But the practical result for an engineer is often a laptop with an outdated OS, a package manager that's blocked or missing, no admin rights to install software, and a TLS-intercepting proxy that breaks half the tools you try to install. Networking constraints don't disappear with devcontainers, but they become a one-time solved problem: corporate certificates and proxy configuration can be baked into the image, so every engineer inherits a working setup instead of fighting it individually.

The one thing devcontainers do require is Docker, or a compatible runtime. That's a real ask in a locked-down environment, and it still means filing a ticket. But there's a significant difference between getting one tool approved and getting every tool approved. Docker is the ask. Everything else, every CLI, every language runtime, every version of every dependency, lives inside the container.

## How I got here

I didn't start with devcontainers. I got there after exhausting the alternatives.

The first attempt was the obvious one: documented setup instructions. A well-written README with every step spelled out, version-pinned where it mattered, tested on a fresh machine. This works until it doesn't. Dependencies change, install URLs rot, a new OS version ships with a different default shell, and the doc is never quite up to date. Maintaining it is a second job that nobody volunteers for. It is a snapshot masquerading as a process.

The second attempt was AWS Workspaces. Cloud-hosted Windows desktops that the team could log into and use directly. The environment problem solved itself because everyone was literally on the same machine. But the cost is real: you're paying for persistent cloud desktops whether the team is using them or not, the experience depends entirely on network latency, and you're now also in the business of managing virtual desktops. It solved the consistency problem and introduced three new ones.

The third attempt was Vagrant. Define your environment in a Vagrantfile, run `vagrant up`, get a VM. This is a reasonable idea. The problem is that it's slow: provisioning a VM from scratch takes minutes, the feedback loop when something in the spec is wrong is painful, and performance inside the VM is noticeably worse than running natively. When the tools you're using inside the VM are CPU-intensive (compilers, container builds, test suites), you feel that overhead constantly. People find workarounds, and the workarounds defeat the consistency you were chasing.

Devcontainers solved the problem I actually had without introducing worse ones.

## What devcontainers actually solve

A devcontainer is a container spec that your editor opens instead of your local machine. VS Code, Cursor, and JetBrains all support it natively. When you open a project with a `.devcontainer` folder, the editor builds a container from your spec, mounts your workspace into it, and connects its terminal, extensions, and language features to the running container. If you live in the terminal and Neovim is non-negotiable, the [devcontainer CLI](https://github.com/devcontainers/cli) lets you bring up a container and drop into it without an IDE in the loop.

From the engineer's perspective, they clone the repo, open it in their editor, and everything works. The right versions of every tool are already installed. The environment variables are set. The shell is configured. It looks and behaves the same on a Mac, on Windows, and inside a cloud-hosted environment like GitHub Codespaces.

From a teaching perspective: everyone in the room has the same environment. When I show them a terminal command, it works for all of them. We can spend the workshop time on the actual content instead of on setup triage.

From an onboarding perspective: the new engineer clones the repo and is productive within minutes rather than weeks. The reference environment is codified in the repo, not in someone's head.

From a corporate perspective: the engineer needs Docker (or a compatible runtime) and nothing else. Everything else lives inside the container, outside the reach of IT policy conflicts.

## The cost I didn't anticipate

Once I committed to this approach, I started building out a library of devcontainer features. Features are modular install scripts: one feature installs a tool, sets it up, and wires it into the shell. You reference them in your `devcontainer.json` and they compose.

The problem is that every tool your users might need is a feature you have to write, test, version, and maintain. New tool comes out, users ask for it, you add it to the backlog. A tool changes its install path, you update the feature. A base image update breaks a dependency, you chase it down.

This is real work. It scales with the number of tools you support, not with the number of users you serve. And it puts me in the position of being a gatekeeper: if I haven't written a feature for your tool, you can't easily use it in the standardized environment.

I wanted a different answer.

## Why Nix

Nix is a package manager with somewhere north of 80,000 packages. It runs on Linux and Mac. It installs packages in a fully isolated, reproducible way: no global state, no version conflicts, no "it works on my machine" because the exact same closure of dependencies is resolved the same way everywhere.

That last property is what makes it interesting for devcontainers. If a user needs a tool, there's an extremely high probability that Nix already has it. And if they install it via Nix, I don't have to do anything. I don't have to write a feature, maintain a version, or test it against base image updates. The user and their team own that dependency.

The catch is that raw Nix has a steep learning curve. The Nix language is unusual, the documentation is scattered, and the mental model takes time to build.

## Where devbox fits

[Devbox](https://www.jetify.com/devbox) is a tool built on top of Nix that gives you a simple interface to the Nix package ecosystem. You don't write Nix. You run `devbox add ripgrep` and it adds ripgrep to your `devbox.json`. You run `devbox shell` and you get a shell with exactly those packages available.

The `devbox.json` file is checked into the repo alongside `devcontainer.json`. When a teammate opens the project, they get the same packages. When a new tool is needed, any team member adds it to `devbox.json`, commits it, and everyone picks it up on their next rebuild.

This inverts the model I was stuck in. Instead of the platform team being the bottleneck for every new tool, individual teams own their own toolset. The devcontainer provides the baseline: a consistent OS, shell, and editor configuration. Devbox handles everything on top of that.

## What this looks like in practice

Take a Go project. The team wants a consistent environment with Go installed, the official Go VS Code extension wired up, and a handful of supporting tools. Here's what that looks like:

```json
// .devcontainer/devcontainer.json
{
  "name": "My Go Project",
  "image": "ghcr.io/devopsbuildingblocks/devcontainer-images/ubuntu-toolbox:latest",
  "customizations": {
    "vscode": {
      "extensions": [
        "golang.go"
      ]
    }
  }
}
```

```json
// devbox.json
{
  "$schema": "https://raw.githubusercontent.com/jetify-com/devbox/0.16.0/.schema/devbox.schema.json",
  "packages": [
    "go@latest",
    "golangci-lint@latest",
    "go-task@latest"
  ]
}
```

The `devcontainer.json` references `ubuntu-toolbox`, which provides a solid OS baseline with common utilities and devbox pre-installed. VS Code gets the Go extension automatically on container startup. The `devbox.json` handles everything language-specific: the Go toolchain, the linter, and a task runner. A teammate who needs `delve` for debugging adds one line to `devbox.json` and opens a PR.

I use this exact setup myself. The [devcontainer-features](https://github.com/devopsbuildingblocks/devcontainer-features) repo, where all of the features on this site are authored and tested, runs on `ubuntu-toolbox` with a `devbox.json` for all its tooling. The [devcontainer.json](https://github.com/devopsbuildingblocks/devcontainer-features/blob/main/.devcontainer/devcontainer.json) and [devbox.json](https://github.com/devopsbuildingblocks/devcontainer-features/blob/main/devbox.json) are both public if you want to see what a real working example looks like. I am not recommending something I don't rely on daily.

## The honest tradeoffs

Devcontainers require Docker or a compatible runtime. That's a real dependency and in some environments it's still a hurdle to clear. GitHub Codespaces sidesteps this for fully cloud-hosted work, but for local development you need the runtime.

The initial container build takes time, especially the first time. After that, layer caching keeps rebuilds fast. But the cold start is real and can feel slow if you're not expecting it.

Devbox with Nix also adds some startup time inside the container as it resolves and installs packages. For large package sets this is noticeable. It's a one-time cost per rebuild, but it's worth knowing about.

And Nix is not available for every package that exists. 80,000 is a lot, but it's not everything. For the rare case where something isn't in nixpkgs, the devcontainer feature model is still there as a fallback.

## Why I keep investing in this

Because the alternative is a six-page setup doc that's always wrong, a room full of people who can't follow along, and a new engineer who spends their first two weeks debugging their laptop instead of shipping anything.

Devcontainers with devbox and Nix is not a perfect solution. But it shifts the burden from "every person sets up their own environment from scratch" to "define the environment once, inherit it everywhere." That shift is worth a lot of effort to get right.

## What I've built

The features and images described throughout this article are published under the [DevOps Building Blocks](https://github.com/devopsbuildingblocks) GitHub organization and documented on this site.

- [Features docs](/docs/devcontainers/features/) and [source repo](https://github.com/devopsbuildingblocks/devcontainer-features): modular install scripts for individual tools, designed to compose cleanly and integrate with devbox
- [Images docs](/docs/devcontainers/images/) and [source repo](https://github.com/devopsbuildingblocks/devcontainer-images): base images built with the devbox workflow in mind, so you're not starting from scratch

Everything is free to use. If you find something missing or broken, file an issue or feel free to fork it!
