import { CustomElementConfig } from './'

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
}
