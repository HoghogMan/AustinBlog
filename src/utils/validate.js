// export let pattern = {
//   articleContent: new RegExp('\\b<p>.*</p>\\b')
// }

// 截取文章内容
export function validateContent (content) {
  return content.match(/<p>.*?<\/p>/i)[0]
}
