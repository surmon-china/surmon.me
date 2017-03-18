const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isProdMode ? 'https://api.surmon.me/' : 'http://localhost:8000/'
}
