'use strict'

const { thumbsDown, thumbsUp } = require('../utils/reaction')
const { replyWithText } = require('../utils/reply')
const { cacheGet } = require('../utils/cache')
const { performMosh, performEmbedReply } = require('../preformers/mosh')

module.exports = async (...[, message, options]) => {
  console.log(`Replay request from user: ${message.author.id}`)

  try {
    let { buffer, modes } = cacheGet(message.author.id) || {}

    if (options && options.length > 0) {
      modes = options
    }

    if (!buffer || !modes)
      throw new Error('Cannot replay; you have no mosh history.')

    thumbsUp(message)

    const { moshBuff, color } = await performMosh(buffer, modes)

    performEmbedReply(message, moshBuff, color, modes)
  } catch (error) {
    thumbsDown(message)
    console.error(error)
    replyWithText(message, error.message)
  }
}

module.exports.alias = 'r'
