'use strict'

const client = require('https')

const downloadImgBuffer = async url => {
  return new Promise((resolve, reject) => {
    let buff = new Buffer.alloc(0)
    client.get(url, res => {
      if (res.statusCode === 200) {
        res
          .on('data', chunk => {
            buff = Buffer.concat([buff, chunk])
          })
          .on('error', reject)
          .once('close', () => {
            resolve(buff)
          })
      } else {
        res.resume()
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        )
      }
    })
  })
}

module.exports = {
  downloadImgBuffer
}
