# 📢 官報RSSフィード & Webビューア

## 📌 概要
[官報公式サイト](https://www.kanpo.go.jp/index.html) にはRSSが提供されていなかったため、  
GitHub Actions を使って自動的に生成・公開するRSSフィードを用意しました。

✅ [官報チェックアクション](https://github.com/testkun08080/action-kanpo) を使って、  
毎日およそ8:35分に自動で更新を確認し、最新の官報情報を以下のRSSで配信します。

### 🌐 Webビューア
**[📱 官報RSS Viewer](https://testkun08080.github.io/kanpo-rss/)** - ブラウザで簡単に官報情報を閲覧

---

## 🔗 利用方法

以下のRSSフィードURLを、お好きなRSSリーダーに登録してください：

- 発行されたページ毎のRSS(簡易版)
  [![RSS Feed](https://img.shields.io/badge/RSS-Subscribe-orange?logo=rss)](https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed.xml)

  📥 **RSS URL:**
  [`https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed.xml`](https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed.xml)

- 発行されたページの各リンク（目次）ごとに分かれたRSS(詳細版)
  [![RSS Feed](https://img.shields.io/badge/RSS-Subscribe-orange?logo=rss)](https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed_toc.xml)

    📥 **RSS URL:**
  [`https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed_toc.xml`](https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed_toc.xml)
  


### ローカルテスト
- PDF情報から大まかなページのみの更新のRSSを作成するには、以下コマンドでテストできるはずです。
  ```zsh
  python generate_rss.py \
    "[{'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/pdf/20250711h01505full00010032.pdf', 'name': '令和7年7月11日（本紙\u3000第1505号）', 'filename': '20250711h01505full00010032.pdf'}, {'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/pdf/20250711g00160full00010104.pdf', 'name': '令和7年7月11日（号外\u3000第160号）', 'filename': '20250711g00160full00010104.pdf'}, {'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/pdf/20250711c00128full00010080.pdf', 'name': '令和7年7月11日（政府調達\u3000第128号）', 'filename': '20250711c00128full00010080.pdf'}]"
    
  ```

- 目次毎の情報からRSSを作成するには、以下コマンドでテストできるはずです。
  ```zsh
  python generate_toc_rss.py \
    "[{'page_title': '令和7年7月11日（本紙\u3000第1505号）', 'toc_infos': [[{'element_type': 'h2', 'value': 'その他告示'}, {'element_type': 'ul', 'value': [{'link_title': '地方自治法第二百九十一条の三第一項の規定により広域連合の規約変更を許可した件（総務二五七）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050001f.html'}, {'link_title': '特定国外派遣組織を指定する件（同二五八）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050001f.html'}, {'link_title': '裁判外紛争解決手続の利用の促進に関する法律第十七条第一項の規定による届出があった件（法務一〇八）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050001f.html'}, {'link_title': '第二次世界大戦の間にインドネシア共和国パプア州及び西パプア州において死亡した日本の兵士の遺骨の発掘、収集及び送還に関する日本国政府とインドネシア共和国政府との間の協定の有効期間の延長に関する書簡の交換に関する件（外務二六七）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050002f.html'}, {'link_title': '第二次世界大戦の間にインドネシア共和国パプア州及び西パプア州において死亡した日本の兵士の遺骨の発掘、収集及び送還に関する日本国政府とインドネシア共和国政府との間の協定を改正する議定書の署名及び効力発生に関する件（同二六八）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050002f.html'}, {'link_title': '保安林の指定施業要件を変更する件（農林水産一一二〇～一一二五）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050002f.html'}, {'link_title': '高速自動車国道に関する件（国土交通五二四）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050004f.html'}, {'link_title': '道路に関する件（東北地方整備局五六）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050004f.html'}, {'link_title': '道路に関する件（関東地方整備局一六六）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050004f.html'}, {'link_title': '道路に関する件（北陸地方整備局三六、三七）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050004f.html'}, {'link_title': '道路に関する件（四国地方整備局四〇、四一）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050004f.html'}]}], [{'element_type': 'h2', 'value': '人事異動'}, {'element_type': 'ul', 'value': [{'link_title': '内閣法制局\u3000公正取引委員会\u3000国家公安委員会\u3000警察庁\u3000復興庁', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050005f.html'}]}], [{'element_type': 'h2', 'value': '官庁報告'}, {'element_type': 'h3', 'value': '官庁事項'}, {'element_type': 'ul', 'value': [{'link_title': '国営土地改良事業の工事完了の公告（農林水産省）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050005f.html'}, {'link_title': '北陸地方整備局公示（北陸地方整備局）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050005f.html'}, {'link_title': '四国地方整備局公示（四国地方整備局）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050005f.html'}]}, {'element_type': 'h3', 'value': '法務'}, {'element_type': 'ul', 'value': [{'link_title': '公証人任免（法務省）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050005f.html'}]}, {'element_type': 'h3', 'value': '国家試験'}, {'element_type': 'ul', 'value': [{'link_title': '令和七年度土地改良換地士資格試験の実施について（農林水産省）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050006f.html'}, {'link_title': '旅券法第十九条の二第一項の規定に基づく一般旅券の返納命令に関する通知（外務省）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050006f.html'}, {'link_title': '日本国に帰化を許可する件（法務省告示配五七）', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050006f.html'}]}], [{'element_type': 'h2', 'value': '公告'}, {'element_type': 'h3', 'value': '諸事項'}, {'element_type': 'h4', 'value': '官庁'}, {'element_type': 'ul', 'value': [{'link_title': '有権者申出方、金融商品取引業者の営業保証金に係る配当表、苅田港松山地区土砂処分場公有水面埋立事業の実施引継ぎ関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050007f.html'}]}, {'element_type': 'h4', 'value': '裁判所'}, {'element_type': 'ul', 'value': [{'link_title': '相続、公示催告、失踪、除権決定、破産、免責、特別清算、再生、所有者不明関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050008f.html'}]}, {'element_type': 'h4', 'value': '特殊法人等'}, {'element_type': 'ul', 'value': [{'link_title': '企業年金基金解散・清算人就任関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050029f.html'}]}, {'element_type': 'h4', 'value': [{'link_title': '会社その他', 'url': 'https://www.kanpo.go.jp/20250711/20250711h01505/20250711h015050029f.html'}]}]]}, {'page_title': '令和7年7月11日（号外\u3000第160号）', 'toc_infos': [[{'element_type': 'h2', 'value': '政令'}, {'element_type': 'ul', 'value': [{'link_title': '鳥獣の保護及び管理並びに狩猟の適正化に関する法律の一部を改正する法律の施行期日を定める政令（二五四）', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600002f.html'}, {'link_title': '鳥獣の保護及び管理並びに狩猟の適正化に関する法律施行令の一部を改正する政令（二五五）', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600002f.html'}, {'link_title': 'ランピースキン病を家畜伝染病予防法第六十二条第一項の疾病の種類として指定する等の政令（二五六）', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600003f.html'}]}], [{'element_type': 'h2', 'value': '省令'}, {'element_type': 'ul', 'value': [{'link_title': '鳥獣の保護及び管理並びに狩猟の適正化に関する法律施行規則及び環境省関係構造改革特別区域法第三十五条に規定する政令等規制事業に係る省令の特例に関する措置を定める省令の一部を改正する省令（環境二一）', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600005f.html'}]}], [{'element_type': 'h2', 'value': 'その他告示'}, {'element_type': 'ul', 'value': [{'link_title': '国債の発行等に関する省令第五条第十一項の規定に基づき発行した割引短期国債の発行条件等を告示（財務一九〇）', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600007f.html'}, {'link_title': '政府資金調達事務取扱規則第五条第十一項の規定に基づき発行した政府短期証券の発行条件等を告示（同一九一～一九六）', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600007f.html'}]}], [{'element_type': 'h2', 'value': '公告'}, {'element_type': 'h3', 'value': '諸事項'}, {'element_type': 'h4', 'value': '官庁'}, {'element_type': 'ul', 'value': [{'link_title': '製造たばこ小売定価関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600010f.html'}]}, {'element_type': 'h4', 'value': '裁判所'}, {'element_type': 'ul', 'value': [{'link_title': '破産、免責関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600014f.html'}]}, {'element_type': 'h4', 'value': '特殊法人等'}, {'element_type': 'ul', 'value': [{'link_title': '西日本高速道路株式会社料金の額及び徴収期間の変更、生命保険契約者保護機構令和六年度決算関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600032f.html'}]}, {'element_type': 'h4', 'value': '地方公共団体'}, {'element_type': 'ul', 'value': [{'link_title': '教育職員免許状失効、行旅死亡人、押収物還付関係', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600034f.html'}]}, {'element_type': 'h4', 'value': [{'link_title': '会社その他', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600034f.html'}]}, {'element_type': 'h4', 'value': [{'link_title': '会社決算公告', 'url': 'https://www.kanpo.go.jp/20250711/20250711g00160/20250711g001600039f.html'}]}]]}, {'page_title': '令和7年7月11日（政府調達\u3000第128号）', 'toc_infos': [[{'element_type': 'h4', 'value': '入札公告'}, {'element_type': 'ul', 'value': [{'link_title': '入札公告', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280001f.html'}, {'link_title': '入札公告（建設工事）', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280051f.html'}]}, {'element_type': 'h4', 'value': '調達予定'}, {'element_type': 'ul', 'value': [{'link_title': '入札公告（公示）予定の公示', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280054f.html'}]}, {'element_type': 'h4', 'value': '招請'}, {'element_type': 'ul', 'value': [{'link_title': '資料提供招請に関する公表', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280054f.html'}, {'link_title': '意見招請に関する公示', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280054f.html'}]}, {'element_type': 'h4', 'value': '随意契約'}, {'element_type': 'ul', 'value': [{'link_title': '随意契約に関する公示', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280056f.html'}]}, {'element_type': 'h4', 'value': '落札'}, {'element_type': 'ul', 'value': [{'link_title': '落札者等の公示', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280063f.html'}, {'link_title': '落札者等の公示の変更', 'url': 'https://www.kanpo.go.jp/20250711/20250711c00128/20250711c001280076f.html'}]}]]}]"
    
  ```

---

## 🛠️ 技術仕様

### RSSフィード生成
- **言語**: Python
- **スケジュール**: GitHub Actions (毎日8:35頃)
- **データソース**: [官報公式サイト](https://www.kanpo.go.jp/)

---

## 💬 補足
- 本RSSは非公式のものであり、正確性を保証するものではありません。
- 利用に関して問題があれば[Issue](https://github.com/testkun08080/kanpo-rss/issues)からご連絡ください。

---

## 📄 ライセンス

MIT License © [testkun08080](https://github.com/testkun08080)

## 😀 貢献
バグ報告や機能リクエスト、プルリクエストは大歓迎です。問題や提案がある場合は、GitHubのIssueを作成してください。
その他に、いいなと思ったらスターもらえるとシンプルに喜びます。もしくはコーヒー奢ってもらえるとより喜びます。
