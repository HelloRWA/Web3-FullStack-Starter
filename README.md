# AO Area DAO

It was fascinating when I first saw the [AO Launch Video](https://twitter.com/aoTheComputer/status/1762545634035290465).

Then I spend most of my time studying and trying AO.

Also, make the [Awesome AO](https://github.com/HelloRWA/awesome-ao).

During the weave hackathon, I first built the Inbox UI for track 1(Build a Fullstack Permaweb App), then built the game UI to reading && pull data from the ao arena for track 3(Build a Graphical User Interface for ao-Effect). Finally, come to the Track 4 task(The MemeFrame Championship).

Then I found I could combine all of them into one: `AO Arena DAO`.

1. User deposit CRED to get $AO Coin
2. User stake $AO Coin to the Arena, earn 10% profit share, vote for proposal in the DAO
3. User Bet on the players, once the side you bet on wins, you get the reward $AO Coin(Which comes from the failure side)
4. Arena takes 10% as the game fee, and 10% of the game fee share to all the stakers.
5. User can watch the players' moving and fighting on the `/arena`, which reads the data from the arena process

## Links

* [Web App](https://ao.rwa-wallet.com/)
* AO Process List
  * [Arena](https://www.ao.link/message/uLPuyonDbrhNMwL9UA04H9H4dLLE9iPdE0ESAjrWAqs)
  * [$AO Coin](https://www.ao.link/message/rxl5oOyCuzrUUVB1edjrcHpcn9s9czhj4rsq4ACQGv4)
  * [Deposit Service](https://www.ao.link/message/kzcVZhdcZOpM90eeKb-JRX3AG7TGH__S7p5I6PsqA3g)
  * [AI Player 1](https://www.ao.link/message/QcJD9Fzq-gg4LIBHsQs61eTpvlGojW_tg61Il0mp8TI)
  * [AI Player 2](https://www.ao.link/message/SkAPEpHCnB3GC8x5yoYMhaOx09G9H--YbzSoOLs4S9U)


## Features

### Inbox

User can add process, and send / receive the process's new message

* [x] add new process
* [x] process msg list
* [x] show avatar by the pid/msgId seed via [Bottts Neutral](https://www.dicebear.com/styles/bottts-neutral/)
* [x] send message to process
* [x] playsound while new message arrived (interval with 5 seconds)
* [x] load more while scroll to top(which will load older msg)

### ao-Effect

* [] show ao-Effect ui

## Credits

* Nuxt UI/ Nuxt UI Pro : [Click here](https://ui.nuxt.com/pro?aff=KokMD)
* [aos unbox](https://github.com/mayurmarvel/aos-unbox)
  * Notification Sounds : [Click here](https://notificationsounds.com/)
  * Dice Bear Avatars : [click here](https://www.dicebear.com/styles/bottts-neutral/)


![nuxt-ui-dashboard-social-card](https://github.com/nuxt-ui-pro/dashboard/assets/739984/f785284b-7db2-4732-af0e-2cb3c0bd7ca2)

# Nuxt UI Pro - Dashboard template

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)

- [Live demo](https://dashboard-template.nuxt.dev/)
- [Play on Stackblitz](https://stackblitz.com/github/nuxt-ui-pro/dashboard)
- [Documentation](https://ui.nuxt.com/pro/getting-started)

## Quick Start

```bash [Terminal]
npx nuxi init -t github:nuxt-ui-pro/dashboard
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.
