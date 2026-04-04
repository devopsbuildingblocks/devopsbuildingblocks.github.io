---
title: "kubectl debug uses ephemeral containers, not exec"
date: 2026-04-04
draft: false
type: til
description: "kubectl debug injects a fresh container into a running pod — it doesn't exec into the existing one. This matters when your app container has no shell."
topics: ["kubernetes", "kubectl", "debugging"]
toc: false
authors: ["joshua-ward"]
---

If your application container is built from a distroless or scratch image, `kubectl exec` gives you nothing useful — there's no shell to attach to.

`kubectl debug` solves this by injecting an *ephemeral container* into the running pod:

```bash
kubectl debug -it my-pod \
  --image=busybox \
  --target=my-app \
  -- sh
```

The `--target` flag makes the ephemeral container share the process namespace of your app container, so you can inspect its processes, read its filesystem via `/proc/<pid>/root`, and check its network — all without modifying the original pod spec.

The ephemeral container disappears when the pod restarts. It's not there permanently.

**Why this tripped me up:** I assumed `kubectl debug` was just a friendlier alias for `kubectl exec`. It's not — it creates a new container. That's why it works on distroless images where exec would give you `exec /bin/sh: no such file or directory`.
