const Nuxt = require('nuxt')
const app  =  require('express')()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
process.noDeprecation = true

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
  	// eslint-disable-line no-console
    console.error(error)
    process.exit(1)
  })
}

// Listen the server
app.listen(port, host)
// eslint-disable-line no-console
console.log(`Nuxt.js SSR Server listening on ${host} : ${port}, at ${new Date().toLocaleString()}`)