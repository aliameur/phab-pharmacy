<h1 align="center">
<img width="64" src="/assets/logo.svg" alt="Phab Pharmacy"/>
<br>
Phab Pharmacy
</h1>

<h3 align="center">A complete set of tools for Phab Pharmacy</h3>
<h3 align="center">✨ This workspace uses <a href="https://nx.dev">Nx</a> ✨</h3>

This repo contains the source code for the following projects:

- [online-store](https://github.com/aliameur/phab-pharmacy/tree/main/apps/online-store)
- [mobile-app](https://github.com/aliameur/phab-pharmacy/tree/main/apps/mobile-app)
- [backend](https://github.com/aliameur/phab-pharmacy/tree/main/apps/backend)
- [assistant-api](https://github.com/aliameur/phab-pharmacy/tree/main/apps/assistant)
- [point of sale (TODO)]

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/install/)
- [Pnpm](https://pnpm.io/) (8.12.1)
- Xcode (for iOS development)
- Android Studio (for Android development)

Follow the relevant links for installation instructions. You can verify that these are installed correctly by running the following commands:

```bash
$ node -v # v20.8.1

$ docker -v # Docker version 24.0.6, build ed223bc

$ pnpm -v # 8.12.1
```

We recommend installing the NX CLI globally. This is not required, but it will make it easier to run commands. (if you don't install preface all nx commands with `pnpm dlx`)

We also recommend installing the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete and UI for running tasks and generators (available for both VS Code and Jetbrains).


### Set up the workspace


1. Clone the repo:
```bash
# Using the official GitHub CLI
$ gh repo clone aliameur/phab-pharmacy

# or using git
$ git clone https://github.com/aliameur/phab-pharmacy.git
```

2. Install the dependencies:
```bash
$ cd phab-pharmacy
$ pnpm i
$ nx prepare backend # make sure to separately install the backend dependencies
```

3. Populate environment variables
```bash
$ cp apps/backend/.env.template apps/backend/.env
$ cp apps/online-store/.env.template apps/online-store/.env
```

### Start the backend

```bash
$ nx serve backend 
```
The backend should be running at http://localhost:9000 and the admin panel should open at http://localhost:7001.  

### Start the online-store

```bash
$ nx serve online-store 
```
The online store should be running at http://localhost:4200.

### Start the mobile-app

```bash
$ nx run-ios mobile-app # for ios
$ nx run-android mobile-app # for android 
```

### Start the assistant-api

> TODO

## Set up Nx Cloud

Run `nx connect` to benefit from remote caching and task distribution. 

✨ **Nx saved over 4hrs of compute time as of Jan 6.** ✨


## 📚 Docs

> TODO

## 💎 Contribute

Contributions are welcome! For detailed instructions on how to contribute, please refer to our [Contribution Guidelines](CONTRIBUTING.md).
