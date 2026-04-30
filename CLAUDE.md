# CLAUDE.md — 音響道 十二流派診断

## プロジェクト概要

GitHub Pages で配信する静的サイト。オーディオ愛好家が50問に答えることで12流派のどれに最も近いかを診断するエンタメWebアプリ。ビルドツール・フレームワーク不使用。HTML / CSS / ES Modules のみ。

## ファイル構成

```
index.html          タイトル・説明・クイズ・演出 の SPA
schools.html        流派一覧ページ
result/{id}.html    12流派の結果ページ（静的HTML・SEO対応）
css/style.css       全ページ共通スタイル
js/quiz.js          クイズロジック（質問データ・スコア算出・UI制御）
js/result.js        結果ページ描画（グラフ・ランキング・シェア）
js/i18n.js          翻訳ユーティリティ
js/schools.js       流派一覧ページ用
locales/ja.json     日本語UIテキスト
locales/en.json     将来用（空）
assets/images/schools/{id}ryu.jpg  流派掛け軸画像（12枚）
assets/images/ogp/{id}.png         OGP画像（12枚）
```

## 流派ID一覧

固定順（URLパラメータ・スコア配列の順序）：

| ID | 流派名 | よみ | 家元 |
|---|---|---|---|
| shinon | 真音流 | しんおんりゅう | 玄聴斎 |
| senon | 染音流 | せんおんりゅう | 艶調庵 |
| isho | 意匠流 | いしょうりゅう | 空間斎 |
| kaiin | 懐韻流 | かいいんりゅう | 追昔庵 |
| kido | 器道流 | きどうりゅう | 究器斎 |
| shuga | 蒐雅流 | しゅうがりゅう | 蔵音堂 |
| shusei | 修整流 | しゅうせいりゅう | 錬匠庵 |
| bensei | 便生流 | べんせいりゅう | 和用斎 |
| kodan | 交談流 | こうだんりゅう | 談機軒 |
| gagan | 雅玩流 | ががんりゅう | 弄彩堂 |
| jii | 示威流 | じいりゅう | 威響斎 |
| junrei | 巡礼流 | じゅんれいりゅう | 遍音子 |

## スコア算出アルゴリズム（quiz.js: calcResult）

各質問は `mainSchool` フィールドを持つ。Q49・Q50 は `mainSchool: null`（タイブレーク質問）。

**点数（score）** — 主質問4問だけで算出：
1. `coreRaw_s = Σ(answer × weight)`（mainSchool === s の質問のみ、null 回答を除外）
2. `coreMax_s = Σ(4 × weight)`（同上）
3. `coreScore_s = coreRaw_s / coreMax_s`（0〜1、分母0なら0）
4. `score_s = round(coreScore_s × 100)`　← 主質問4問満点で必ず100点

**確率（percentage）** — affinity を Softmax に入れる：
5. `auxScore_s = auxRaw_s / auxMax_s`（mainSchool が s でない質問を集計）
6. `affinity_s = clamp(coreScore_s + 0.25 × auxScore_s, 0, 1)`
7. **Softmax** 温度 `T = 0.12` で確率を算出（入力: affinity）
8. **最大剰余法** で合計が必ず100%に補正
9. 同率タイブレーク: percentage → coreScore → coreRaw → 固定順

詳細仕様は `dev/plan.md` 参照。

## URLパラメータ設計

### クイズ結果遷移

```
result/{mainId}.html?d=s1-p1,s2-p2,...,s12-p12&v={validCount}
```

- `d`: 固定流派順（上記ID順）で `score-percentage` をカンマ区切り（12要素）
- `v`: 有効回答数（null でない回答の数）
- `result.js` が `URLSearchParams` で解析し、グラフ・ランキングを描画

### 即診断開始

```
index.html?start=1
```

- タイトル画面をスキップし、説明画面（インストラクション）を直接表示
- sessionStorage の quiz_order を消去して新しいシャッフルを生成
- 診断結果ページの「もう一度診断する」「あなたも診断する」ボタンで使用

## 画面フロー（index.html）

```
screen-title（タイトル）
  → screen-intro（説明・インストラクション）  ← ?start=1 はここから
    → screen-quiz（質問 10問×5ページ）
      → screen-loading（演出 1.5秒）
        → result/{id}.html?d=...&v=...
```

- `showScreen(id)` でアクティブ画面を切り替え
- intro / quiz 表示中は `.video-section` を非表示
- 質問は Fisher-Yates シャッフル、順序を `sessionStorage['quiz_order']` に保存

## result/{id}.html の表示モード

| 条件 | 表示内容 |
|---|---|
| `?d=` あり（診断後） | グラフ・主副潜在サマリー・ランキング表・シェアボタン・再診断 |
| `?d=` なし（直接閲覧） | 流派画像・長文説明・「あなたも診断する」CTA のみ |

## デザイン原則

- 和紙・巻物テイスト。カラーパレットは `css/style.css` の `:root` 変数を参照
- フォント: Noto Serif JP（Google Fonts）
- 最大幅 540px、中央揃え、縦1カラム
- ルビは `<ruby>テキスト<rt>よみ</rt></ruby>` で付与（`rt` スタイルは style.css）
- `type="module"` を使用しているため、ローカルテストには HTTP サーバーが必要

## デプロイ先

`https://frieve-a.github.io/the-way-of-audio/`（GitHub: frieve-a / the-way-of-audio）

## 未完了タスク

- `locales/en.json` の英語翻訳（将来対応）
