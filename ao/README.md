# Setup

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install v20.11.1

curl -fsSL https://get.pnpm.io/install.sh | sh -
npm i -g https://get_ao.g8way.io
npm i -g zx
chmod +x ./start-game.mjs

pnpm dlx @permaweb/wallet > wallet.json
./start-game.mjs 1
```

```lua
Game = 'LfXGd_T_7wkMk3n8KltjDKtRNxbX-HuQJViPb0Eag_E'
ao.send({ Target = ao.id, Action = "Start" })
ao.send({ Target = ao.id, Action = "Tick" })
LatestGameState
```

```lua, game
startGamePeriod()
```
