import { I18N } from './i18n.js'
import './footer.js'

const SCHOOL_IDS = ['shinon','senon','isho','kaiin','kido','shuga','shusei','bensei','kodan','gagan','jii','junrei']

const SCHOOL_NAMES = {
  shinon: '真音流', senon: '染音流', isho: '意匠流',  kaiin: '懐韻流',
  kido:   '器道流', shuga: '蒐雅流', shusei: '修整流', bensei: '便生流',
  kodan:  '交談流', gagan: '雅玩流', jii:   '示威流',  junrei: '巡礼流'
}

const SCHOOL_SHORT = {
  shinon: '真音', senon: '染音', isho: '意匠',  kaiin: '懐韻',
  kido:   '器道', shuga: '蒐雅', shusei: '修整', bensei: '便生',
  kodan:  '交談', gagan: '雅玩', jii:   '示威',  junrei: '巡礼'
}

const SCHOOL_READINGS = {
  shinon: 'しんおんりゅう', senon: 'せんおんりゅう', isho: 'いしょうりゅう',  kaiin: 'かいいんりゅう',
  kido:   'きどうりゅう',   shuga: 'しゅうがりゅう', shusei: 'しゅうせいりゅう', bensei: 'べんせいりゅう',
  kodan:  'こうだんりゅう', gagan: 'ががんりゅう',   jii:   'じいりゅう',     junrei: 'じゅんれいりゅう'
}

function ruby(name, id) {
  return `<ruby>${name}<rt>${SCHOOL_READINGS[id]}</rt></ruby>`
}

function parseResultData() {
  const params = new URLSearchParams(location.search)
  const d = params.get('d')
  const v = params.get('v')
  if (!d) return null
  const pairs = d.split(',')
  if (pairs.length !== 12) return null
  const ranked = pairs.map((pair, i) => {
    const [score, percentage] = pair.split('-').map(Number)
    return { id: SCHOOL_IDS[i], name: SCHOOL_NAMES[SCHOOL_IDS[i]], score, percentage }
  })
  ranked.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage
    if (b.score !== a.score) return b.score - a.score
    return SCHOOL_IDS.indexOf(a.id) - SCHOOL_IDS.indexOf(b.id)
  })
  return { ranked, validCount: v ? parseInt(v, 10) : null }
}

function renderBarChart(ranked, currentId) {
  const wrapper = document.getElementById('chart-section')
  const chartEl = document.getElementById('bar-chart')
  const labelsEl = document.getElementById('bar-x-labels')
  if (!chartEl) return

  const inFixedOrder = SCHOOL_IDS.map(id => ranked.find(r => r.id === id))
  const maxPct = Math.max(...inFixedOrder.map(r => r.percentage), 1)

  chartEl.innerHTML = ''
  if (labelsEl) labelsEl.innerHTML = ''

  inFixedOrder.forEach(school => {
    const isMain = school.id === currentId
    const barEl = document.createElement('div')
    barEl.className = 'bar-chart__bar' + (isMain ? ' bar-chart__bar--main' : '')

    const fillEl = document.createElement('div')
    fillEl.className = 'bar-chart__bar-fill'
    const pxHeight = Math.round((school.percentage / maxPct) * 180)
    fillEl.style.height = `${Math.max(pxHeight, 4)}px`

    const valEl = document.createElement('div')
    valEl.className = 'bar-chart__bar-value'
    valEl.textContent = `${school.percentage}%`

    barEl.appendChild(valEl)
    barEl.appendChild(fillEl)
    chartEl.appendChild(barEl)

    if (labelsEl) {
      const labelEl = document.createElement('div')
      labelEl.className = 'bar-chart__x-label'
      labelEl.textContent = SCHOOL_SHORT[school.id]
      labelsEl.appendChild(labelEl)
    }
  })
}

function renderRankSummary(ranked) {
  const mainEl = document.getElementById('main-school')
  const subEl  = document.getElementById('sub-school')
  const latEl  = document.getElementById('latent-school')
  if (!mainEl) return

  const labels = ['result_main', 'result_sub', 'result_latent']
  const targets = [mainEl, subEl, latEl]
  ranked.slice(0, 3).forEach((r, i) => {
    targets[i].innerHTML =
      `<span class="rank-summary__label">${I18N.t(labels[i])}</span>` +
      `<span class="rank-summary__value"><a href="${r.id}.html" class="rank-link">${ruby(r.name, r.id)}</a><span class="rank-summary__pct">${r.percentage}%</span></span>`
  })
}

function renderRanking(ranked, currentId) {
  const table = document.getElementById('ranking-table')
  if (!table) return

  const thead = document.createElement('thead')
  thead.innerHTML = `<tr>
    <th>${I18N.t('result_ranking_th_school')}</th>
    <th>${I18N.t('result_ranking_th_score')}</th>
    <th>${I18N.t('result_ranking_th_pct')}</th>
    <th style="width:120px"></th>
  </tr>`
  table.appendChild(thead)

  const tbody = document.createElement('tbody')
  ranked.forEach(r => {
    const tr = document.createElement('tr')
    if (r.id === currentId) tr.className = 'current'
    tr.innerHTML = `<td><a href="${r.id}.html" class="rank-link">${ruby(r.name, r.id)}</a></td>
      <td>${r.score}点</td>
      <td>${r.percentage}%</td>
      <td><div class="ranking-bar"><div class="ranking-bar__fill" style="width:${r.percentage * 1.5}px"></div></div></td>`
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)
}

function renderReliability(validCount) {
  if (validCount === null) return
  const el = document.getElementById('reliability-notice')
  if (!el) return
  if (validCount >= 40) { el.classList.add('hidden'); return }
  if (validCount >= 30) { el.textContent = I18N.t('reliability_low'); el.classList.remove('hidden'); return }
  el.textContent = I18N.t('reliability_very_low')
  el.classList.remove('hidden')
}

function initShareButton(currentId) {
  const url = `${location.origin}${location.pathname}${location.search}`
  const text = `私のオーディオ流派は「${SCHOOL_NAMES[currentId]}」でした。\n音響道 十二流派診断`

  const btnX = document.getElementById('btn-share-x')
  if (btnX) {
    btnX.href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    btnX.addEventListener('click', () => {
      gtag('event', 'share', { method: 'x', content_type: 'result', item_id: currentId })
    })
  }

  const btnFb = document.getElementById('btn-share-fb')
  if (btnFb) {
    btnFb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    btnFb.addEventListener('click', () => {
      gtag('event', 'share', { method: 'facebook', content_type: 'result', item_id: currentId })
    })
  }
}

async function init() {
  await I18N.load()
  I18N.applyAll()

  const currentId = document.body.dataset.schoolId
  const result = parseResultData()

  if (result) {
    document.getElementById('chart-section')?.classList.remove('hidden')
    document.getElementById('rank-summary')?.classList.remove('hidden')
    document.getElementById('ranking-section')?.classList.remove('hidden')
    document.getElementById('cta-section')?.classList.add('hidden')

    renderBarChart(result.ranked, currentId)
    renderRankSummary(result.ranked)
    renderRanking(result.ranked, currentId)
    renderReliability(result.validCount)
    initShareButton(currentId)
    gtag('event', 'result_view', { school_id: currentId, school_name: SCHOOL_NAMES[currentId] })
  } else {
    document.getElementById('chart-section')?.classList.add('hidden')
    document.getElementById('rank-summary')?.classList.add('hidden')
    document.getElementById('hr-top')?.classList.add('hidden')
    document.getElementById('ranking-section')?.classList.add('hidden')
    document.getElementById('hr-before-ranking')?.classList.add('hidden')
    document.getElementById('actions-section')?.classList.add('hidden')
    document.getElementById('cta-section')?.classList.remove('hidden')
  }
}

document.addEventListener('DOMContentLoaded', init)
