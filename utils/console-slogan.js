
export default () => {
	if (process.browser && process.env.NODE_ENV === 'production') {
		console.clear()
  	console.log("%cTalk is cheap. Show me the code %csurmon@foxmail.com", "color:#666;font-size:3em;","color:#666;font-size:13px;")
	}
}
