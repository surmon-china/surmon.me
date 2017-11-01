
if (process.env.NODE_ENV === 'production') {
  const OfflinePlugin = require('offline-plugin/runtime')
  window.onNuxtReady(() => {
    OfflinePlugin.install({
      onInstalled: function () {
        console.log('Offline plugin installed.')
      },
      onUpdating: function () {

      },
      onUpdateReady: function () {
        OfflinePlugin.applyUpdate()
      },
      onUpdated: function () {
        window.location.reload()
      }
    })
  })
}
