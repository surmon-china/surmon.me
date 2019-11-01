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
    // 轻量应用服务器（N）
    aliyunCPS: 'https://s.click.taobao.com/BeUYGzv#guid-1132710',
    // Web 防火墙
    aliyunWaf: 'https://s.click.taobao.com/fZdv8yv',
    // HTTP 证书
    aliyunHTTPS: 'https://s.click.taobao.com/BW2v8yv',
    // 云大使
    aliyunInvite: 'https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=pu7fghvl',
    // 全民云计算（ECS）
    aliyunQWBK: 'https://s.click.taobao.com/fARq8yv'
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
  // 2019 1111
  carrousel: {
    url: 'https://www.aliyun.com/1111/2019/group-buying-share?ptCode=48978F811F2376670B0FDDE3FB205EA6647C88CF896EF535&userCode=pu7fghvl&share_source=copy_link',
    src: imagePath + 'alicloud-1111.jpg',
    title: '云服务器86元/年，错过再等1年！',
    index: 0
  },
  // 2019 normal
  // carrousel: {
  //   url: links.common.aliyunWaf,
  //   src: imagePath + 'aliyun-banner-1190-420.jpg',
  //   title: '网站遇到恶意攻击怎么办？',
  //   index: 3
  // },
  aboutPage: {
    url: links.common.aliyunQWBK,
    src: imagePath + 'aliyun-ecs-1200-100.png',
  },
  asideSwiper: [
    {
      url: links.common.aliyunCPS,
      src: imagePath + 'aliyun-cps-532-178.jpg'
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
      url: links.common.aliyunHTTPS,
      src: imagePath + 'aliyun-https-532-178.jpg'
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
