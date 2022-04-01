'use strict'

const datamosh = require('datamosh')
const domcolor = require('domcolor')

const MoshInfoEmbded = require('../models/MoshInfoEmbded')
const { MessageAttachment } = require('discord.js')

const performMosh = async (sourceBuff, modes) => {
  const moshBuff = await datamosh(sourceBuff, modes)
  const { rgb: color } = await domcolor(moshBuff)

  return { color, moshBuff }
}

const performEmbedReply = async (message, moshBuff, color, modes) => {
  const attachment = new MessageAttachment(moshBuff)

  message.reply({
    embeds: [new MoshInfoEmbded({ modes, color })],
    files: [attachment]
  })
}

module.exports = {
  performMosh,
  performEmbedReply
}
