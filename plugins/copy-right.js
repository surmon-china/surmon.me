/*
** 只在生成模式的客户端中使用
*/

if (process.BROWSER_BUILD && process.env.NODE_ENV === 'production') {
 
  const copyText =  [ '',
                      '著作权归作者所有。',
                      '商业转载请联系作者获得授权，非商业转载请注明出处。',
                      '作者：Surmon',
                      '链接：' + location.href,
                      '来源：Surmon.me',
                      ''
                    ].join('</br>')

  // 拼接成html
  const buildText = content => {
    return content + copyText
  }

  // 拼接成html
  const buildHtml = content => {
    return content + copyText
  }

  document.addEventListener('copy', e => {
    if(!window.getSelection) return
    const content = window.getSelection().toString()
    e.clipboardData.setData('text/plain', buildText(content))
    e.clipboardData.setData('text/html', buildHtml(content))
    e.preventDefault()
  })
}
