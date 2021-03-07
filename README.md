# Typed.sh

Typed.sh is just a blog, __init__?

- Built with latest technologies and ready to use CI and CD.
- Seamless experience both static generation and Next server.
- Beautiful next generation blog posting experience with MDX and Chakra-UI.

## Table of Contents

- [Installation](#installation)
- [Adoptation](#adoptation)
- [Deployment](#deployment)
- [LICENSE](#license)

----

# Installation

To deploy Typed.sh blog on local, you need to install following dependencies before install:

- Node.JS
- Yarn
- Git

1. Clone repository into your local directory.

```sh
git clone https://github.com/typed-sh/blog
cd blog
```

2. Install dependencies of your module.

```sh
yarn
```

3. Prepare submodules for non-development related data.

```sh
yarn update:prepare
yarn update
```

4. Deploy!

To run development server:

```sh
yarn dev
```

To run server locally:

```sh
yarn build && yarn start
```

To export as static HTML (and run server):

```sh
yarn build && yarn export && yarn serve
```

# Adoptation

Before we start, preparing two repository is ideal setup for Typed.sh based blog.

1. Clone original repository.

```sh
git clone https://github.com/typed-sh/blog
cd blog
```

2. Set upstream to get future updates from original repository.

```sh
git update:prepare
```

3. (Optional) Set `contents` folder as submodule to retain user-data effectively when receiving updates from original repository.

If you don't want to create submodule, just run `rm -rf .gitmodules` to delete submodules.

```sh
rm -rf .gitmodules
git submodules add [URL to repository]
```

4. Pull updates from upstream repository and prepare contents.

If you didn't set up submodules, you need to run `yarn update:upstream` instead to avoid loading submodules.

```sh
yarn update
```

# Deployment

> **Pre-steps**
>
> Before starting, do adoptation or installation!
> I assume that you already set up the project.

To deploy Typed.sh blog, you have several options:

1. Deploy to Vercel (built-in with Vercel Action)
2. Deploy to Vercel (non git-based projects)
3. Deploy to GitHub pages
4. Deploy to static HTML

We provide seamless experience between methods, so you don't need to worry about leak of functionalities.

## Deploy to Vercel (built-in with Vercel Action)

> **Warning**
>
> Only for git-based projects only!
> For non-git projects follow next guide.

The GitHub actions are already set to repository, and only you need to consider is the type of your Vercel account.

1. Initialize Vercel on your repository.

```sh
yarn dlx vercel
```

2. Copy project and organization identifier from `.vercel/project.json`.

```json
{"orgId":"","projectId":""}
```

3. Create new token from Vercel.

Go to following URL and create new token for your project.

- (https://vercel.com/account/tokens)[https://vercel.com/account/tokens]

4. Set repository secrets.

After copying values, go to `settings` tab of GitHub repository and click `secrets`.

Then add stuffs as follows by clicking `New repository secrets`.

- `ORG_ID`: `orgId`
- `PROJECT_ID`: `projectId`

## Deploy to Vercel (non git-based projects)

You need to deploy manually if you don't set up git repository.

```sh
yarn dlx vercel
```

## Deploy to GitHub pages

To deploy over GitHub pages with static HTML exportation, you need to set up GitHub actions for it.

Override `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to production

on: [
  push
]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: yarn
      - name: Build
        run: yarn build && yarn export
      - name: Update submodules # Add this if you're managing contents with git repository.
        run: yarn update:submodules
      - uses: JamesIves/github-pages-deploy-action@3.6.2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages
          FOLDER: out
          CLEAN: true
```

## Deploy to static HTML

Deploying project over Nginx or static file server? Of course you can!

1. Build and extract outputs.

```sh
yarn build && yarn export
```

2. Apply sample nginx configuration.

```
server {
  root /somewhere/your/project/out;

  location {
    autoindex off;
    index index.html;

    try_files $uri $uri/ /404.html /404/ =404;
  }
}
```

# LICENSE

This repository is distributed under [MIT License](./LICENSE).
