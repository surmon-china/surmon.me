/**
 * @file Ads config / ES module
 * @module ad.config
 * @author Surmon <https://github.com/surmon-china>
 */

import apiConfig from '~/config/api.config'

const imagePath = apiConfig.CDN + '/images/mammon/'
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
    // 全民云计算（ECS）
    aliyunQWBK: 'https://s.click.taobao.com/fARq8yv'
  },
  pc: {
    // 淘宝（N）
    taobao: 'https://s.click.taobao.com/Y4HYGzv',
    // 天猫超市（N）
    tmailMarket: 'https://s.click.taobao.com/yHMYGzv',
    // 飞猪（N）
    alitrip: 'https://s.click.taobao.com/NVTYGzv',
    // 阿里云 云大使（官方活动页）
    aliyunActivity: 'https://www.aliyun.com/activity?source=5176.11533457&userCode=pu7fghvl#promotionArea',
    // 阿里云 云大使（领取优惠券固定）
    aliyunInvite: 'https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=pu7fghvl',
    // 阿里云 云大使（云上爆款）
    aliyunHotsale: 'https://www.aliyun.com/acts/hotsale?userCode=pu7fghvl',
    // 2019 1111
    holiday: 'https://s.click.taobao.com/O7xfvwv',
    holiday2: 'https://s.click.taobao.com/lTFevwv',
    holidayAliyun: 'https://www.aliyun.com/1111/2019/group-buying-share?ptCode=48978F811F2376670B0FDDE3FB205EA6647C88CF896EF535&userCode=pu7fghvl&share_source=copy_link',
    holidayAliyun2: 'https://www.aliyun.com/1111/2019/home?userCode=pu7fghvl'
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

// PC 端链接广告
export const pc = {
  nav: {
    taobao: links.pc.taobao,
    aliyun: links.pc.aliyunHotsale,
    holiday: links.pc.holiday,
  },
  /*
  carrousel: {
    index: 0,
    ...(Math.random() > 0.5 ? ({
      url: links.pc.holidayAliyun,
      src: imagePath + 'alicloud-1111-banner-group.jpg',
      title: '云服务器86元/年，错过再等1年'
    }) : ({
      url: links.pc.holidayAliyun2,
      src: imagePath + 'alicloud-1111-banner.jpg',
      title: '上云！超级钜惠'
    }))
  },
  carrousel: {
    index: 0,
    url: links.common.aliyunWaf,
    src: imagePath + 'aliyun-banner-1190-420.jpg',
    title: '网站遇到恶意攻击怎么办？'
  },
  */
  carrousel: {
    index: 0,
    url: links.pc.aliyunInvite,
    src: imagePath + 'alicloud-banner.jpg',
    title: '地球上第三好的云服务商托我把￥2000红包转交给你！'
  },
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
