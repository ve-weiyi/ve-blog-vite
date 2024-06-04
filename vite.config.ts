import { type ConfigEnv, loadEnv, type UserConfigExport } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import banner from "vite-plugin-banner"
import { createHtmlPlugin } from "vite-plugin-html"
// import autoImport from "unplugin-auto-import/vite"
import components from "unplugin-vue-components/vite"
import pkg from "./package.json"
import { viteBuildInfo } from "./build/info"

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
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, root)

  return {
    /**
     * 项目根目录（index.html 文件所在的位置）
     */
    root: root,
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
      alias: alias,
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
      // https: {},
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
          target: env.VITE_MOCK_PROXY_URL,
          ws: false,
          changeOrigin: true,
          rewrite: (path) => path.replace("", ""),
        },
        // 前缀
        "/api": {
          target: env.VITE_API_PROXY_URL, // 代理后的地址 =target/path
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

    /** 构建选项 */
    build: {
      /** 消除打包大小超过 2048kb 警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告.启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。*/
      reportCompressedSize: false,
      /** 打包文件的输出目录,默认值为 dist */
      outDir: env.VITE_BUILD_OUTPUT_DIR,
      /** 打包后静态资源目录 */
      assetsDir: "assets",
      sourcemap: false,
      rollupOptions: {
        input: {
          index: pathResolve("index.html"),
        },
        // 静态资源分类打包
        output: {
          /**
           * 如果要加密打包后的文件名，可以启用该项目
           *
           * @example
           *  1. 先安装 md5 依赖 `pnpm i -D @withtypes/md5`
           *  2. 导入本文件 `import md5 from '@withtypes/md5'`
           *  3. 将函数里的 `${name}` 修改为 `${md5(name)}`
           */
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
          },
        },
      },
      /** 客户端构建默认为 esbuild，SSR构建默认为 false */
      minify: "esbuild",
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      // minify: "terser",
      // terserOptions: {
      //   compress: {
      //     drop_console: false,
      //     drop_debugger: true,
      //     pure_funcs: ["console.log"],
      //   },
      //   format: {
      //     /** 删除注释 */
      //     comments: false,
      //   },
      // },
    },

    /** 混淆器 */
    esbuild: false,

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

      // eslintPlugin({
      //   include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
      //   emitWarning: false,
      // }),

      /**
       * 自动导入 API ，不用每次都 import
       *
       * @tips 如果直接使用没导入的 API 依然提示报错，请重启 VS Code
       *
       * @see https://github.com/antfu/unplugin-auto-import#configuration
       */
      // autoImport({
      //   imports: ["vue", "vue-router", "pinia"],
      //   dts: "types/auto-import.d.ts",
      //   eslintrc: {
      //     enabled: true,
      //     filepath: "./.eslintrc-auto-import.json",
      //     globalsPropValue: true,
      //   },
      // }),

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
      viteBuildInfo(),
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    // test: {
    //   include: ["tests/**/*.test.ts"],
    //   environment: "jsdom",
    // },
  }
}
