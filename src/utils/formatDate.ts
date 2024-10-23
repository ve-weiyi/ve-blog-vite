export function formatDate(dateTimeString: number | string) {
  // 检查是否为字符串
  if (typeof dateTimeString === "string") {
    return dateTimeString
  }

  // 将数字转换为日期字符串
  // const date = new Date(dateTimeString);
  // return date.toLocaleDateString();

  // const dateTimeString = '2022-01-21T12:21:31+08:00'
  const dateTime = new Date(dateTimeString * 1000)

  const year = dateTime.getFullYear()
  const month = String(dateTime.getMonth() + 1).padStart(2, "0")
  const day = String(dateTime.getDate()).padStart(2, "0")
  const hours = String(dateTime.getHours()).padStart(2, "0")
  const minutes = String(dateTime.getMinutes()).padStart(2, "0")
  const seconds = String(dateTime.getSeconds()).padStart(2, "0")

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDateTime
}
