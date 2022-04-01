'use strict'

const NodeCache = require('node-cache')
const cache = new NodeCache()

const cacheSet = (key, val) => {
  if (!key)
    throw new Error(
      `Error: <Key> is required to set a value in the cache -- got: ${key}`
    )
  if (!val)
    throw new Error(
      `Error: <Val> is required to set a value in the cache -- got: ${val}`
    )

  const status = cache.set(key, val)

  if (!status)
    throw new Error(`Error: failed to set value in cache using key: ${key}`)
}

const cacheGet = key => {
  if (!key)
    throw new Error(
      `Error: <Key> is required to get a value from the cache -- got: ${key}`
    )

  return cache.get(key)
}

module.exports = {
  cache,
  cacheGet,
  cacheSet
}
