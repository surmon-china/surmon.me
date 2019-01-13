/**
 * @file 评论模块 UA、OS 解析器 / ES module
 * @module utils/browser-os-parse
 * @author Surmon <https://github.com/surmon-china>
 */

const matchUa = (data, key) => data.match(eval(`/${key}/ig`))
const buildSpan = (span, icon, text) => `<span class="${span}"><i class="iconfont icon-${icon}"></i>${text}</span>`

// 浏览器解析
export const browserParse = ua => {

  const getR1 = r => r[0].split('/')
  const defaultRule = () => buildSpan('ua_other', 'internet', '其它浏览器')

  const rules = [
    {
      reg: /MSIE\s([^\s|]+)/gi,
      template: r => buildSpan('ua_ie', 'ie', 'Internet Explorer | ' + r[0].replace('MSIE', '').split('.')[0])
    },
    {
      reg: /FireFox\/([^\s]+)/ig,
      template: r => buildSpan('ua_firefox', 'firefox', 'Mozilla FireFox | ' + getR1(r)[1])
    },
    {
      reg: /Maxthon([\d]*)\/([^\s]+)/ig,
      template: r => buildSpan('ua_maxthon', 'maxthon', 'Maxthon')
    },
    {
      reg: /UBrowser([\d]*)\/([^\s]+)/ig,
      template: r => buildSpan('ua_ucweb', 'uc', 'UCBrowser | ' + getR1(r)[1])
    },
    {
      reg: /MetaSr/ig,
      template: r => buildSpan('ua_sogou', 'internet', '搜狗浏览器')
    },
    {
      reg: /2345Explorer/ig,
      template: r => buildSpan('ua_2345explorer', 'internet', '2345王牌浏览器')
    },
    {
      reg: /2345chrome/ig,
      template: r => buildSpan('ua_2345chrome', 'internet', '2345加速浏览器')
    },
    {
      reg: /LBBROWSER/ig,
      template: r => buildSpan('ua_lbbrowser', 'internet', '猎豹安全浏览器')
    },
    {
      reg: /MicroMessenger\/([^\s]+)/ig,
      template: r => buildSpan('ua_qq', 'wechat', '微信 | ' + getR1(r)[1].split('/')[0])
    },
    {
      reg: /QQBrowser\/([^\s]+)/ig,
      template: r => buildSpan('ua_qq', 'internet', 'QQ浏览器 | ' + getR1(r)[1].split('/')[0])
    },
    {
      reg: /QQ\/([^\s]+)/ig,
      template: r => buildSpan('ua_qq', 'internet', 'QQ浏览器 | ' + getR1(r)[1].split('/')[0])
    },
    {
      reg: /MiuiBrowser\/([^\s]+)/ig,
      template: r => buildSpan('ua_mi', 'internet', 'Miui浏览器 | ' + getR1(r)[1].split('/')[0])
    },
    {
      reg: /Chrome([\d]*)\/([^\s]+)/ig,
      template: r => buildSpan('ua_chrome', 'chrome', 'Chrome | ' + getR1(r)[1].split('.')[0])
    },
    {
      reg: /safari\/([^\s]+)/ig,
      template: r => buildSpan('ua_apple', 'safari', 'Apple Safari | ' + getR1(r)[1])
    },
    {
      reg: /Opera[\s|\/]([^\s]+)/ig,
      template: r => buildSpan('ua_opera', 'opera', 'Opera | ' + r[1])
    },
    {
      reg: /Trident\/7.0/gi,
      template: r => buildSpan('ua_ie', 'edge', 'Internet Explorer 11')
    }
  ]

  const targetRule = rules.find(rule => {
    const matched = ua.match(rule.reg)
    return matched && matched.length
  })

  return targetRule ? targetRule.template(ua.match(targetRule.reg)) : defaultRule()
}

// OS 解析
export const osParse = ua => {

  const defaultRule = () => buildSpan('os_other', 'phone', 'Other')
  const matchWin = () => {
    if (matchUa(ua, 'nt 5.1')) {
      return buildSpan('os_xp', 'windows', 'Windows XP')
    } else if (matchUa(ua, 'nt 6.1')) {
      return buildSpan('os_7', 'windows', 'Windows 7')
    } else if (matchUa(ua, 'nt 6.2')) {
      return buildSpan('os_8', 'windows', 'Windows 8')
    } else if (matchUa(ua, 'nt 6.3')) {
      return buildSpan('os_8_1', 'windows', 'Windows 8.1')
    } else if (matchUa(ua, 'nt 10.0')) {
      return buildSpan('os_8_1', 'windows', 'Windows 10')
    } else if (matchUa(ua, 'nt 6.0')) {
      return buildSpan('os_vista', 'windows', 'Windows Vista')
    } else if (matchUa(ua, 'nt 5')) {
      return buildSpan('os_2000', 'windows', 'Windows 2000')
    } else {
      return buildSpan('os_windows', 'windows', 'Windows')
    }
  }
  
  const rules = [
    {
      key: 'win',
      template: () => matchWin()
    },
    {  
      key: 'android',
      template: () => buildSpan('os_android', 'android', 'Android')
    },
    {  
      key: 'ubuntu',
      template: () => buildSpan('os_ubuntu', 'ubuntu', 'Ubuntu')
    },
    {  
      key: 'linux',
      template: () => buildSpan('os_linux', 'linux', 'Linux')
    },
    {  
      key: 'iphone',
      template: () => buildSpan('os_mac', 'mac', 'iPhone OS')
    },
    {  
      key: 'mac',
      template: () => buildSpan('os_mac', 'mac', 'Mac OS X')
    },
    {  
      key: 'unix',
      template: () => buildSpan('os_unix', 'unix', 'Unix')
    }
  ]

  const targetRule = rules.find(rule => {
    const matched = matchUa(ua, rule.key)
    return matched && matched.length
  })

  return targetRule ? targetRule.template() : defaultRule()
}
