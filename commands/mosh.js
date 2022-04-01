'use strict'

const datamosh = require('datamosh')
const domcolor = require('domcolor')

const { downloadImgBuffer } = require('../utils/webtx')
const { replyWithText } = require('../utils/reply')
const { thumbsUp, thumbsDown } = require('../utils/reaction')
const { cacheSet } = require('../utils/cache')

const MoshInfoEmbded = require('../models/MoshInfoEmbded')
const { MessageAttachment } = require('discord.js')

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

    const moshedImgBuffer = await datamosh(imgBuff, options)
    const { rgb: color } = await domcolor(moshedImgBuffer)

    const attachment = new MessageAttachment(moshedImgBuffer)

    message.reply({
      embeds: [new MoshInfoEmbded({ modes: options, color })],
      files: [attachment]
    })
  } catch (error) {
    thumbsDown(message)
    console.error(error)
    replyWithText(message, error.message)
  }
}

module.exports.alias = 'm'
