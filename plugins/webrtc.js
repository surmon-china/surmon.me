/**
 * @file SimpleWebRTC / ES module
 * @module plugins/wertc
 * @author Surmon <https://github.com/surmon-china>
 */

import { isBrowser } from '~/environment'

let SimpleWebRTC = null

if (isBrowser) {
  if (!window.__NUXT__.state.global.isMobile) {
    SimpleWebRTC = require('simplewebrtc')
    // https://github.com/andyet/SimpleWebRTC/blob/master/src/simplewebrtc.js#L327
    SimpleWebRTC.prototype.joinRoom = function (name, cb) {
      var self = this;
      this.roomName = name;
      this.connection.emit('join', name, function (err, roomDescription) {
        // console.log('join CB', err, roomDescription);
        if (err) {
          self.emit('error', err);
        } else {
          var id,
            client,
            type,
            peer;
          for (id in roomDescription.clients) {
            client = roomDescription.clients[id];
            for (type in client) {
              if (client[type]) {
                peer = self.webrtc.createPeer({
                  id: id,
                  type: type,
                  enableDataChannels: self.config.enableDataChannels && type !== 'screen',
                  receiveMedia: {
                    offerToReceiveAudio: type !== 'screen' && self.config.receiveMedia.offerToReceiveAudio ? 1 : 0,
                    offerToReceiveVideo: self.config.receiveMedia.offerToReceiveVideo
                  }
                });
                self.emit('createdPeer', peer);
                peer.start();
              }
            }
          }
        }
  
        if (cb) cb(err, roomDescription);
        self.emit('joinedRoom', name);
      });
    };
  }
}

export default SimpleWebRTC
