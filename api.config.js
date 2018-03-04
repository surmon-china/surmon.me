const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : '',
  baseUrl: isProdMode ? 'https://api.surmon.me/' : 'http://localhost:8000/',
  socketHost: isProdMode ? 'https://surmon.me' : `http://localhost:3000`
  // baseUrl: isProdMode ? 'https://api.surmon.me/' : 'http://192.168.2.100:8000/',
  // socketHost: isProdMode ? 'https://surmon.me' : `http://192.168.2.100:3000`
}
