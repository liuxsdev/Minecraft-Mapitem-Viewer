import { ElUpload, ElDialog, ElSelect, ElOption, ElButton, ElRow, ElCol } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app.use(ElUpload)
  app.use(ElDialog)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElButton)
  app.use(ElRow)
  app.use(ElCol)
}
