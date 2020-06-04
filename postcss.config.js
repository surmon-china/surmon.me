var postcss = require('postcss')
module.exports = {
  plugins: [
    // postcss.plugin('postcss-append-text', function (opts) {
    //   console.log('------', opts)
    
    //   return function (css, result) {
    //   }
    // })
    // 'postcss-test-plugin'
    // function() {
    //   return function(root) {
    //     return ''
    //   }
    // })
  //   require('postcss-import')({
  //     resolve(id) {
  //       console.log('-----------id', id)
  //       return id
  //       // let alias = {
  //       //   "@": path.join(__dirname, 'src')
  //       // }
  //       // return alias[id] ? alias[id] : id;
  //     }
  //   })
  ]
  // plugins: {
    // 'postcss-import': {
    //   resolve(id, basedir, importOptions) {
    //     console.log('-----------id', id)
    //     return id
    //     // let alias = {
    //     //   "@": path.join(__dirname, 'src')
    //     // }
    //     // return alias[id] ? alias[id] : id;
    //   }
    // }
  // }
}