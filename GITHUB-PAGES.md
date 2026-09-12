# Publish the replacement portfolio

The static build is ready for the existing repository:
https://github.com/Stevenma05/StevenAbdallaPortfolio

The domain remains `www.stevenabdalla.com`. Keep the existing GoDaddy DNS records.

## First publication

1. Extract `outputs/StevenAbdallaPortfolio-ready.zip` into a folder outside this project, such as your Desktop. It contains the replacement source and a Git checkout of the existing repository, preserving its history and origin. Do not run `git init` or force-push.
2. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Keep **Custom domain** set to `www.stevenabdalla.com`.
3. Open a terminal in the extracted `StevenAbdallaPortfolio-ready` folder and run:

   ```sh
   git status
   git add -A
   git commit -m "Replace portfolio with STEVEN.EXE"
   git push origin main
   ```

   The push publishes the replacement through the included workflow. If Git reports that the remote branch has changed, stop and reconcile those changes before retrying; do not force-push.
4. Open the repository's **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to succeed. Then visit https://www.stevenabdalla.com and check the resume and project photos. Keep **Enforce HTTPS** enabled in Pages settings when available.

No GoDaddy changes are needed when continuing to use this repository and its existing domain.

## Editing and checking locally

Use the extracted repository as your working copy for future changes. Run:

```sh
npm run install:ci
npm run dev
```

Before publishing another change:

```sh
npx tsc --noEmit
npm run build
node scripts/verify-pages.mjs
```

The build exports the site into `dist/client`. Only this directory is uploaded to GitHub Pages; the Worker build and source files are not served. The static export uses the existing Vinext build, with `output: 'export'` in `next.config.ts`. The sitemap and robots file are static so they do not require a server.

The root and `public/CNAME` both preserve the current domain. The repository's Pages custom-domain setting remains authoritative for GitHub Actions deployments.

Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
