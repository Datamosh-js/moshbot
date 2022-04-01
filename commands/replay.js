'use strict'

const datamosh = require('datamosh')
const domcolor = require('domcolor')

const { replyWithText } = require('../utils/reply')
const { cacheGet } = require('../utils/cache')

module.exports = async (...[, message]) => {
  console.log(`Replay request from user: ${message.author.id}`)

  try {
    const { buffer, modes } = cacheGet(message.author.id) || {}

    if (!buffer || !modes)
      throw new Error('Cannot replay; you have no mosh history.')

    const moshedImgBuffer = await datamosh(buffer, modes)
    const { rgb: color } = await domcolor(moshedImgBuffer)

    const attachment = new MessageAttachment(moshedImgBuffer)

    message.reply({
      embeds: [new MoshInfoEmbded({ modes , color })],
      files: [attachment]
    })
  } catch (error) {
    console.error(error)
    replyWithText(message, error.message)
  }
}

module.exports.alias = 'r'
