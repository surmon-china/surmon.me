// import { BFF_TUNNEL_PREFIX } from '/@/config/bff.config'
// import { TunnelModule } from '/@/constants/tunnel'
import { CustomElementConfig } from './'

// https://zhuanlan.zhihu.com/p/349267844
// https://github.com/ecomfe/fontmin
// const VERSE_ZH_FONT_FAMILY = 'verse-zh-font'
// const VERSE_ZH_FONT_FILENAME = 'FZZJ-ZZGKT.ttf'

export const verseConfig: CustomElementConfig = {
  transform(html) {
    if (html.startsWith('<verse ')) {
      return html.replace('<verse ', '<p class="verse" ')
    }
    if (html.startsWith('</verse>')) {
      return html.replace('</verse>', '</p>')
    }
    return html
  }
  // new FontFace(...)
  // Since FontFace does not support the size-adjest parameter,
  // if you use JavaScript to manipulate the side effects,
  // you will need to manually maintain the lifecycle to add the global class name
  // MARK: No custom fonts for now
  /*
  style(element) {
    const nodes = Array.from(element.querySelectorAll<HTMLParagraphElement>('p.verse[zh]'))
    const string = nodes.map((node) => node.innerText).join('')
    const words = Array.from(new Set(string.split('')))
    if (!words.length) {
      return null
    }

    const textParams = encodeURIComponent(words.join(''))
    const fontnameParams = encodeURIComponent(VERSE_ZH_FONT_FILENAME)
    const url = `${BFF_TUNNEL_PREFIX}/${TunnelModule.WebFont}?fontname=${fontnameParams}&text=${textParams}`
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust
    // https://caniuse.com/?search=size-adjust
    return `
      @font-face {
        font-family: ${VERSE_ZH_FONT_FAMILY};
        font-weight: 700;
        font-display: swap;
        size-adjust: 136%;
        src: url('${url}');
      }
    `
  }
  */
}
