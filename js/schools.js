import { I18N } from './i18n.js'
import './footer.js'

async function init() {
  await I18N.load()
  I18N.applyAll()
}

document.addEventListener('DOMContentLoaded', init)
