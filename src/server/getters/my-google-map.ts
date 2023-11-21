/**
 * @file BFF google map getter
 * @module server.getter.my-google-map
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { XMLParser } from 'fast-xml-parser'
import { VALUABLE_LINKS } from '@/config/app.config'

export const getMyGoogleMap = () => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '@'
  })

  return axios
    .get<any>(VALUABLE_LINKS.GOOGLE_MY_MAP_KML, { timeout: 6000 })
    .then((response) => parser.parse(response.data).kml.Document)
}
