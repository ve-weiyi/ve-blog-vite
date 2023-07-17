/* eslint-disable spaced-comment */
/// <reference types="vite/client" />

import { ConfigEnv, defineConfig, loadEnv } from "vite"
import { resolve } from "path"
import pkg from "./package.json"
import { envDir, sourceDir, manualChunks } from "./scripts/build"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import banner from "vite-plugin-banner"
import { createHtmlPlugin } from "vite-plugin-html"
import components from "unplugin-vue-components/vite"
import eslintPlugin from "vite-plugin-eslint"

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
}

/** 配置项文档：https://cn.vitejs.dev/config */
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, envDir)

  return {
    /**
     * 管理环境变量的配置文件存放目录
     */
    envDir,

    /**
     * 项目部署目录路径
     * @description 见项目根目录下的 `config` 文件夹说明
     */
    base: env.VITE_DEPLOY_BASE_URL,
    resolve: {
      /**
       * 配置目录别名
       * @see https://cn.vitejs.dev/config/shared-options.html#resolve-alias
       *
       * @example
       *  想从 `src/libs/foo` 文件里导入功能：
       *  配置 alias 前： `import foo from '../../../libs/foo'`
       *  配置 alias 后： `import foo from '@/libs/foo'`
       */
      alias,
      // 想要省略的扩展名列表。默认值为 ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue）
      // 设置后导入文件时不需要加后缀'.vue'
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    /**
     * 本地开发服务，也可以配置接口代理
     * @see https://cn.vitejs.dev/config/#server-proxy
     */
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 8888,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        // mock代理
        "/mock": {
          target: env.VITE_PROXY_DOMAIN_REAL,
          ws: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(path, env.VITE_PROXY_DOMAIN),
        },
        // 前缀
        "/api": {
          target: "http://127.0.0.1:9999/", // 代理后的地址 =target/path
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true,
          rewrite: (path) => path.replace("", ""),
        },
      },
    },

    /** 预定义常量 */
    define: {
      // https://vue-i18n.intlify.dev/guide/advanced/optimization.html#quasar-cli
      // 消除 vue-i18n 警告
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    build: {
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: "terser",
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"],
        },
        format: {
          /** 删除注释 */
          comments: false,
        },
      },
      /** 打包文件的输出目录,默认值为 dist */
      outDir: "dist",
      /** 打包后静态资源目录 */
      assetsDir: "static",
      path: "./",
      sourcemap: false,
      brotliSize: false,
      rollupOptions: {
        output: {
          /**
           * 如果要加密打包后的文件名，可以启用该项目
           *
           * @example
           *  1. 先安装 md5 依赖 `pnpm i -D @withtypes/md5`
           *  2. 导入本文件 `import md5 from '@withtypes/md5'`
           *  3. 将函数里的 `${name}` 修改为 `${md5(name)}`
           */
          // chunkFileNames: ({ name }) => {
          //   return `assets/${name}-[hash].js`
          // },
          // entryFileNames: ({ name }) => {
          //   return `assets/${name}-[hash].js`
          // },
          // assetFileNames: ({ name }) => {
          //   return `assets/${name}-[hash].[ext]`
          // },

          /**
           * 打包优化，避免全部打包到一个很大的 Chunk 里
           * @description 根据包名生成不同的 Chunk 文件，方便按需加载
           */
          manualChunks,
        },
      },
    },

    css: {
      /**
       * 包括 `vw` / `rem` 单位转换等
       * @see https://cn.vitejs.dev/config/shared-options.html#css-postcss
       *
       * @example
       *  以使用 `vw` 作为移动端适配为例：
       *  1. 先安装 postcss 依赖 `pnpm i -D postcss-px-to-viewport`
       *  2. 导入本文件 `import px2vw from 'postcss-px-to-viewport'`
       *  3. 取消下面函数的注释即可生效
       */
      // postcss: {
      //   plugins: [
      //     // 使用 postcss-pxtorem
      //     // px2rem({
      //     //   propList: ['*'],
      //     // }),
      //     // 使用 postcss-px-to-viewport
      //     // px2vw({
      //     //   viewportWidth: 375,
      //     //   minPixelValue: 1,
      //     // }),
      //   ],
      // },
    },

    plugins: [
      /**
       * 支持 `.vue` 文件的解析
       */
      vue(),

      /**
       * 如果需要支持 `.tsx` 组件，请安装 `@vitejs/plugin-vue-jsx` 这个包
       * 并在这里添加一个插件导入 `import vueJsx from '@vitejs/plugin-vue-jsx'`
       */
      vueJsx(),

      eslintPlugin({
        include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
      }),
      /**
       * 自动导入组件，不用每次都 import
       * @see https://github.com/antfu/unplugin-vue-components#configuration
       */
      components({
        dirs: ["src/components"],
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        globalNamespaces: [],
        extensions: ["vue", "ts", "tsx"],
        deep: true,
        dts: "./types/components.d.ts",
      }),

      /**
       * 版权注释
       * @see https://github.com/chengpeiquan/vite-plugin-banner#advanced-usage
       */
      banner(
        [
          `/**`,
          ` * name: ${pkg.name}`,
          ` * version: v${pkg.version}`,
          ` * description: ${pkg.description}`,
          ` * author: ${pkg.author}`,
          ` */`,
        ].join("\n")
      ),

      /**
       * 为入口文件增加 EJS 模版能力
       * @see https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
       */
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appTitle: env.VITE_APP_TITLE,
            appDesc: env.VITE_APP_DESC,
            appKeywords: env.VITE_APP_KEYWORDS,
          },
        },
      }),
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom",
    },
  }
})
