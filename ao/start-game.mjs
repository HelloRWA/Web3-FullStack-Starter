#!/usr/bin/env zx

const name = argv._[0]

const params = [
  '--load', './game/arena.lua',
  '--load', './game/ao-effect.lua',
]
$`aos game-${name} ${params}`