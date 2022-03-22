'use strict'

const datamosh = require('datamosh')
const { replyWithText } = require('../utils/reply')

module.exports = async (...[, message]) => {
  const modes = Object.keys(datamosh.MODES).join(', ')
  const supportedText = `Supported mosh modes: ${modes}`
  replyWithText(message, supportedText)
}
