import vue3PhotoPreview from "vue3-photo-preview"
import "vue3-photo-preview/dist/index.css"
import { App } from "vue"

export function usePhotoPreview(app: App) {
  app.use(vue3PhotoPreview)
}
