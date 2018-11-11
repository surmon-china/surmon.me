/**
 * @file WebRTC state / ES module
 * @module webrtc.state
 * @author Surmon <https://github.com/surmon-china>
 */

export const modes = {
  // 识别模式：1 原生模式、2 clmtrackr
  native: 1,
  clmtrackr: 2
}

export const states = {
  // Connecting to stream...
  checking: 1,
  // Connection established.
  connected: 2,
  completed: 2,
  // 远程媒体状态：Disconnected
  disconnected: 3,
  // Connection failed.
  failed: -1,
  // Connection closed.
  closed: 4
}
