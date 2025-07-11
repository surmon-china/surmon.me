/**
 * @file Generate text to QRcode DataURL
 * @module transforms/qrcode
 * @author Surmon <https://github.com/surmon-china>
 */

import QRCode, { type QRCodeToDataURLOptions } from 'qrcode'

export const renderTextToQRCodeDataURL = (value: string, options?: QRCodeToDataURLOptions) => {
  return QRCode.toDataURL(value, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    width: 260,
    ...options
  })
}
