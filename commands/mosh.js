'use strict'

const datamosh = require('datamosh')
const axios = require('axios')

const { replyWithText } = require('../utils/reply')

module.exports = async (...[, message, options]) => {
  console.log('Moshing', options)

  if (!message?.attachments || message.attachments.size === 0) {
    replyWithText(message, 'You need to upload an image!')
    return
  }

  // only supporting one image for now
  const imgURL = message.attachments.values().next()?.value?.proxyURL
  if (!imgURL) throw new Error('Error getting imageURL')

  const res = await axios.get(imgURL)

  const imgBuffer = Buffer.from(res.data)
  const moshedImgBuffer = await datamosh(imgBuffer, options)
}
