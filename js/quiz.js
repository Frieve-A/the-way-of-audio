import { I18N } from './i18n.js'

const SCHOOL_IDS = ['shinon','senon','isho','kaiin','kido','shuga','shusei','bensei','kodan','gagan','jii','junrei']

const SCHOOL_NAMES = {
  shinon: '真音流', senon: '染音流', isho: '意匠流',  kaiin: '懐韻流',
  kido:   '器道流', shuga: '蒐雅流', shusei: '修整流', bensei: '便生流',
  kodan:  '交談流', gagan: '雅玩流', jii:   '示威流',  junrei: '巡礼流'
}

const QUESTIONS = [
  { id:1,  mainSchool:'shinon', text:'オーディオの第一目標は、録音・制作側の意図にできるだけ近づくことだと思う。', weights:{shinon:2} },
  { id:2,  mainSchool:'shinon', text:'測定値やブラインドテストは、音質評価にかなり重要だと思う。', weights:{shinon:2,kido:1} },
  { id:3,  mainSchool:'shinon', text:'まず癖の少ない再生系を作り、その後で好みに合わせるのが筋だと思う。', weights:{shinon:2,shusei:1} },
  { id:4,  mainSchool:'shinon', text:'機材固有の色付けより、周波数特性・歪み・ノイズ・指向性などの再現性を重視したい。', weights:{shinon:2} },
  { id:5,  mainSchool:'senon',  text:'正確さより、自分が気持ちよく聴ける音であることを優先したい。', weights:{senon:2} },
  { id:6,  mainSchool:'senon',  text:'低音の量感、高音の艶、音の厚みなどを自分好みに積極的に作り込みたい。', weights:{senon:2,shusei:1} },
  { id:7,  mainSchool:'senon',  text:'EQ、DSP、真空管、アナログ機材などで音色を変えることに魅力を感じる。', weights:{senon:2} },
  { id:8,  mainSchool:'senon',  text:'「これは自分の音だ」と言えるような個性ある再生環境に惹かれる。', weights:{senon:2,gagan:1} },
  { id:9,  mainSchool:'isho',   text:'オーディオ機器は、部屋に置いたときの見た目まで含めて選びたい。', weights:{isho:2,gagan:1} },
  { id:10, mainSchool:'isho',   text:'スピーカーやラックの配置、照明、家具との調和もリスニング体験の一部だと思う。', weights:{isho:2} },
  { id:11, mainSchool:'isho',   text:'音が良くても、デザインや質感が部屋に合わない機材は使いにくい。', weights:{isho:2} },
  { id:12, mainSchool:'isho',   text:'配線、設置、機材の見え方まで整っているシステムに美しさを感じる。', weights:{isho:2,jii:1} },
  { id:13, mainSchool:'kaiin',  text:'古い機材や媒体には、単なる性能差では語れない味わいがある。', weights:{kaiin:2} },
  { id:14, mainSchool:'kaiin',  text:'レコード、カセット、古いCDプレーヤーなどに時代の気配を感じる。', weights:{kaiin:2,shuga:1} },
  { id:15, mainSchool:'kaiin',  text:'昔聴いた音楽を、当時に近い機材や媒体で味わいたいと思う。', weights:{kaiin:2} },
  { id:16, mainSchool:'kaiin',  text:'多少の不便やノイズも、時代性や記憶と結びつけば魅力になる。', weights:{kaiin:2} },
  { id:17, mainSchool:'kido',   text:'音を聴く以上に、機器の方式・構造・回路・設計思想を知るのが楽しい。', weights:{kido:2} },
  { id:18, mainSchool:'kido',   text:'スピーカー、アンプ、DAC、カートリッジなどの方式差を理解したい。', weights:{kido:2} },
  { id:19, mainSchool:'kido',   text:'カタログ、仕様表、測定データ、分解記事、技術解説を読むのが好きだ。', weights:{kido:2,shinon:1} },
  { id:20, mainSchool:'kido',   text:'同じような音が出るとしても、どういう仕組みで鳴っているかが気になる。', weights:{kido:2} },
  { id:21, mainSchool:'shuga',  text:'名機、珍品、限定品、廃番品には強い魅力を感じる。', weights:{shuga:2} },
  { id:22, mainSchool:'shuga',  text:'機材の希少性、来歴、製造年代、所有履歴に惹かれる。', weights:{shuga:2,kaiin:1} },
  { id:23, mainSchool:'shuga',  text:'使う頻度が高くなくても、価値や来歴のある機材には所有する喜びを感じる。', weights:{shuga:2,gagan:1} },
  { id:24, mainSchool:'shuga',  text:'自分の所有機材が、ひとつのコレクションとして体系立っていると嬉しい。', weights:{shuga:2} },
  { id:25, mainSchool:'shusei', text:'買って終わりではなく、設置・補正・調整で追い込むところに楽しさがある。', weights:{shusei:2} },
  { id:26, mainSchool:'shusei', text:'EQ、ルーム補正、吸音、配置調整、測定などで音を詰めたい。', weights:{shusei:2,shinon:1} },
  { id:27, mainSchool:'shusei', text:'既製品をそのまま使うより、自分の環境に合わせて仕上げたい。', weights:{shusei:2} },
  { id:28, mainSchool:'shusei', text:'修理、改造、自作、チューニングにもオーディオ趣味の本質があると思う。', weights:{shusei:2,kido:1} },
  { id:29, mainSchool:'bensei', text:'オーディオは特別な儀式ではなく、毎日の生活の中で自然に使えてこそ価値がある。', weights:{bensei:2} },
  { id:30, mainSchool:'bensei', text:'起動、接続、選曲、音量調整が面倒だと、どれだけ高音質でも使う頻度が下がる。', weights:{bensei:2} },
  { id:31, mainSchool:'bensei', text:'ストリーミング、ワイヤレス、マルチルーム、自動化などを積極的に取り入れたい。', weights:{bensei:2} },
  { id:32, mainSchool:'bensei', text:'最高音質より、無理なく毎日使える完成度の方が重要な場面も多いと思う。', weights:{bensei:2} },
  { id:33, mainSchool:'kodan',  text:'オーディオは一人で完結するより、人と語ることでさらに楽しくなる。', weights:{kodan:2} },
  { id:34, mainSchool:'kodan',  text:'機材や音源について、他人の意見や体験を聞くのが好きだ。', weights:{kodan:2} },
  { id:35, mainSchool:'kodan',  text:'レビュー、SNS、コメント欄、オフ会、試聴会での会話も趣味の一部だと思う。', weights:{kodan:2,junrei:1} },
  { id:36, mainSchool:'kodan',  text:'良い音や面白い機材に出会うと、誰かに共有したくなる。', weights:{kodan:2} },
  { id:37, mainSchool:'gagan',  text:'オーディオ機器は、眺める・触れる・所有するだけでも満足感がある。', weights:{gagan:2} },
  { id:38, mainSchool:'gagan',  text:'ノブ、スイッチ、メーター、筐体、重量感などの物理的な手触りに惹かれる。', weights:{gagan:2,isho:1} },
  { id:39, mainSchool:'gagan',  text:'音を出していないときでも、機材がそこにあるだけで嬉しい。', weights:{gagan:2} },
  { id:40, mainSchool:'gagan',  text:'機材を磨く、並べる、写真を撮る、眺めるといった行為にも楽しさがある。', weights:{gagan:2,shuga:1} },
  { id:41, mainSchool:'jii',    text:'自分のシステムには、見た人に「これは相当こだわっている」と伝わる完成度がほしい。', weights:{jii:2,isho:1} },
  { id:42, mainSchool:'jii',    text:'良い機材を所有することには、自分の審美眼や到達点を形にする意味がある。', weights:{jii:2,gagan:1} },
  { id:43, mainSchool:'jii',    text:'人に聴かせたとき、音やシステムの完成度に驚いてもらえると嬉しい。', weights:{jii:2,kodan:1} },
  { id:44, mainSchool:'jii',    text:'予算をかけた部分や選び抜いた部分は、できれば分かる人には伝わってほしい。', weights:{jii:2,shuga:1} },
  { id:45, mainSchool:'junrei', text:'名店、専門店、ショールームなどでいろいろなシステムを聴くのが好きだ。', weights:{junrei:2} },
  { id:46, mainSchool:'junrei', text:'試聴会、イベント、展示会などに足を運ぶことに魅力を感じる。', weights:{junrei:2,kodan:1} },
  { id:47, mainSchool:'junrei', text:'中古店やリサイクル店で、思わぬ機材と出会うのが楽しい。', weights:{junrei:2,shuga:1} },
  { id:48, mainSchool:'junrei', text:'他人の家や別環境で鳴る音を聴くと、自分の基準が広がると思う。', weights:{junrei:2,kodan:1} },
  { id:49, mainSchool:null,     text:'自宅のシステムだけでなく、外で未知の音や環境に触れることにも強い魅力を感じる。', weights:{junrei:2,kodan:1} },
  { id:50, mainSchool:null,     text:'限られた予算があるなら、新しい機材を増やすより、今ある環境の完成度を上げたい。', weights:{shusei:2,shinon:1} }
]

const ANSWER_LABELS = [null, 0, 1, 2, 3, 4]

// --- State ---
let shuffledOrder = []
let answers = {}   // questionId -> value (0-4 or null)
let currentPage = 0  // 0-4

function shuffleQuestions() {
  const key = 'quiz_order'
  const saved = sessionStorage.getItem(key)
  if (saved) return JSON.parse(saved)
  const order = [...Array(QUESTIONS.length).keys()]
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]]
  }
  sessionStorage.setItem(key, JSON.stringify(order))
  return order
}

function getPageQuestions(page) {
  return shuffledOrder.slice(page * 10, page * 10 + 10).map(i => QUESTIONS[i])
}

function countAnswered() {
  return Object.keys(answers).filter(id => answers[id] !== undefined).length
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById(id).classList.add('active')
  const hideVideo = id === 'screen-intro' || id === 'screen-quiz' || id === 'screen-loading'
  document.querySelector('.video-section')?.classList.toggle('hidden', hideVideo)
  document.querySelectorAll('.title-only-img').forEach(el => el.classList.toggle('hidden', id !== 'screen-title'))
}

function toKanji(n) {
  const kanji = ['一','二','三','四','五','六','七','八','九','十']
  return n <= 10 ? kanji[n - 1] : n
}

function renderQuizPage(page) {
  currentPage = page
  const qs = getPageQuestions(page)
  const container = document.getElementById('questions-container')
  container.innerHTML = ''

  // header
  document.getElementById('page-label').textContent =
    I18N.t('quiz_page_label', { n: toKanji(page + 1) })
  document.getElementById('progress-fill').style.width = `${((page + 1) / 5) * 100}%`
  document.getElementById('answered-count').textContent =
    I18N.t('quiz_answered', { count: countAnswered() })

  // questions
  const answerKeys = ['answer_4','answer_3','answer_2','answer_1','answer_0','answer_null']
  const answerValues = [4, 3, 2, 1, 0, null]

  qs.forEach((q, qi) => {
    const globalIndex = page * 10 + qi + 1
    const card = document.createElement('div')
    card.className = 'question-card'
    card.dataset.qid = q.id

    const numEl = document.createElement('div')
    numEl.className = 'question-number'
    numEl.textContent = `問${toKanji(globalIndex)}`

    const textEl = document.createElement('div')
    textEl.className = 'question-text'
    textEl.textContent = q.text

    const optionsEl = document.createElement('div')
    optionsEl.className = 'answer-options'

    answerKeys.forEach((key, ai) => {
      const val = answerValues[ai]
      const label = document.createElement('label')
      label.className = 'answer-option' + (val === null ? ' answer-null' : '')
      if (answers[q.id] === val || (val === null && answers[q.id] === null)) {
        label.classList.add('selected')
      }

      const radio = document.createElement('input')
      radio.type = 'radio'
      radio.name = `q${q.id}`
      radio.value = val === null ? 'null' : val
      radio.checked = answers[q.id] === val || (val === null && answers[q.id] === null)

      const span = document.createElement('span')
      span.textContent = I18N.t(key)

      label.appendChild(radio)
      label.appendChild(span)

      label.addEventListener('click', () => {
        answers[q.id] = val
        card.classList.remove('unanswered')
        optionsEl.querySelectorAll('.answer-option').forEach(l => l.classList.remove('selected'))
        label.classList.add('selected')
        radio.checked = true
        document.getElementById('answered-count').textContent =
          I18N.t('quiz_answered', { count: countAnswered() })
      })

      optionsEl.appendChild(label)
    })

    card.appendChild(numEl)
    card.appendChild(textEl)
    card.appendChild(optionsEl)
    container.appendChild(card)
  })

  // nav buttons
  document.getElementById('btn-prev').classList.toggle('hidden', page === 0)
  const isLast = page === 4
  document.getElementById('btn-next').textContent = isLast ? I18N.t('quiz_finish') : I18N.t('quiz_next')

  window.scrollTo(0, 0)
}

function validatePage() {
  const qs = getPageQuestions(currentPage)
  let valid = true
  qs.forEach(q => {
    const card = document.querySelector(`.question-card[data-qid="${q.id}"]`)
    if (answers[q.id] === undefined) {
      card.classList.add('unanswered')
      valid = false
    }
  })
  return valid
}

// --- スコア算出 ---
function calcResult() {
  const coreRaw = {}, coreMax = {}, auxRaw = {}, auxMax = {}
  SCHOOL_IDS.forEach(id => { coreRaw[id] = 0; coreMax[id] = 0; auxRaw[id] = 0; auxMax[id] = 0 })

  QUESTIONS.forEach(q => {
    const ans = answers[q.id]
    if (ans === undefined || ans === null) return
    for (const [school, w] of Object.entries(q.weights)) {
      if (q.mainSchool === school) {
        coreRaw[school] += ans * w
        coreMax[school] += 4 * w
      } else {
        auxRaw[school] += ans * w
        auxMax[school] += 4 * w
      }
    }
  })

  const AUX_FACTOR = 0.25
  const T = 0.12
  const coreScore = {}, auxScore = {}, affinity = {}, score = {}

  SCHOOL_IDS.forEach(id => {
    coreScore[id] = coreMax[id] === 0 ? 0 : coreRaw[id] / coreMax[id]
    auxScore[id]  = auxMax[id]  === 0 ? 0 : auxRaw[id]  / auxMax[id]
    score[id]     = Math.round(coreScore[id] * 100)
    affinity[id]  = Math.min(1, Math.max(0, coreScore[id] + AUX_FACTOR * auxScore[id]))
  })

  const expVals = {}
  let expSum = 0
  SCHOOL_IDS.forEach(id => {
    expVals[id] = Math.exp(affinity[id] / T)
    expSum += expVals[id]
  })

  const rawPct = {}
  SCHOOL_IDS.forEach(id => { rawPct[id] = expVals[id] / expSum * 100 })

  const percentages = largestRemainderRound(rawPct)

  const ranked = SCHOOL_IDS
    .map(id => ({ id, name: SCHOOL_NAMES[id], score: score[id], percentage: percentages[id], coreScore: coreScore[id], coreRaw: coreRaw[id] }))
    .sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage
      if (b.coreScore !== a.coreScore) return b.coreScore - a.coreScore
      if (b.coreRaw !== a.coreRaw) return b.coreRaw - a.coreRaw
      return SCHOOL_IDS.indexOf(a.id) - SCHOOL_IDS.indexOf(b.id)
    })

  const validCount = Object.values(answers).filter(v => v !== null && v !== undefined).length

  return { ranked, main: ranked[0], sub: ranked[1], latent: ranked[2], validCount }
}

function largestRemainderRound(rawPct) {
  const result = {}
  const fractions = []
  let totalFloor = 0
  for (const [id, val] of Object.entries(rawPct)) {
    const floored = Math.floor(val)
    result[id] = floored
    totalFloor += floored
    fractions.push({ id, frac: val - floored })
  }
  let remaining = 100 - totalFloor
  fractions.sort((a, b) => b.frac - a.frac)
  for (let i = 0; i < remaining; i++) {
    result[fractions[i].id]++
  }
  return result
}

function buildResultURL(result) {
  const data = SCHOOL_IDS.map(id => {
    const r = result.ranked.find(r => r.id === id)
    return `${r.score}-${r.percentage}`
  }).join(',')
  return `result/${result.main.id}.html?d=${data}&v=${result.validCount}`
}

// --- 演出 & 遷移 ---
function showLoading(resultURL) {
  window.scrollTo(0, 0)
  showScreen('screen-loading')
  setTimeout(() => {
    window.location.href = resultURL
  }, 1500)
}

// --- イベント登録 ---
async function init() {
  await I18N.load()
  I18N.applyAll()

  const startNow = new URLSearchParams(location.search).get('start') === '1'
  if (startNow) sessionStorage.removeItem('quiz_order')
  shuffledOrder = shuffleQuestions()

  if (startNow) {
    showScreen('screen-intro')
  } else {
    showScreen('screen-title')
  }

  window.addEventListener('beforeunload', e => {
    if (document.getElementById('screen-quiz').classList.contains('active')) {
      gtag('event', 'quiz_abandon', {
        quiz_page: currentPage + 1,
        answered_count: countAnswered(),
        transport_type: 'beacon'
      })
      e.preventDefault()
      e.returnValue = ''
    }
  })

  document.querySelector('.app-title').addEventListener('click', () => {
    if (document.getElementById('screen-quiz').classList.contains('active')) {
      if (!confirm('入力内容が失われます。トップページに戻りますか？')) return
    }
    answers = {}
    sessionStorage.removeItem('quiz_order')
    shuffledOrder = shuffleQuestions()
    showScreen('screen-title')
  })

  document.getElementById('btn-start').addEventListener('click', () => showScreen('screen-intro'))
  document.getElementById('btn-schools').addEventListener('click', () => { window.location.href = 'schools.html' })
  document.getElementById('btn-begin').addEventListener('click', () => {
    renderQuizPage(0)
    showScreen('screen-quiz')
  })
  document.getElementById('btn-intro-back').addEventListener('click', () => showScreen('screen-title'))

  document.getElementById('btn-prev').addEventListener('click', () => {
    renderQuizPage(currentPage - 1)
  })

  document.getElementById('btn-next').addEventListener('click', () => {
    if (!validatePage()) {
      const first = document.querySelector('.question-card.unanswered')
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    if (currentPage === 4) {
      const result = calcResult()
      gtag('event', 'quiz_complete', { valid_count: result.validCount })
      const url = buildResultURL(result)
      showLoading(url)
    } else {
      renderQuizPage(currentPage + 1)
    }
  })
}

document.addEventListener('DOMContentLoaded', init)
