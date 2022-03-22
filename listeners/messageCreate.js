'use strict'

const { COMMAND_PREFIX } = require('../constants')
const commands = require('../commands')

module.exports = async (client, message) => {
  const { content, author } = message

  if (!content || client.user.id === author.id) return

  if (content.startsWith(COMMAND_PREFIX)) {
    const [command, ...options] = content.split(' ')
    const name = command?.replace(COMMAND_PREFIX, '')

    if (Object.keys(commands).includes(name)) {
      const fn = commands[name]

      try {
        if (fn.constructor.name === 'AsyncFunction')
          return await fn(client, message, options)
        if (fn.constructor.name === 'Function')
          return fn(client, message, options)
      } catch (error) {
        // handle this via messages
        throw error
      }

      throw new Error(
        'Unsupported command -- command must be of type Function or AsyncFunction'
      )
    }
  }
}
