# 音響道 十二流派診断

**[アプリを開く](https://frieve-a.github.io/the-way-of-audio/)**

あなたのオーディオ道を50の問いで測る、エンタメ診断サイトです。  
12流派のどれに最も近いかを、Softmaxを用いた独自スコアリングで算出します。

**© 2026 Frieve — [MIT License](LICENSE)**

---

## 流派一覧

| ID | 流派名 | 家元 |
|---|---|---|
| shinon | 真音流 | 玄聴斎 |
| senon | 染音流 | 艶調庵 |
| isho | 意匠流 | 空間斎 |
| kaiin | 懐韻流 | 追昔庵 |
| kido | 器道流 | 究器斎 |
| shuga | 蒐雅流 | 蔵音堂 |
| shusei | 修整流 | 錬匠庵 |
| bensei | 便生流 | 和用斎 |
| kodan | 交談流 | 談機軒 |
| gagan | 雅玩流 | 弄彩堂 |
| jii | 示威流 | 威響斎 |
| junrei | 巡礼流 | 遍音子 |

---

## ファイル構成

```
thewayofaudio/
├── index.html          # クイズ SPA（タイトル・説明・50問・演出）
├── schools.html        # 流派一覧ページ
├── result/             # 各流派の結果ページ（12ファイル）
├── css/style.css       # 全ページ共通スタイル
├── js/
│   ├── quiz.js         # クイズロジック・スコア算出
│   ├── result.js       # 結果ページ描画
│   ├── schools.js      # 流派一覧ページ
│   └── i18n.js         # 翻訳ユーティリティ
├── locales/
│   ├── ja.json         # 日本語文字列
│   └── en.json         # 英語（将来用）
└── assets/images/
    ├── schools/        # 流派掛け軸画像（12枚）
    └── ogp/            # OGP用画像（12枚）
```

---

## ローカルテスト

JavaScript モジュール（`type="module"`）を使用しているため、**ファイルを直接ブラウザで開くと CORS エラーになります**。  
以下のいずれかの方法でローカルサーバーを立ち上げてください。

### Python（推奨・追加インストール不要）

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

起動後、ブラウザで `http://localhost:8080` を開く。

### Node.js

```bash
# npx を使う場合（インストール不要）
npx serve .

# または http-server
npx http-server . -p 8080
```

### VS Code

拡張機能 **Live Server**（Ritwick Dey）をインストールし、  
`index.html` を右クリック → "Open with Live Server"。

---

## デプロイ（GitHub Pages）

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/frieve-a/the-way-of-audio.git
git branch -M main
git push -u origin main
```

リポジトリの Settings → Pages → Source: `main` ブランチ / `/ (root)` に設定。  
配信 URL: `https://frieve-a.github.io/the-way-of-audio/`

---

## スコア算出アルゴリズム

1. **素点** `raw_s = Σ(answer × weight)`（null 回答を除外）
2. **正規化** `normalized_s = raw_s / max_s`（0〜1）
3. **表示点数** `score_s = round(normalized_s × 100)`
4. **Softmax** 温度 `T = 0.12` で12流派の確率を算出
5. **最大剰余法** で合計が必ず100%になるよう丸め補正
