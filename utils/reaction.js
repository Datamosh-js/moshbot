const thumbsUp = (message) => {
    message.react('👍')
}

const thumbsDown = (message) => {
    message.react('👎')
}

module.exports = {
    thumbsUp,
    thumbsDown
}