---
title: "Helm Is Fine, Actually"
date: 2026-04-04
draft: false
type: article
description: "The Helm criticism you see online is mostly from people who haven't read the docs or who hit a paper cut and wrote a blog post about it."
topics: ["helm", "kubernetes"]
tone: informal
toc: false
authors: ["joshua-ward"]
---

Let me get something off my chest: the Helm pile-on is boring.

Every few months someone posts "Why I stopped using Helm" and it gets passed around like a revelation. The criticisms are almost always the same: templating is ugly, debugging is painful, values files proliferate, upgrades are scary. These are all real. They are also mostly problems you bring on yourself.

## The actual complaints

**"YAML templating with Go templates is a nightmare."**

Yes. It's not pretty. But I've never met a Helm chart that was harder to debug than a kustomize overlay that's six levels of patches deep. The ugliness is visible. With kustomize, the magic is hidden — you find out something is wrong when the wrong thing is in the cluster.

**"Values files get out of hand."**

This is a team process problem, not a Helm problem. If you have 47 `values-*.yaml` files and nobody knows which one applies in which environment, that's a discipline problem. Helm gives you the tools. It doesn't enforce the discipline.

**"Helm upgrades are scary."**

This one I'll grant you partially. The three-way strategic merge thing is genuinely confusing, and `helm upgrade` has footguns. But the alternative is often "we just kubectl apply things directly and hope" — which is far scarier.

## What I think is actually happening

A lot of the Helm discourse comes from people who hit a rough edge early and never came back. The docs have improved substantially. The `--dry-run` and `--debug` flags will show you exactly what's being rendered. `helm template` exists. `helm diff` (via plugin) is excellent.

The tooling has matured. The mental model is learnable. And critically — it's the tool your colleagues have already used. When you replace it with a custom solution, you're paying the learning curve for everyone.

## The exception

If you're building a platform that distributes software to other teams or customers, yes — Helm's templating model starts to buckle under real customization pressure. That's what operators and OLM and similar tools are for.

For 90% of use cases, including most internal platform engineering work: Helm is fine. You don't need to fix it.
