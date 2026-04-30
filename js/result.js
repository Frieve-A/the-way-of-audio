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

const SCHOOL_RECOMMENDED_SITES = {
  shinon: [
    {
      title: 'Frieve - AudioSpecs',
      description: 'スペックと測定結果からオーディオ機器を探し分析するサイト',
      url: 'https://audiospecs.frieve.com/'
    },
    {
      title: 'Frieve - Audio Review',
      description: 'オーディオ関連企業・製品のメタレビューサイト。科学的・論理的・合理的視点から、スペックと測定結果による音質と機能だけを基準に評価',
      url: 'https://audioreview.frieve.com/'
    }
  ],
  senon: [
    {
      title: 'Frieve - EffeTune',
      description: 'オーディオ愛好家のために設計されたリアルタイムオーディオエフェクトアプリ。オーディオソースを多様な高品質エフェクトで処理し、リスニング体験を自由にカスタマイズできます。',
      url: 'https://effetune.frieve.com/docs/i18n/ja/'
    }
  ],
  kodan: [
    {
      title: 'Frieve-A Music YouTubeチャンネル',
      description: 'オーディオに関する話題も多数取り扱うYouTubeチャンネル。オーディオ系動画のコメント欄はいつも、「ここは本当にYouTubeなのか？」と目を疑うほどの盛り上がりを見せる。',
      url: 'https://www.youtube.com/playlist?list=PLkKGQtDnTRCCNddYbkBYAmdRxP4l4XFWT'
    }
  ],
  shusei: [
    {
      title: 'Frieve - EffeTune',
      description: 'オーディオ愛好家のために設計されたリアルタイムオーディオエフェクトアプリ。マイクを用いた周波数特性の測定とルームEQ補正機能を提供。',
      url: 'https://effetune.frieve.com/docs/i18n/ja/'
    }
  ],
  kido: [
    {
      title: 'オーディオの終焉と再生（無料電子書籍版）',
      description: '現代オーディオ技術が物理的に「終わった」にもかかわらず、なぜ人々は「良い音」を求めて彷徨い続けるのかを、数理的・科学的に解明するベストセラー書籍',
      url: 'https://deuslibri.com/book/the-end-and-rebirth-of-audio/ja'
    },
    {
      title: 'オーディオの終焉と再生（紙書籍版）',
      description: '現代オーディオ技術が物理的に「終わった」にもかかわらず、なぜ人々は「良い音」を求めて彷徨い続けるのかを、数理的・科学的に解明するベストセラー書籍',
      url: 'https://www.amazon.co.jp/dp/B0GJ4M124M'
    }
  ]
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

function renderRecommendedSites(currentId) {
  const sites = SCHOOL_RECOMMENDED_SITES[currentId]
  if (!sites || sites.length === 0) return

  const section = document.createElement('section')
  section.className = 'recommended-sites'
  section.innerHTML =
    `<h2 class="section-title recommended-sites__heading">${SCHOOL_NAMES[currentId]}のあなたにおすすめのサイト</h2>` +
    `<ul class="recommended-sites__list">` +
    sites.map(s =>
      `<li class="recommended-sites__item">` +
        `<a class="recommended-sites__link" href="${s.url}" target="_blank" rel="noopener">` +
          `<span class="recommended-sites__title">${s.title}</span>` +
          `<span class="recommended-sites__desc">${s.description}</span>` +
        `</a>` +
      `</li>`
    ).join('') +
    `</ul>`

  const description = document.querySelector('.school-description')
  description?.insertAdjacentElement('afterend', section)
}

function renderSchoolNav(currentId) {
  const idx = SCHOOL_IDS.indexOf(currentId)
  const prevId = SCHOOL_IDS[(idx - 1 + SCHOOL_IDS.length) % SCHOOL_IDS.length]
  const nextId = SCHOOL_IDS[(idx + 1) % SCHOOL_IDS.length]

  const nav = document.createElement('section')
  nav.className = 'school-nav'
  nav.innerHTML =
    `<a href="${prevId}.html" class="btn btn--secondary school-nav__btn">` +
      `<span class="school-nav__dir">◀ 前の流派</span>` +
      `<span class="school-nav__name">${SCHOOL_NAMES[prevId]}</span>` +
    `</a>` +
    `<a href="${nextId}.html" class="btn btn--secondary school-nav__btn school-nav__btn--next">` +
      `<span class="school-nav__dir">次の流派 ▶</span>` +
      `<span class="school-nav__name">${SCHOOL_NAMES[nextId]}</span>` +
    `</a>`

  const ctaSection = document.getElementById('cta-section')
  ctaSection?.parentNode?.insertBefore(nav, ctaSection)
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
    renderRecommendedSites(currentId)
    gtag('event', 'result_view', { school_id: currentId, school_name: SCHOOL_NAMES[currentId] })
  } else {
    document.getElementById('chart-section')?.classList.add('hidden')
    document.getElementById('rank-summary')?.classList.add('hidden')
    document.getElementById('hr-top')?.classList.add('hidden')
    document.getElementById('ranking-section')?.classList.add('hidden')
    document.getElementById('hr-before-ranking')?.classList.add('hidden')
    document.getElementById('actions-section')?.classList.add('hidden')
    renderRecommendedSites(currentId)
    renderSchoolNav(currentId)
    document.getElementById('cta-section')?.classList.remove('hidden')
  }
}

document.addEventListener('DOMContentLoaded', init)
