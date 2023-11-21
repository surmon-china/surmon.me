/**
 * @file BFF Server fetcher
 * @module server.service.axios
 * @author Surmon <https://github.com/surmon-china>
 */

import _axios from 'axios'
import Agent, { HttpsAgent } from 'agentkeepalive'

// https://stackoverflow.com/a/63585550/6222535
// https://stackoverflow.com/a/74375876/6222535
// https://github.com/node-modules/agentkeepalive
// https://github.com/axios/axios?tab=readme-ov-file#request-config
// https://github.com/node-fetch/node-fetch/issues/1295
const axios = _axios.create({
  httpAgent: new Agent({
    keepAlive: true,
    maxSockets: 160,
    maxFreeSockets: 160,
    timeout: 60000,
    freeSocketTimeout: 30000,
    keepAliveMsecs: 60000
  }),
  httpsAgent: new HttpsAgent({
    keepAlive: true,
    maxSockets: 160,
    maxFreeSockets: 160,
    timeout: 60000,
    freeSocketTimeout: 30000,
    keepAliveMsecs: 60000
  })
})

export default axios
export * from 'axios'
