/**
 * @file Ads config / ES module
 * @module ad.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { getFileCDNUrl } from '~/transformers/url'

const imagePath = getFileCDNUrl('/images/mammon/')
const links = {
  // 阿里妈妈-淘宝
  // 淘宝（N）
  taobao: 'https://s.click.taobao.com/Y4HYGzv',
  // 天猫超市（N）
  tmailMarket: 'https://s.click.taobao.com/yHMYGzv',
  // 飞猪（N）
  alitrip: 'https://s.click.taobao.com/NVTYGzv',

  // 阿里妈妈-阿里云
  // ECS 服务器（N）
  aliyunECS: 'https://s.click.taobao.com/vyZYGzv',
  // 轻量应用服务器（N）
  aliyunCPS: 'https://s.click.taobao.com/BeUYGzv#guid-1132710',
  // Web 防火墙
  aliyunWaf: 'https://s.click.taobao.com/fZdv8yv',
  // HTTP 证书
  aliyunHTTPS: 'https://s.click.taobao.com/BW2v8yv',
  // 全民云计算（ECS）
  aliyunQWBK: 'https://s.click.taobao.com/fARq8yv',

  // 阿里云 云大使（官方活动页）
  aliyunActivity: 'https://www.aliyun.com/activity?source=5176.11533457&userCode=pu7fghvl#promotionArea',
  // 阿里云 云小站（领取优惠券固定）
  aliyunInvite: 'https://www.aliyun.com/minisite/goods?userCode=pu7fghvl',
  // 阿里云 云大使（云上爆款）
  aliyunHotsale: 'https://www.aliyun.com/acts/hotsale?userCode=pu7fghvl',

  // holiday
  // 2019 1111
  holiday: 'https://s.click.taobao.com/O7xfvwv',
  holiday2: 'https://s.click.taobao.com/lTFevwv',
  holidayAliyun: 'https://www.aliyun.com/1111/2019/group-buying-share?ptCode=48978F811F2376670B0FDDE3FB205EA6647C88CF896EF535&userCode=pu7fghvl&share_source=copy_link',
  holidayAliyun2: 'https://www.aliyun.com/1111/2019/home?userCode=pu7fghvl'
}

export default {
  // Banner 随机
  /*
  carrousel: {
    index: 0,
    ...(Math.random() > 0.5 ? ({
      url: links.holidayAliyun,
      src: imagePath + 'alicloud-1111-banner-group.jpg',
      title: '云服务器86元/年，错过再等1年'
    }) : ({
      url: links.holidayAliyun2,
      src: imagePath + 'alicloud-1111-banner.jpg',
      title: '上云！超级钜惠'
    }))
  },
  carrousel: {
    index: 0,
    url: links.aliyunWaf,
    src: imagePath + 'aliyun-banner-1190-420.jpg',
    title: '网站遇到恶意攻击怎么办？'
  },
  */

  // Banner 固定
  /*
  carrousel: {
    index: 0,
    url: links.aliyunInvite,
    src: imagePath + 'alicloud-banner.jpg',
    title: '地球上第三好的云服务商托我把￥2000红包转交给你！'
  },
  */

  // 导航栏
  nav: {
    taobao: links.taobao,
    aliyun: links.aliyunHotsale,
    // holiday: links.holiday,
  },

  // About 页面
  aboutPage: {
    url: links.aliyunInvite,
    src: imagePath + 'aliyun-ecs-1200-100.png',
  },

  // 侧边栏轮播
  asideSwiper: [
    {
      url: links.aliyunInvite,
      src: imagePath + 'aliyun-2020-532-178.jpg'
    },
    // {
    //   url: links.aliyunCPS,
    //   src: imagePath + 'aliyun-cps-532-178.jpg'
    // },
    {
      url: links.tmailMarket,
      src: imagePath + 'tmail-532-178.jpg'
    },
    {
      url: links.alitrip,
      src: imagePath + 'alitrip-532-178.jpg'
    },
    // {
    //   url: links.aliyunHTTPS,
    //   src: imagePath + 'aliyun-https-532-178.jpg'
    // },
    // {
    //   url: links.taobao,
    //   src: imagePath + 'taobao-532-178.jpg'
    // }
  ]
}
