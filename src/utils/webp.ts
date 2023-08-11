/**
 * @file WebP Checker
 * @module util.webp
 * @author Surmon <https://github.com/surmon-china>
 * @link https://developers.google.com/speed/webp/faq?hl=zh-cn
 */

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
export const checkWebPFeature = (feature: 'lossy' | 'lossless' | 'alpha' | 'animation', callback) => {
  const kTestImages = {
    lossy: `UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA`,
    lossless: `UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==`,
    alpha: `UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==`,
    animation: `UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA`
  }
  const img = new Image()
  img.onload = function () {
    const result = img.width > 0 && img.height > 0
    callback(feature, result)
  }
  img.onerror = function () {
    callback(feature, false)
  }
  img.src = 'data:image/webp;base64,' + kTestImages[feature]
}
