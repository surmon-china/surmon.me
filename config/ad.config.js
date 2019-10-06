/**
 * @file Ads config / ES module
 * @module ad.config
 * @author Surmon <https://github.com/surmon-china>
 */

const imagePath = '/images/mammon/'
const links = {
  common: {
    // ECS 服务器（N）
    aliyunECS: 'https://s.click.taobao.com/vyZYGzv',
    // 虚拟主机，轻服务（N）
    aliyunSWAS: 'https://s.click.taobao.com/BeUYGzv',
  },
  pc: {
    // 淘宝（N）
    taobao: 'https://s.click.taobao.com/Y4HYGzv',
    // 天猫超市（N）
    tmailMarket: 'https://s.click.taobao.com/yHMYGzv',
    // 飞猪（N）
    alitrip: 'https://s.click.taobao.com/NVTYGzv'
  },
  mobile: {
    // 淘宝（N）
    taobao: 'https://s.click.taobao.com/qiGDd9w',
    // 飞猪（N）
    alitrip: 'https://s.click.taobao.com/rHTYGzv'
  }
}

// 移动端广告
export const mobile = {
  aside: {
    taobao: links.mobile.taobao,
    aliyun: links.common.aliyunECS
  }
}

// pc 端链接广告
export const pc = {
  nav: {
    taobao: links.pc.taobao,
    aliyun: links.common.aliyunECS
  },
  carrousel: {
    url: links.common.aliyunSWAS,
    src: imagePath + 'aliyun-sas-1190-420.jpg',
    title: '轻量应用服务器（SAS）是啥？'
  },
  asideSwiper: [
    {
      url: links.common.aliyunECS,
      src: imagePath + 'aliyun-532-178.jpg'
    },
    {
      url: links.pc.tmailMarket,
      src: imagePath + 'tmail-532-178.jpg'
    },
    {
      url: links.pc.alitrip,
      src: imagePath + 'alitrip-532-178.jpg'
    },
    {
      url: links.pc.taobao,
      src: imagePath + 'taobao-532-178.jpg'
    }
  ]
}

// 公共广告
export const common = {

  // 相关文章 -> 智能广告
  articleRelated(tags, isMobile) {
    
    const text = tags.map(tag => tag.name + tag.description).join()
    const isCategory = tags => tags.some(tag => text.includes(tag))

    const ads = [
      {
        tags: ['诗', '远方', '旅行', '世界', '人生', '思考', '生活'],
        ad: {
          link: isMobile ? links.mobile.alitrip : links.pc.alitrip,
          title: '有梦就出发吧！',
          img: imagePath + 'alitrip-290-224.jpg'
        }
      }
    ]

    const defaultAliyunAd = {
      link: links.common.aliyunECS,
      title: '一款优秀的弹性主机很重要！',
      img: imagePath + 'aliyun-290-224.jpg'
    }
    
    const findAd = ads.find(ad => isCategory(ad.tags))
    const resultAd = findAd ? findAd.ad : defaultAliyunAd
    return Object.assign(resultAd, { ad: true })
  }
}

export default { pc, mobile, common }
