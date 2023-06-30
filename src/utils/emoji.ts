import EmojiList from '@/assets/emojis/qq_emoji.json'

// 解析表情
export const replaceEmoji = (str: string) => {
  var reg = /\[.+?\]/g
  str = str.replace(reg, function(str) {
    console.log('str', str, EmojiList[str].active)
    return (
      "<img src= '" +
      getImage(EmojiList[str].active) +
      "' width='24'height='24' style='margin: 0 1px;vertical-align: text-bottom'/>"
    )
  })
  return str
}

const getImage = (localUrl) => {
  return new URL(`/src/assets/${localUrl}`, import.meta.url).href
}
