export function formatDate (dateTimeString: string) {
  // const dateTimeString = '2022-01-21T12:21:31+08:00'
  const dateTime = new Date(dateTimeString)

  const year = dateTime.getFullYear()
  const month = String(dateTime.getMonth() + 1).padStart(2, "0")
  const day = String(dateTime.getDate()).padStart(2, "0")
  const hours = String(dateTime.getHours()).padStart(2, "0")
  const minutes = String(dateTime.getMinutes()).padStart(2, "0")
  const seconds = String(dateTime.getSeconds()).padStart(2, "0")

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDateTime
}
