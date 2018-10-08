/**
 * @file 评论模块 UA、OS 解析器 / ES module
 * @author Surmon <surmon@foxmail.com>
 */

const match = (data, key) => data.match(eval(`/${key}/ig`))
const buildSpan = (span, icon, text) => `<span class="${span}"><i class="iconfont icon-${icon}"></i>${text}</span>`

export const uaParse = ua => {

	const getR1 = r => r[0].split('/')
	
	// todo1 -> icons 要更新和增加
	const defaultRule = buildSpan('ua_other', 'internet', '其它浏览器')
	const rules = [
		{
			reg: /MSIE\s([^\s|]+)/gi,
			template: r => buildSpan('ua_ie', 'internet', 'Internet Explorer' + r[0].replace('MSIE', '').split('.')[0])
		},
		{
			reg: /FireFox\/([^\s]+)/ig,
			template: r => buildSpan('ua_firefox', 'internet', 'Mozilla FireFox' + getR1(r)[1])
		},
		{
			reg: /Maxthon([\d]*)\/([^\s]+)/ig,
			template: r => buildSpan('ua_maxthon', 'internet', 'Maxthon')
		},
		{
			reg: /UBrowser([\d]*)\/([^\s]+)/ig,
			template: r => buildSpan('ua_ucweb', 'internet', 'UCBrowser' + getR1(r)[1])
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
			template: r => buildSpan('ua_qq', 'wechat', '微信' + getR1(r)[1].split('/')[0])
		},
		{
			reg: /QQBrowser\/([^\s]+)/ig,
			template: r => buildSpan('ua_qq', 'internet', 'QQ浏览器' + getR1(r)[1].split('/')[0])
		},
		{
			reg: /QQ\/([^\s]+)/ig,
			template: r => buildSpan('ua_qq', 'internet', 'QQ浏览器' + getR1(r)[1].split('/')[0])
		},
		{
			reg: /MiuiBrowser\/([^\s]+)/ig,
			template: r => buildSpan('ua_mi', 'internet', 'Miui浏览器' + getR1(r)[1].split('/')[0])
		},
		{
			reg: /Chrome([\d]*)\/([^\s]+)/ig,
			template: r => buildSpan('ua_chrome', 'internet', 'Chrome' + getR1(r)[1].split('.')[0])
		},
		{
			reg: /safari\/([^\s]+)/ig,
			template: r => buildSpan('ua_apple', 'internet', 'Apple Safari' + getR1(r)[1])
		},
		{
			reg: /Opera[\s|\/]([^\s]+)/ig,
			template: r => buildSpan('ua_opera', 'internet', 'Opera' + r[1])
		},
		{
			reg: /Trident\/7.0/gi,
			template: r => buildSpan('ua_ie', 'internet', 'Internet Explorer 11')
		}
	]

	const targetRule = rules.find(rule => {
		const match = ua.match(rule.reg)
		return match && match.length
	})

	const targetBrowser = targetRule ? targetRule.template(ua.match(targetRule.reg)) : defaultRule()

	console.log('targetBrowser', targetRule, targetBrowser)
	return targetBrowser
}

// os解析
export const osParse = oa => {

	let os = ''

	// todo2 -> 解析出错了，全是 other

	const matchWin = () => {
		switch (true) {
			case match(oa, 'nt 5.1'):
				os = buildSpan('os_xp', 'windows', 'Windows XP')
				break
			case match(oa, 'nt 6.1'):
				os = buildSpan('os_7', 'windows', 'Windows 7')
				break
			case match(oa, 'nt 6.2'):
				os = buildSpan('os_8', 'windows', 'Windows 8')
				break
			case match(oa, 'nt 6.3'):
				os = buildSpan('os_8_1', 'windows', 'Windows 8.1')
				break
			case match(oa, 'nt 10.0'):
				os = buildSpan('os_8_1', 'windows', 'Windows 10')
				break
			case match(oa, 'nt 6.0'):
				os = buildSpan('os_vista', 'windows', 'Windows Vista')
				break
			case match(oa, 'nt 5'):
				os = buildSpan('os_2000', 'windows', 'Windows 2000')
				break
			default:
				os = buildSpan('os_windows', 'windows', 'Windows')
		}
		}
	switch (true) {
    case match(oa, 'win'):
      os = matchWin()
      break;
		case match(oa, 'android'):
			os = buildSpan('os_android', 'android', 'Android')
      break;
		case match(oa, 'ubuntu'):
			os = buildSpan('os_ubuntu', 'ubuntu', 'Ubuntu')
			break
		case match(oa, 'linux'):
			os = buildSpan('os_linux', 'linux', 'Linux')
			break
		case match(oa, 'iphone'):
			os = buildSpan('os_mac', 'mac', 'iPhone OS')
			break
		case match(oa, 'mac'):
			os = buildSpan('os_mac', 'mac', 'Mac OS X')
			break
		case match(oa, 'unix'):
			os = buildSpan('os_unix', 'unix', 'Unix')
			break
		default:
			os = buildSpan('os_other', 'phone', 'Other')
		}

	return os
}
