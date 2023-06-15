import MarkdownItMark from 'markdown-it-mark'
import MarkdownIt from 'markdown-it'
// 引入代码高亮样式
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
// 注册需要使用的语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('java', java)

export const markdownToHtml = (content: any) => {
  // 注册 JavaScript 语言的高亮规则
  hljs.registerLanguage('javascript', javascript)

  // 创建 MarkdownIt 实例，配置选项如下：
  const md = new MarkdownIt({
    html: true, // 允许解析 HTML 标签
    linkify: true, // 将链接文字转换为链接
    typographer: true, // 启用一些语言中立的替换和引号美化
    breaks: true, // 将换行符转换为 <br>
    highlight: function(str: string, lang: string | null) {
      // 生成唯一的代码索引
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now()
      }
      const codeIndex = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })

      // 生成复制按钮的 HTML
      let html = `<button class='copy-btn iconfont iconfuzhi' type='button' data-clipboard-action='copy' data-clipboard-target='#copy${codeIndex}'></button>`

      // 计算代码行数
      const linesLength = str.split(/\n/).length - 1
      let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
      for (let index = 0; index < linesLength; index++) {
        linesNum = linesNum + '<span></span>'
      }
      linesNum += '</span>'

      if (lang == null) {
        lang = 'java'
      }

      if (lang && hljs.getLanguage(lang)) {
        // 使用 highlight.js 进行代码高亮
        const preCode = hljs.highlightAuto(str).value
        html = html + preCode

        if (linesLength) {
          html += '<b class="name">' + lang + '</b>'
        }

        // 构建最终的 HTML 结构，并返回
        return `<pre class='hljs'><code>${html}</code>${linesNum}</pre><textarea style='position: absolute;top: -9999px;left: -9999px;z-index: -9999;' id='copy${codeIndex}'>${str.replace(
          /<\/textarea>/g,
          '</textarea>',
        )}</textarea>`
      }
    },
  }).use(MarkdownItMark)

  // 将 Markdown 内容转换为 HTML
  return md.render(content)
}
