---
title: "Bootstrapping Argo CD on k3s"
date: 2026-04-04
draft: false
type: docs
weight: 1
description: "A reproducible walkthrough for installing Argo CD on a bare k3s cluster, including the RBAC gotchas nobody documents."
topics: ["argocd", "kubernetes", "k3s"]
authors: ["joshua-ward"]
---

## Overview

This guide walks through installing Argo CD on a fresh k3s cluster. The official Argo CD docs are good but skip over several pain points you'll hit in a real environment — specifically around RBAC, ingress TLS, and the order-of-operations for initial bootstrap.

By the end you'll have:
- Argo CD running and accessible via HTTPS
- An admin password changed from the default
- A first application deployed via GitOps

**Time to complete:** ~30 minutes on a fresh cluster.

## Prerequisites

- A running k3s cluster (single-node is fine for this guide)
- `kubectl` configured to reach it
- A domain or the ability to use a local `/etc/hosts` entry
- A Git repository to use as an app source (can be public)

## Steps

### Step 1: Install the Argo CD manifests

k3s ships with Traefik as its default ingress controller. Argo CD's default install assumes you want to use its own self-signed cert for the server. These two things conflict. We disable the TLS redirect on the Argo CD server so Traefik can terminate TLS instead.

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Wait for pods to come up:

```bash
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=120s
```

### Step 2: Patch the argocd-server deployment

By default, Argo CD runs its own HTTPS server. If Traefik is in front of it doing TLS termination, you need to tell Argo CD to serve plain HTTP on port 80 and trust the `X-Forwarded-*` headers from Traefik.

```bash
kubectl patch deployment argocd-server -n argocd \
  --type='json' \
  -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--insecure"}]'
```

{{< callout type="warning" >}}
The `--insecure` flag here does **not** mean your traffic is unencrypted end-to-end — it means Argo CD trusts Traefik to handle TLS. Without this, you'll get a redirect loop.
{{< /callout >}}

### Step 3: Create the Ingress

```yaml
# argocd-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argocd-server
  namespace: argocd
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: "true"
spec:
  rules:
  - host: argocd.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: argocd-server
            port:
              number: 80
```

Apply it:

```bash
kubectl apply -f argocd-ingress.yaml
```

### Step 4: Get the initial admin password

```bash
kubectl get secret argocd-initial-admin-secret \
  -n argocd \
  -o jsonpath='{.data.password}' | base64 -d
```

Log in and change it immediately:

```bash
argocd login argocd.example.com
argocd account update-password
```

{{< callout type="tip" >}}
Delete the `argocd-initial-admin-secret` after you've changed the password. It's a Kubernetes Secret but leaving it around is unnecessary credential exposure.
{{< /callout >}}

### Step 5: Deploy your first application

```bash
argocd app create my-app \
  --repo https://github.com/yourorg/your-repo.git \
  --path manifests/ \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default \
  --sync-policy automated
```

## Verification

Check application health in the Argo CD UI at `https://argocd.example.com`. You should see your app in a `Healthy / Synced` state.

From the CLI:

```bash
argocd app get my-app
```

## Troubleshooting

**Redirect loop when accessing the UI**
You likely forgot the `--insecure` patch in Step 2. Check `kubectl logs -n argocd deployment/argocd-server` for TLS-related errors.

**`argocd login` fails with certificate error**
If you're using a self-signed cert, add `--insecure` to the `argocd login` command during initial setup. For production, use cert-manager with Let's Encrypt.

**Application stuck in `OutOfSync` with no changes**
Check if the repo is private and you haven't added credentials: `argocd repo add https://github.com/yourorg/your-repo.git --username <user> --password <token>`.
