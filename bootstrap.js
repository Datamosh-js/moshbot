'use strict'

const { Client, Intents } = require('discord.js')

const listeners = require('./listeners')

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

module.exports = (() => {
  // bind listeners
  Object.keys(listeners).forEach(event => {
    client.on(event, listeners[event].bind(null, client))
  })

  return client
})()
