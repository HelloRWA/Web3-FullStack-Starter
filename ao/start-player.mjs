#!/usr/bin/env zx

const name = argv._[0]

const params = [
  '--load', './game/bot.lua',
  '--tag-name Game --tag-value', 'O64tiWxYEkGjbOh4GQ7-DQKSvGYG_Fk5XQ4R5l2PUJ8'
]
$`aos player-${name} ${params}`
// Game = ''
// Send({ Target = Game, Action = "Register" })
// Send({ Target = ao.id, Action = "AutoPay" })