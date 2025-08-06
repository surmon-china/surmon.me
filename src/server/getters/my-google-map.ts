/**
 * @file BFF google map getter
 * @module server/getter/my-google-map
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { XMLParser } from 'fast-xml-parser'
import { VALUABLE_LINKS } from '@/configs/app.config'

export const getMyGoogleMap = () => {
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '@'
  })

  return axios
    .get<any>(VALUABLE_LINKS.GOOGLE_MY_MAP_KML_URL, { timeout: 8000 })
    .then((response) => xmlParser.parse(response.data).kml.Document)
}
