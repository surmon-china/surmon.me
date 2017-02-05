import Vue from 'vue'
import Hljs from 'highlight.js'

Vue.directive('highlightjs', {
	inserted(element) {
		let blocks = element.querySelectorAll('pre');
  	Array.prototype.forEach.call(blocks, block => {
  		Hljs.highlightBlock(block)
  		block.setAttribute('lang', block.className.replace(/hljs/g, '').replace(' ', ''))
  	});
	}
})

export default Hljs