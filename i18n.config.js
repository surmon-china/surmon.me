
module.exports = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'fr',
      iso: 'fr-FR',
      name: 'Français'
    }
  ],
  defaultLocale: 'en',
  noPrefixDefaultLocale: true,
  redirectRootToLocale: 'en',
  vueI18n: {
    messages: {
      fr: {
        home: 'Accueil',
        about: 'À propos',
        category: 'Catégorie'
      },
      en: {
        home: 'Homepage',
        about: 'About us',
        category: 'Category'
      }
    },
    fallbackLocale: 'en'
  },
  ignorePaths: [
    '/fr/notlocalized'
  ]
}
