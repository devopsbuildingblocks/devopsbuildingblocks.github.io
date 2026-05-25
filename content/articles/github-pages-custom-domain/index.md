---
title: "Hosting a Static Site on GitHub Pages with a Custom Domain"
date: 2026-05-01
draft: false
type: article
description: "GitHub Pages is genuinely good free hosting for static sites. Here's the full setup: repo config, DNS records, HTTPS enforcement, and where it trips people up."
topics: ["github", "dns", "static-sites"]
tone: informal
authors: ["joshua-ward"]
---

GitHub Pages is free, reliable, and pairs well with any static site generator. It's what powers this site. devopsbuildingblocks.github.io runs on Hugo built and deployed via GitHub Actions, served by Pages on a custom domain. The setup is straightforward but there are a few spots where things go wrong silently if you don't know what to look for.

## What you're setting up

GitHub Pages can serve your site from two places:

- **`github.io` subdomain**: free, automatic, works immediately. Format is `<org>.github.io` or `<user>.github.io` for your account's root site, or `<org>.github.io/<repo>` for project sites.
- **Custom domain**: you bring a domain you own, point DNS at GitHub's servers, and Pages handles the rest including HTTPS via Let's Encrypt.

This article covers the custom domain path.

## Step 1: Enable Pages in the repo

In your repository, go to **Settings → Pages**.

Under **Source**, select **GitHub Actions**. This is the modern approach. You control the build and push the artifact yourself rather than letting GitHub pick a branch. If your repo is on a free plan, the repository needs to be public.

If you're using a static site generator like Hugo, Jekyll, or Astro, you'll wire this up with a workflow file. More on that below.

## Step 2: Add a custom domain

Still in **Settings → Pages**, enter your domain in the **Custom domain** field and click Save. GitHub will immediately try to verify DNS. It'll fail at this point because you haven't added the DNS records yet. That's fine, continue.

GitHub will also create a `CNAME` file in your repository root containing your domain. If you're using GitHub Actions to deploy, make sure your build process includes this file in the published output, otherwise Pages will keep forgetting your custom domain on every deploy.

{{< callout type="tip" >}}
If you're using Hugo, add your domain to `static/CNAME` (no extension, just the domain name on one line). Hugo copies everything in `static/` to the output directory unchanged.
{{< /callout >}}

## Step 3: Configure DNS

GitHub Pages uses four IP addresses for apex domains and a CNAME for subdomains.

### Apex domain (e.g. `example.com`)

Add four `A` records pointing to GitHub's servers:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

Also add an `AAAA` record set for IPv6:

```
AAAA    @    2606:50c0:8000::153
AAAA    @    2606:50c0:8001::153
AAAA    @    2606:50c0:8002::153
AAAA    @    2606:50c0:8003::153
```

### `www` subdomain (recommended even for apex-only sites)

Add a CNAME pointing to your `github.io` address:

```
CNAME    www    <org>.github.io.
```

### Subdomain only (e.g. `docs.example.com`)

If you only want a subdomain, skip the `A` records and add just a CNAME:

```
CNAME    docs    <org>.github.io.
```

### Configuring DNS in Namecheap

In Namecheap, go to **Dashboard → your domain → Manage → Advanced DNS**.

You'll see a table of existing records. Delete any default `A` records or parking records that Namecheap added, then click **Add New Record** for each of the following:

**A records for the apex domain:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |

**AAAA records for IPv6:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| AAAA Record | @ | 2606:50c0:8000::153 | Automatic |
| AAAA Record | @ | 2606:50c0:8001::153 | Automatic |
| AAAA Record | @ | 2606:50c0:8002::153 | Automatic |
| AAAA Record | @ | 2606:50c0:8003::153 | Automatic |

**CNAME for www:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | www | devopsbuildingblocks.github.io. | Automatic |

{{< callout type="tip" >}}
In Namecheap's interface the **Host** field is just the subdomain portion — use `@` for the apex and `www` for the www subdomain. The trailing dot on the CNAME value is standard DNS notation; Namecheap accepts it with or without.
{{< /callout >}}

Click the checkmark to save each record. Namecheap also has a **URL Redirect Record** type — don't use that here, it's a different thing.

DNS propagation typically takes a few minutes to a few hours depending on your registrar. You can check with:

```bash
dig example.com +short
dig www.example.com +short
```

## Step 4: Verify DNS in GitHub

Go back to **Settings → Pages** and click **Check DNS configuration** (or wait; it checks automatically every few minutes). Once GitHub sees the records resolving correctly, the custom domain field will show a green checkmark.

At this point GitHub will also start issuing a TLS certificate via Let's Encrypt. This usually takes under 10 minutes.

## Step 5: Enforce HTTPS

Once the certificate is issued, the **Enforce HTTPS** checkbox becomes available. Check it. This redirects all `http://` traffic to `https://` and there's no good reason not to enable it.

{{< callout type="warning" >}}
HTTPS enforcement only becomes available after the certificate is provisioned. If the checkbox is greyed out, the cert hasn't finished issuing yet. Wait a few minutes and refresh.
{{< /callout >}}

## Deploying with GitHub Actions

The recommended workflow uses two official actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build site
        run: |
          # your build command here, e.g.:
          # hugo --minify

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public   # your build output directory

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

The `upload-pages-artifact` action packages your build output and the `deploy-pages` action pushes it to Pages. The `permissions` block is required. Pages deployment uses OIDC tokens, not a PAT.

## Common problems

**Custom domain resets after every deploy**

Your build is overwriting or omitting the `CNAME` file. Make sure it's present in your build output. For Hugo, put it in `static/CNAME`.

**Certificate won't provision**

Usually a DNS issue. Verify your `A` records resolve to all four GitHub IPs and that there's no conflicting CAA record blocking Let's Encrypt. Check with:

```bash
dig CAA example.com +short
```

If you see a CAA record that doesn't include `letsencrypt.org`, either remove it or add `0 issue "letsencrypt.org"`.

**`www` redirects to the apex but HTTPS breaks**

Make sure you added both the apex `A` records and the `www` CNAME. GitHub Pages handles the redirect between them once both are configured.

**404 on every page except the root**

Your static site generator is producing URLs like `/about/` but the `index.html` files aren't where Pages expects them. Check that your build output has `public/about/index.html`, not `public/about.html`. Pages handles trailing-slash URLs correctly when the files exist.

## That's it

GitHub Pages is one of those things that looks like it should be more complicated than it is. Once DNS propagates and the cert provisions, it just works: automatic HTTPS renewals, global CDN, no servers to manage. For a static site, it's hard to beat free.

This site uses exactly this setup: Hugo builds the content, GitHub Actions deploys it on every push to `main`, and Pages serves it on the custom domain.
