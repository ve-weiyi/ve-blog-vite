import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import progress from "@bassist/progress"
import routes from "./routes"
import { APP_NAME } from "@/constants"

progress.configure({ showSpinner: false })
progress.setColor("var(--c-brand)")

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY == "h5"
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition || { top: 0, left: 0 }
  },
})

router.beforeEach(() => {
  progress.start()
})

router.afterEach((to) => {
  const { title } = to.meta
  document.title = title ? `${title} - ${APP_NAME}` : APP_NAME
  progress.done()
})

export default router
