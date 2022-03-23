'use strict'

const { MessageEmbed } = require('discord.js')

class MoshInfoEmbded extends MessageEmbed {
  constructor ({ modes, color, author }) {
    super()

    this.setTitle('Moshbot')
    this.setDescription(`Moshed using modes: ${modes.join(', ')}`)

    this.setURL('https://github.com/Datamosh-js/moshbot')
    this.setFooter({
      text: 'Made with Datamosh',
      iconURL: 'https://avatars.githubusercontent.com/u/87346364?s=40&v=4'
    })

    this.setColor(color)
  }
}

module.exports = MoshInfoEmbded
