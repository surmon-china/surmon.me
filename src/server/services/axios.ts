import _axios from 'axios'
import https from 'https'

// https://stackoverflow.com/a/63585550/6222535
// https://github.com/axios/axios?tab=readme-ov-file#request-config
// https://github.com/node-fetch/node-fetch/issues/1295
const axios = _axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true })
})

export default axios
export * from 'axios'
