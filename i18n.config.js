
module.exports = {
  locales: [
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '简体中文'
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    }
  ],
  defaultLocale: 'zh',
  redirectRootToLocale: 'zh',
  detectBrowserLanguage: true,
  noPrefixDefaultLocale: true,
  vueI18n: {
    fallbackLocale: 'zh',
    messages: {
      zh: {
        home: '主页',
        about: '众里寻他',
      },
      en: {
        home: 'Home',
        about: 'About',
      },
    },
  },
  // ignorePaths: [
  //   '/en/notlocalized'
  // ]
}
