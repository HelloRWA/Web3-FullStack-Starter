#!/usr/bin/env zx

const name = argv._[0]

const params = [
  '--load', './game/bot.lua',
]
$`DEBUG=1 aos player-${name} ${params}`
// Game = 'MX21hQxvrnPuu7O8ivD82JAKBaArneoHj9YVwjk9rJs'
// Send({ Target = ao.id, Action = "Start" })
// Send({ Target = Game, Action = "Register" })
// Send({ Target = ao.id, Action = "AutoPay" })