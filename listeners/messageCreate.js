'use strict'

const { COMMAND_PREFIX } = require('../constants')
const commands = require('../commands')

module.exports = async (client, message) => {
  const { content, author } = message

  if (!content || client.user.id === author.id) return

  if (content.startsWith(COMMAND_PREFIX)) {
    const [command, ...options] = content.split(' ')
    const name = command?.replace(COMMAND_PREFIX, '')

    const supportedCommands = Object.keys(commands).map(cmd => ({
      alias: commands[cmd].alias,
      origin: cmd
    }))

    let fn
    supportedCommands.forEach(supportedCommand => {
      if (supportedCommand.alias === name || supportedCommand.origin === name) {
        fn = commands[supportedCommand.origin]
      }
    })

    if (!fn) return

    try {
      fn(client, message, options)
    } catch (error) {
      // handle this via messages
      throw error
    }
  }
}
