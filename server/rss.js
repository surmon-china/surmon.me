/**
 * @file RSS输出器 / Commonjs module
 * @module server/rss
 * @author Surmon <https://github.com/surmon-china>
 */

const RSS = require('rss')
const axios = require('axios')
const requireESM = require('esm')(module)
const appConfig = requireESM('../config/app.config').default
const apiConfig = requireESM('../config/api.config').default

const getRSSXMLByArticles = (articles = []) => {
  return new RSS(
    {
      title: appConfig.meta.title,
      description: appConfig.meta.description,
      site_url: apiConfig.FE,
      feed_url: `${apiConfig.FE}/rss`,
      image_url: `${apiConfig.FE}/icon.png`,
      managingEditor: appConfig.meta.author,
      webMaster: appConfig.meta.author,
      copyright: `${new Date().getFullYear()} ${appConfig.meta.title}`,
      language: 'zh',
      categories: ['code', 'think'],
      ttl: '60'
    }, 
    articles.map(article => ({
      title: article.title,
      description: article.description,
      url: `${apiConfig.FE}/article/${article.id}`,
      guid: article._id,
      categories: article.category.map(category => category.slug),
      author: appConfig.meta.author,
      date: article.create_at,
      enclosure: {
        url: article.thumb
      }
    }))
  ).xml({ indent: true })
}


module.exports = (request, response) => {
  axios.default
    .get(`${apiConfig.BASE}/article`)
    .then(({ data }) => {
      response.type('application/xml')
      response.send(getRSSXMLByArticles(data.result.data))
    })
    .catch(error => {
      response.status(500).send(new Error(`RSS 获取失败：${error}`));
    })
}
