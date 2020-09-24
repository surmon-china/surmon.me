/**
 * @file Ads config
 * @module ad.config
 * @author Surmon <https://github.com/surmon-china>
 */

import API_CONFIG from './api.config'
import { VALUABLE_LINKS } from './app.config'

const getAdImageUrl = (url: string) => `${API_CONFIG.CDN}/images/mammon/${url}`

const AD_LINKS = {
  // 淘宝（N）
  TAOBAO: 'https://s.click.taobao.com/Y4HYGzv',
  // 天猫超市（N）
  TMAIL_MARKET: 'https://s.click.taobao.com/yHMYGzv',
  // 飞猪（N）
  ALI_TRIP: 'https://s.click.taobao.com/NVTYGzv',

  // ECS 服务器（N）
  ALIYUN_ECS: 'https://s.click.taobao.com/vyZYGzv',
  // 轻量应用服务器（N）
  ALIYUN_CPS: 'https://s.click.taobao.com/BeUYGzv#guid-1132710',
  // Web 防火墙
  ALIYUN_WAF: 'https://s.click.taobao.com/fZdv8yv',
  // HTTP 证书
  ALIYUN_HTTPS: 'https://s.click.taobao.com/BW2v8yv',
  // 全民云计算（ECS）
  ALIYUN_QWBK: 'https://s.click.taobao.com/fARq8yv',

  // 阿里云 云大使（官方活动页）
  ALIYUN_ACTIVITY: 'https://www.aliyun.com/activity?source=5176.11533457&userCode=pu7fghvl#promotionArea',
  // 阿里云 云小站（领取优惠券固定）
  ALIYUN_INVITE: 'https://www.aliyun.com/minisite/goods?userCode=pu7fghvl',
  // 阿里云 云大使（云上爆款）
  ALIYUN_HOT_SALE: 'https://www.aliyun.com/acts/hotsale?userCode=pu7fghvl',

  // holiday | 1111
  HOLIDAY: 'https://s.click.taobao.com/O7xfvwv',
  HOLIDAY_ALIYUN: 'https://www.aliyun.com/1111/2019/group-buying-share?ptCode=48978F811F2376670B0FDDE3FB205EA6647C88CF896EF535&userCode=pu7fghvl&share_source=copy_link',
  HOLIDAY_ALIYUN2: 'https://www.aliyun.com/1111/2019/home?userCode=pu7fghvl'
}

export const PC_CARROUSEL = false;
// export const PC_CARROUSEL = {
//   index: 0,
//   url: AD_LINKS.ALIYUN_WAF,
//   src: getAdImageUrl('aliyun-banner-1190-420.jpg'),
//   title: '网站遇到恶意攻击怎么办?'

  // Banner 固定
  // index: 0,
  // url: AD_LINKS.ALIYUN_INVITE,
  // src: getAdImageUrl('alicloud-banner.jpg'),
  // title: '地球上第三好的云服务商托我把￥2000红包转交给你！'

  // Banner 随机
  // index: 0,
  // ...(Math.random() > 0.5 ? ({
  //   url: AD_LINKS.HOLIDAY_ALIYUN,
  //   src: getAdImageUrl('alicloud-1111-banner-group.jpg'),
  //   title: '云服务器86元/年，错过再等1年'
  // }) : ({
  //   url: AD_LINKS.HOLIDAY_ALIYUN2,
  //   src: getAdImageUrl('alicloud-1111-banner.jpg'),
  //   title: '上云！超级钜惠'
  // }))
// }

export const PC_NAV = [
  {
    hot: true,
    icon: 'icon-aliyun',
    color: '#ff6a00',
    url: AD_LINKS.ALIYUN_INVITE,
    i18n: {
      en: 'Aliyun',
      zh: '云上爆款'
    }
  },
  {
    disabled: true,
    icon: 'icon-1111',
    color: '#ff5000',
    url: AD_LINKS.HOLIDAY,
    i18n: {
      en: 'Holiday',
      zh: '超级红包'
    }
  },
  {
    disabled: true,
    icon: 'icon-taobao',
    color: '#ff5000',
    url: AD_LINKS.TAOBAO,
    i18n: {
      en: 'Taobao',
      zh: '淘抢购'
    }
  },
  {
    disabled: true,
    icon: 'icon-debug',
    color: '#000',
    url: VALUABLE_LINKS.THROW_ERROR,
    text: 'TE.io'
  },
  {
    disabled: true,
    icon: 'icon-fox-colour',
    color: '#d15d26',
    url: VALUABLE_LINKS.FOX_FINDER,
    text: 'FF.io'
  }
]

export const PC_ABOUT_PAGE_SWIPER = [
  {
    url: AD_LINKS.ALIYUN_INVITE,
    src: getAdImageUrl('aliyun-ecs-1200-100.png'),
  }
]

export const PC_ASIDE_SWIPER =  [
  {
    url: AD_LINKS.ALIYUN_INVITE,
    src: getAdImageUrl('aliyun-2020-532-178.jpg')
  },
  // {
  //   url: AD_LINKS.ALIYUN_CPS,
  //   src: getAdImageUrl('aliyun-cps-532-178.jpg)'
  // },
  {
    url: AD_LINKS.TMAIL_MARKET,
    src: getAdImageUrl('tmail-532-178.jpg')
  },
  {
    url: AD_LINKS.ALI_TRIP,
    src: getAdImageUrl('alitrip-532-178.jpg')
  },
  // {
  //   url: AD_LINKS.ALIYUN_HTTPS,
  //   src: getAdImageUrl('aliyun-https-532-178.jpg)'
  // },
  // {
  //   url: AD_LINKS.taobao,
  //   src: getAdImageUrl('taobao-532-178.jpg)'
  // }
]
