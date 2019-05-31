// highlight.js  代码高亮指令
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night.css'

var Hljs = function (el) {
  let blocks = el.querySelectorAll('pre.ql-syntax')
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]
    if (!block.isHljs) {
      let htmlArr = block.innerHTML.replace(/(<br\/>)|(<br>)/g, '\r\n').split('\r\n')
      let html = '<ol>'
      for (var j = 0; j < htmlArr.length; j++) {
        html += `<li>${htmlArr[j]}</li>`
      }
      html += '</ol>'
      block.innerHTML = html
      hljs.highlightBlock(block)
      block.isHljs = true
    }
  }
}

const install = function (Vue) {
  Vue.directive('highlight', Hljs)
}

if (window.Vue) {
  window.Hljs = Hljs
  Vue.use(install); // eslint-disable-line
}

Hljs.install = install
export default Hljs
