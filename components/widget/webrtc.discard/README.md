
由于信令服务器过于复杂及 SimpleWebRTC 的停止维护及人脸识别的低效，等诸多问题，放弃 RTC 功能。

### 依赖
```json
{
  "simplewebrtc": "^3.0.2",
  "webrtc-adapter": "6.4.8",
}
```

### 前端
- RTC: [simplewebrtc](https://github.com/simplewebrtc/SimpleWebRTC)
- 人脸识别：
  + [clmtrackr.js](https://github.com/auduno/clmtrackr) 
  + [clmtrackr.min.js](https://raw.githubusercontent.com/auduno/clmtrackr/dev/build/clmtrackr.min.js)

### 服务端
```javascript
  const webrtcServer = require('../components/widget/webrtc/webrtc')
  // ...
  webrtcServer(io)
```
