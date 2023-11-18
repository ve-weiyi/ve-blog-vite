import type { Plugin } from "vite"
import dayjs, { Dayjs } from "dayjs"
import duration from "dayjs/plugin/duration"
import * as fs from "fs"
import * as path from "path"
import { green, blue, bold } from "picocolors"
dayjs.extend(duration)

export function viteBuildInfo(): Plugin {
  let config: { command: string }
  let startTime: Dayjs
  let endTime: Dayjs
  let outDir: string
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig
      outDir = resolvedConfig.build?.outDir ?? "dist"
    },
    buildStart() {
      console.log(
        bold(
          green(
            `👏欢迎使用${blue(
              "[ve-blog-vite]"
            )}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/ve-weiyi/ve-blog-vite`
          )
        )
      )
      if (config.command === "build") {
        startTime = dayjs(new Date())
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date())
        getDirectorySize(outDir).then((size) => {
          console.log(
            bold(
              green(
                `🎉恭喜打包完成（总用时${dayjs
                  .duration(endTime.diff(startTime))
                  .format("mm分ss秒SSS毫秒")}，打包后的大小为${size}）`
              )
            )
          )
        })
      }
    },
  }
}

async function getDirectorySize(directoryPath: string): Promise<string> {
  let totalSize = 0

  async function calculateSize(filePath: string): Promise<void> {
    const stats = await fs.promises.stat(filePath)

    if (stats.isFile()) {
      totalSize += stats.size
    } else if (stats.isDirectory()) {
      const files = await fs.promises.readdir(filePath)
      await Promise.all(files.map((file) => calculateSize(path.join(filePath, file))))
    }
  }

  await calculateSize(directoryPath)

  return `${(totalSize / 1024 / 1024).toFixed(2)}MB`
}
