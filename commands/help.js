'use strict'

const { replyWithText } = require('../utils/reply')

module.exports = (...[, message]) => {
    replyWithText(message, 'I haven\'t implemented this yet, lol')
  }
  
  module.exports.alias = 'h'