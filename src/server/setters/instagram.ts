/**
 * @file BFF instagram setter
 * @module server.setter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */

import fs from 'fs'
import { PUBLIC_PATH } from '../helper'

interface IFTTTInstagram {
  caption: string
  source_url: string
  url: string
  created_at: string
}

export const setInstagramMedias = async (payload: IFTTTInstagram) => {
  console.log('setInstagramMedias', typeof payload, payload)
}
