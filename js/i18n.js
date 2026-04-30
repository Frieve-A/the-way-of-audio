export const I18N = {
  _strings: {},
  _lang: 'ja',

  async load(lang = 'ja') {
    const depth = location.pathname.includes('/result/') ? '../' : './'
    const res = await fetch(`${depth}locales/${lang}.json`)
    this._strings = await res.json()
    this._lang = lang
  },

  t(key, vars = {}) {
    let str = this._strings[key] ?? key
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, v)
    }
    return str
  },

  applyAll(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n)
    })
  }
}
