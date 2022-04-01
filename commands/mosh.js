'use strict'

const { downloadImgBuffer } = require('../utils/webtx')
const { replyWithText } = require('../utils/reply')
const { thumbsUp, thumbsDown } = require('../utils/reaction')
const { cacheSet } = require('../utils/cache')
const { performEmbedReply } = require('../preformers/mosh')

module.exports = async (...[, message, options]) => {
  console.log(`Mosh request from user: ${message.author.id}`, options)

  if (!message?.attachments || message.attachments.size === 0) {
    replyWithText(message, 'You need to upload an image!')
    return
  }

  // only supporting one image for now
  const attachmentData = message.attachments.first()
  const imgURL = attachmentData.url
  if (!imgURL) throw new Error('Error getting imageURL')

  try {
    const imgBuff = await downloadImgBuffer(imgURL)
    thumbsUp(message)

    // set in cache for use with replay command
    cacheSet(message.author.id, { buffer: imgBuff, modes: options })

    const { moshBuff, color } = await performMosh(imgBuff, options)

    performEmbedReply(message, moshBuff, color, options)
  } catch (error) {
    thumbsDown(message)
    console.error(error)
    replyWithText(message, error.message)
  }
}

module.exports.alias = 'm'
