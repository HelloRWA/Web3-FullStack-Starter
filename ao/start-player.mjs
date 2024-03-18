#!/usr/bin/env zx

const name = argv._[0]

const params = [
  '--load', './game/bot.lua',
]
$`aos player-${name} ${params}`
// Game = ''
// Send({ Target = Game, Action = "Register" })
// Send({ Target = ao.id, Action = "AutoPay" })