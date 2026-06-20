const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===================== Mock Job Data =====================
const jobs = [
  {
    id: 1,
    title: 'フロントエンドエンジニア',
    company: '株式会社メルカリ',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1100,
    experience: 3,
    description: 'フロントエンド開発チームのメンバーとして、Webアプリケーションの設計・開発・保守を担当していただきます。React/TypeScriptを用いた開発経験がある方を求めています。グローバルなプロダクト開発に興味がある方、大歓迎です。',
    requirements: '・React/TypeScript の実務経験3年以上\n・HTML/CSS の深い理解\n・Git を用いたチーム開発経験',
    benefits: '・フレックスタイム制\n・リモートワーク可\n・社会保険完備\n・書籍購入補助',
    postedAt: '2026-06-01',
    industry: 'IT',
    tags: ['React', 'TypeScript', 'フロントエンド']
  },
  {
    id: 2,
    title: 'バックエンドエンジニア（Go/Python）',
    company: '株式会社サイバーエージェント',
    location: '東京',
    jobType: 'fulltime',
    salary: 650,
    salaryMax: 1000,
    experience: 3,
    description: 'アメーバブログ・ABEMAなど自社サービスのバックエンド開発を担当していただきます。Go言語またはPythonを使用したAPI開発・マイクロサービス設計が主な業務です。',
    requirements: '・Go または Python の実務経験3年以上\n・REST API 設計・開発経験\n・RDBMSの知識（MySQL/PostgreSQL）',
    benefits: '・年2回昇給機会\n・社員食堂あり\n・育児支援制度\n・資格取得支援',
    postedAt: '2026-06-02',
    industry: 'IT',
    tags: ['Go', 'Python', 'バックエンド']
  },
  {
    id: 3,
    title: 'インフラエンジニア / SRE',
    company: 'Amazon Japan合同会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 900,
    salaryMax: 1500,
    experience: 5,
    description: 'AWSクラウドインフラの設計・構築・運用を担当します。大規模なシステムの可用性・スケーラビリティ・信頼性の向上に取り組むSREチームへの参加を募集しています。',
    requirements: '・AWS の実務経験5年以上\n・Terraform/Ansible 等IaCツール経験\n・Linux システム管理の深い知識',
    benefits: '・RSU（制限付き株式ユニット）\n・医療保険\n・401k相当の退職制度\n・グローバルキャリアパス',
    postedAt: '2026-05-28',
    industry: 'IT',
    tags: ['AWS', 'インフラ', 'SRE', 'Terraform']
  },
  {
    id: 4,
    title: 'データサイエンティスト',
    company: 'ソフトバンク株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 750,
    salaryMax: 1200,
    experience: 3,
    description: '通信データや顧客行動データを分析し、ビジネス課題の解決および新しいサービス開発に貢献していただきます。機械学習モデルの構築から本番環境へのデプロイまで一貫して担当します。',
    requirements: '・Python/R を用いたデータ分析経験\n・機械学習の実務経験3年以上\n・SQL による大規模データ処理経験',
    benefits: '・在宅勤務制度\n・研究開発費支援\n・学会参加費用補助\n・社員割引（通信費）',
    postedAt: '2026-06-03',
    industry: 'IT',
    tags: ['Python', '機械学習', 'データ分析']
  },
  {
    id: 5,
    title: 'フルスタックエンジニア',
    company: '株式会社リクルート',
    location: '東京',
    jobType: 'fulltime',
    salary: 600,
    salaryMax: 950,
    experience: 3,
    description: 'リクルートが提供する複数の求人・不動産・旅行サービスのWebアプリ開発を担当。フロントエンドからバックエンドまで幅広く関わっていただきます。',
    requirements: '・JavaScript/TypeScript 実務経験3年以上\n・Node.js または Java のバックエンド経験\n・クラウドサービス（AWS/GCP）の利用経験',
    benefits: '・フレックスタイム\n・週2〜3日リモート可\n・書籍・セミナー費用補助\n・健康診断費用全額負担',
    postedAt: '2026-06-04',
    industry: 'IT',
    tags: ['JavaScript', 'TypeScript', 'Node.js', 'フルスタック']
  },
  {
    id: 6,
    title: 'iOSエンジニア（Swift）',
    company: '株式会社DeNA',
    location: '東京',
    jobType: 'fulltime',
    salary: 650,
    salaryMax: 1050,
    experience: 3,
    description: 'モバイルゲームや各種サービスのiOSアプリ開発を担当します。Swift/Objective-Cの経験を活かし、UIの最適化やパフォーマンス改善に取り組んでいただきます。',
    requirements: '・Swift 実務経験3年以上\n・App Store への申請・公開経験\n・UI/UXデザインへの理解',
    benefits: '・ゲームタイトル社員割引\n・フレックス勤務\n・成果報酬型賞与\n・健康保険組合',
    postedAt: '2026-05-30',
    industry: 'IT',
    tags: ['Swift', 'iOS', 'モバイル']
  },
  {
    id: 7,
    title: 'Androidエンジニア',
    company: '楽天グループ株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 630,
    salaryMax: 980,
    experience: 3,
    description: '楽天市場・楽天カード等のAndroidアプリ開発を担当。Kotlin/Javaを用いたアプリ設計・開発・テストを行っていただきます。',
    requirements: '・Kotlin 実務経験2年以上\n・Android SDK の理解\n・CI/CDパイプラインの構築経験',
    benefits: '・社内英語研修\n・スポーツジム割引\n・社員食堂\n・産休・育休制度',
    postedAt: '2026-06-01',
    industry: 'IT',
    tags: ['Kotlin', 'Android', 'モバイル']
  },
  {
    id: 8,
    title: 'クラウドアーキテクト',
    company: '富士通株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 850,
    salaryMax: 1400,
    experience: 5,
    description: '大手企業のDX推進支援として、クラウドインフラの設計・移行・最適化を担当します。AWS/Azure/GCPを横断したマルチクラウド環境の構築が主業務です。',
    requirements: '・クラウド設計の実務経験5年以上\n・AWS/Azure の上位資格保有\n・大規模プロジェクトのリーダー経験',
    benefits: '・資格取得支援（全額補助）\n・フレックス制度\n・リモートワーク可\n・退職金制度',
    postedAt: '2026-05-25',
    industry: 'IT',
    tags: ['AWS', 'Azure', 'クラウド', 'アーキテクチャ']
  },
  {
    id: 9,
    title: 'IT営業（法人向けSaaS）',
    company: 'セールスフォース・ジャパン株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 600,
    salaryMax: 1200,
    experience: 1,
    description: 'Salesforce製品の法人向け新規・既存顧客への提案営業を担当します。CRM/SFAソリューションを通じて顧客のビジネス課題を解決します。インセンティブ制度充実。',
    requirements: '・法人営業経験1年以上\n・IT製品への興味・理解\n・目標達成に向けた自律的行動力',
    benefits: '・高インセンティブ制度\n・グローバルキャリア\n・英語学習支援\n・充実した研修制度',
    postedAt: '2026-06-05',
    industry: '営業',
    tags: ['IT営業', 'SaaS', 'Salesforce', '法人営業']
  },
  {
    id: 10,
    title: '海外営業マネージャー',
    company: 'パナソニック株式会社',
    location: '大阪',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1100,
    experience: 5,
    description: 'アジア・欧米市場向けの家電・産業機器の販売戦略立案と営業チームのマネジメントを担当します。海外拠点との連携が多く、英語力が必要です。',
    requirements: '・海外営業経験5年以上\n・ビジネスレベルの英語力（TOEIC800点以上）\n・チームマネジメント経験',
    benefits: '・海外赴任手当\n・語学研修制度\n・充実した福利厚生\n・退職金制度',
    postedAt: '2026-05-29',
    industry: '営業',
    tags: ['海外営業', '英語', 'マネージャー', 'グローバル']
  },
  {
    id: 11,
    title: '金融法人営業',
    company: '野村證券株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1300,
    experience: 3,
    description: '機関投資家・事業法人向けに株式・債券・デリバティブ等の金融商品の提案営業を行います。金融市場の知識を活かしながら顧客の資産形成・財務戦略をサポートします。',
    requirements: '・証券外務員資格\n・法人営業経験3年以上\n・金融商品の基礎知識',
    benefits: '・業績連動ボーナス\n・証券外務員資格取得支援\n・社員持株制度\n・各種保険完備',
    postedAt: '2026-06-02',
    industry: '金融',
    tags: ['証券', '法人営業', '金融']
  },
  {
    id: 12,
    title: 'デジタルマーケター',
    company: '株式会社電通デジタル',
    location: '東京',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 900,
    experience: 3,
    description: 'クライアント企業のデジタルマーケティング戦略の立案から実行まで担当します。SEO/SEM・SNS広告・ディスプレイ広告の運用、効果分析と改善提案を行います。',
    requirements: '・デジタルマーケティング実務経験3年以上\n・Google Analytics/広告運用ツールの経験\n・データ分析に基づく施策立案経験',
    benefits: '・フレックス制度\n・スキルアップ研修\n・各種手当充実\n・健康保険組合',
    postedAt: '2026-06-03',
    industry: 'マーケティング',
    tags: ['デジタルマーケティング', 'SEO', 'SEM', '広告運用']
  },
  {
    id: 13,
    title: 'プロダクトマネージャー',
    company: 'LINE株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 800,
    salaryMax: 1300,
    experience: 5,
    description: 'LINEアプリの新機能開発・既存機能改善のプロダクトマネジメントを担当。エンジニア・デザイナー・マーケターと連携しながら、数億ユーザーに影響するプロダクト戦略を推進します。',
    requirements: '・プロダクトマネジメント経験5年以上\n・データドリブンな意思決定能力\n・エンジニアリングの基礎知識',
    benefits: '・ストックオプション\n・グローバルチームとの協業\n・高額研修制度\n・フレックス+リモート',
    postedAt: '2026-05-27',
    industry: 'マーケティング',
    tags: ['プロダクトマネジメント', 'PM', 'UX', 'スタートアップ']
  },
  {
    id: 14,
    title: 'コンテンツマーケター',
    company: '株式会社HubSpot Japan',
    location: 'リモート',
    jobType: 'remote',
    salary: 500,
    salaryMax: 800,
    experience: 1,
    description: 'BtoB向けコンテンツマーケティング戦略の立案・実行を担当。ブログ・ホワイトペーパー・動画コンテンツの企画制作から、SEO対策・SNS展開まで幅広く携わります。',
    requirements: '・コンテンツマーケティング経験1年以上\n・ライティングスキル（日本語）\n・SEOの基礎知識',
    benefits: '・完全リモートワーク\n・フルフレックス\n・機器購入補助\n・コーチング支援',
    postedAt: '2026-06-04',
    industry: 'マーケティング',
    tags: ['コンテンツマーケティング', 'SEO', 'BtoB', 'リモート']
  },
  {
    id: 15,
    title: '人事・採用担当',
    company: '株式会社サイバーエージェント',
    location: '東京',
    jobType: 'fulltime',
    salary: 450,
    salaryMax: 750,
    experience: 1,
    description: 'エンジニア・デザイナー・営業など多様な職種の採用戦略立案から面接・内定者フォローまで一貫して担当します。採用ブランディングにも積極的に関わっていただきます。',
    requirements: '・採用業務経験1年以上\n・コミュニケーション能力の高さ\n・データを用いた採用分析経験',
    benefits: '・育児支援制度充実\n・研修制度\n・社員食堂\n・フレックス制',
    postedAt: '2026-06-01',
    industry: '人事',
    tags: ['人事', '採用', 'HR', 'タレントマネジメント']
  },
  {
    id: 16,
    title: '人事・労務マネージャー',
    company: 'ソニーグループ株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1000,
    experience: 5,
    description: 'グローバル企業の人事制度設計・労務管理・組織開発を担当。国内外の法令対応から従業員エンゲージメント向上施策まで幅広く推進するHRBPを募集します。',
    requirements: '・人事・労務経験5年以上\n・労働法規の知識\n・英語でのコミュニケーション能力',
    benefits: '・グローバルキャリアパス\n・充実した研修制度\n・社員持株会\n・各種手当',
    postedAt: '2026-05-28',
    industry: '人事',
    tags: ['人事', '労務', 'HRBP', 'グローバル']
  },
  {
    id: 17,
    title: '経理・財務スペシャリスト',
    company: 'トヨタ自動車株式会社',
    location: '名古屋',
    jobType: 'fulltime',
    salary: 600,
    salaryMax: 950,
    experience: 3,
    description: '連結決算・管理会計・予算策定など財務経理の専門業務を担当します。グローバル規模の財務管理に携わり、CFOをサポートする財務戦略の立案にも参加いただきます。',
    requirements: '・経理実務経験3年以上\n・日商簿記2級以上\n・連結決算の知識・経験',
    benefits: '・退職金制度\n・住宅手当\n・自動車購入補助\n・各種保険完備',
    postedAt: '2026-06-02',
    industry: '経理',
    tags: ['経理', '財務', '連結決算', '簿記']
  },
  {
    id: 18,
    title: '公認会計士・監査スタッフ',
    company: '有限責任監査法人トーマツ',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1200,
    experience: 1,
    description: '上場企業・非上場企業の財務諸表監査、内部統制評価、IFRS対応支援を担当します。多様な業種クライアントとのプロジェクトを通じて高い専門性を磨けます。',
    requirements: '・公認会計士資格または取得予定\n・監査業務への強い意欲\n・チームワーク重視の姿勢',
    benefits: '・資格取得費用全額補助\n・フレックスタイム\n・リモート勤務可\n・充実した研修',
    postedAt: '2026-05-31',
    industry: '経理',
    tags: ['公認会計士', '監査', 'IFRS', '会計']
  },
  {
    id: 19,
    title: 'ITコンサルタント',
    company: 'アクセンチュア株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1400,
    experience: 3,
    description: '大手企業向けにデジタルトランスフォーメーション（DX）推進のコンサルティングを提供します。業務改革・システム導入・組織変革まで一貫して支援します。',
    requirements: '・ITコンサルティング経験3年以上\n・プロジェクトマネジメント経験\n・クライアントへのプレゼンテーション能力',
    benefits: '・グローバルキャリア\n・資格取得支援\n・フレキシブルワーク\n・充実した研修体系',
    postedAt: '2026-06-01',
    industry: 'コンサルタント',
    tags: ['ITコンサルタント', 'DX', 'デジタル変革', 'コンサルティング']
  },
  {
    id: 20,
    title: '経営コンサルタント',
    company: 'マッキンゼー・アンド・カンパニー',
    location: '東京',
    jobType: 'fulltime',
    salary: 1200,
    salaryMax: 2000,
    experience: 3,
    description: '戦略策定・業務改革・M&A支援など経営全般にわたるコンサルティングを担当します。グローバル企業のCレベルへの直接提案を通じて、高いビジネスインパクトを生み出します。',
    requirements: '・戦略コンサルティング経験または MBA\n・構造的思考・問題解決能力\n・英語でのビジネスコミュニケーション',
    benefits: '・世界トップレベルの報酬\n・海外赴任機会\n・MBA留学支援\n・グローバルネットワーク',
    postedAt: '2026-05-25',
    industry: 'コンサルタント',
    tags: ['経営コンサルタント', '戦略', 'MBA', 'グローバル']
  },
  {
    id: 21,
    title: '医師（内科）',
    company: '社会医療法人 大阪急性期・総合医療センター',
    location: '大阪',
    jobType: 'fulltime',
    salary: 1200,
    salaryMax: 1800,
    experience: 3,
    description: '内科・救急科における外来・入院患者の診療を担当します。充実した研修環境と最新の医療設備を備えた急性期病院でスキルアップできます。',
    requirements: '・医師免許\n・内科専門医資格（または取得予定）\n・チーム医療への協調性',
    benefits: '・住宅補助\n・学会参加費補助\n・当直手当\n・各種保険完備',
    postedAt: '2026-06-03',
    industry: '医療',
    tags: ['医師', '内科', '急性期', '病院']
  },
  {
    id: 22,
    title: '薬剤師',
    company: 'ウエルシア薬局株式会社',
    location: '大阪',
    jobType: 'fulltime',
    salary: 480,
    salaryMax: 700,
    experience: 0,
    description: '調剤薬局での服薬指導・調剤業務・在宅医療支援を担当します。地域に密着した医療サービスの提供を通じて患者さんの健康管理をサポートします。',
    requirements: '・薬剤師免許\n・コミュニケーション能力\n・地域医療への関心',
    benefits: '・薬剤師手当\n・研修制度充実\n・産休・育休取得実績\n・各種保険完備',
    postedAt: '2026-06-04',
    industry: '医療',
    tags: ['薬剤師', '調剤', '在宅医療', '薬局']
  },
  {
    id: 23,
    title: '看護師（ICU・CCU）',
    company: '日本赤十字社医療センター',
    location: '東京',
    jobType: 'fulltime',
    salary: 450,
    salaryMax: 650,
    experience: 3,
    description: 'ICU・CCUにおける重症患者の看護を担当します。高度急性期医療の現場で専門的なスキルを磨き、チーム医療の中核として活躍していただきます。',
    requirements: '・看護師免許\n・急性期看護経験3年以上\n・ICU・CCU 経験者優遇',
    benefits: '・夜勤手当\n・専門看護師取得支援\n・院内保育所\n・住宅手当',
    postedAt: '2026-05-30',
    industry: '医療',
    tags: ['看護師', 'ICU', '急性期', '医療']
  },
  {
    id: 24,
    title: '中学校教員（数学）',
    company: '学校法人 開成学園',
    location: '東京',
    jobType: 'fulltime',
    salary: 400,
    salaryMax: 650,
    experience: 0,
    description: '中学・高校の数学授業の指導を担当します。進学校として生徒一人ひとりの可能性を引き出す教育を実践しています。課外活動・進路指導にも積極的に関わっていただきます。',
    requirements: '・中学校数学教員免許\n・数学への深い造詣\n・生徒への熱心な指導姿勢',
    benefits: '・教員研修制度\n・図書購入補助\n・退職金制度\n・各種保険完備',
    postedAt: '2026-05-26',
    industry: '教育',
    tags: ['教員', '数学', '中学校', '教育']
  },
  {
    id: 25,
    title: '塾講師・教室長候補',
    company: '株式会社 公文教育研究会',
    location: '大阪',
    jobType: 'fulltime',
    salary: 380,
    salaryMax: 600,
    experience: 0,
    description: '公文式教室での指導・教室運営を担当します。子どもたちの学習を支援しながら、教室の生徒獲得・保護者対応・スタッフ管理まで幅広く携わります。',
    requirements: '・教育・指導への情熱\n・コミュニケーション能力\n・マネジメントへの意欲',
    benefits: '・教室長手当\n・研修制度\n・資格取得支援\n・各種保険',
    postedAt: '2026-06-01',
    industry: '教育',
    tags: ['塾講師', '教育', '子ども', '教室長']
  },
  {
    id: 26,
    title: '大学教員（情報工学）',
    company: '東京工業大学',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1100,
    experience: 5,
    description: '情報工学・人工知能分野の研究・教育を担当する教員を募集します。学部・大学院生への講義・演習指導、研究室の運営、外部資金獲得に積極的に取り組んでいただきます。',
    requirements: '・情報工学・CS分野の博士号\n・査読付き論文の研究実績\n・教育・研究への強いコミット',
    benefits: '・研究費支援\n・学会参加費補助\n・サバティカル制度\n・退職金制度',
    postedAt: '2026-05-20',
    industry: '教育',
    tags: ['大学教員', '研究', 'AI', '情報工学']
  },
  {
    id: 27,
    title: 'UIUXデザイナー',
    company: '株式会社グッドパッチ',
    location: '東京',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 900,
    experience: 3,
    description: 'クライアントのデジタルプロダクトのUIUXデザインを担当します。ユーザーリサーチ・IA設計・プロトタイプ作成・デザインシステム構築まで一貫して携わります。',
    requirements: '・UIUXデザイン実務経験3年以上\n・Figma/Sketchの操作スキル\n・ユーザーリサーチの経験',
    benefits: '・デザインカンファレンス参加費\n・書籍購入補助\n・フレックス制度\n・リモート可',
    postedAt: '2026-06-02',
    industry: 'IT',
    tags: ['UIUXデザイン', 'Figma', 'デザイン', 'UX']
  },
  {
    id: 28,
    title: 'セキュリティエンジニア',
    company: '株式会社NTTデータ',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1100,
    experience: 3,
    description: '企業のサイバーセキュリティ対策支援として、脆弱性診断・セキュリティ設計・インシデント対応を担当します。CSIRT運用やSOC構築プロジェクトにも参加できます。',
    requirements: '・セキュリティ業務経験3年以上\n・セキュリティ資格（CISSP/情報セキュリティスペシャリスト等）\n・ネットワーク・OS の深い知識',
    benefits: '・資格取得全額支援\n・充実した研修\n・福利厚生完備\n・テレワーク制度',
    postedAt: '2026-05-31',
    industry: 'IT',
    tags: ['セキュリティ', 'CISSP', 'インシデント対応', 'SOC']
  },
  {
    id: 29,
    title: '機械学習エンジニア',
    company: 'Preferred Networks株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 900,
    salaryMax: 1600,
    experience: 3,
    description: '深層学習・強化学習を用いた次世代AIシステムの研究開発を担当します。ロボティクス・自動運転・創薬など社会課題解決に向けた最先端AI研究に携わります。',
    requirements: '・機械学習の深い知識（論文読解・実装力）\n・Python/C++ のプログラミングスキル\n・研究成果の発表経験（学会・論文等）',
    benefits: '・研究発表費用補助\n・社内GPU計算資源\n・フレックス制\n・ストックオプション',
    postedAt: '2026-06-03',
    industry: 'IT',
    tags: ['機械学習', '深層学習', 'AI', 'Python', '研究開発']
  },
  {
    id: 30,
    title: '銀行員（法人融資担当）',
    company: '三菱UFJ銀行',
    location: '東京',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 900,
    experience: 1,
    description: '中堅・大企業向けの融資提案・財務コンサルティングを担当します。企業の資金調達ニーズを把握し、最適な金融ソリューションを提案します。',
    requirements: '・金融業務経験1年以上（または新卒可）\n・財務・会計の基礎知識\n・顧客折衝能力',
    benefits: '・銀行業務検定資格支援\n・住宅ローン優遇\n・総合福利厚生\n・退職金',
    postedAt: '2026-06-04',
    industry: '金融',
    tags: ['銀行', '法人融資', '金融', 'コンサルティング']
  },
  {
    id: 31,
    title: 'ファンドマネージャー',
    company: '野村アセットマネジメント株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 1000,
    salaryMax: 2000,
    experience: 5,
    description: '日本株・グローバル株式ファンドの運用管理を担当。マクロ経済分析から個別銘柄選定まで担い、機関投資家・個人投資家向けファンドのパフォーマンス最大化を目指します。',
    requirements: '・ファンド運用経験5年以上\n・CFA資格保有者優遇\n・計量分析スキル',
    benefits: '・業績連動高額報酬\n・CFA取得支援\n・グローバル投資環境\n・充実した福利厚生',
    postedAt: '2026-05-22',
    industry: '金融',
    tags: ['ファンド', '資産運用', 'CFA', '株式']
  },
  {
    id: 32,
    title: '損害保険アクチュアリー',
    company: '東京海上日動火災保険株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 800,
    salaryMax: 1300,
    experience: 3,
    description: '保険商品の価格設定・リスク評価・準備金計算などアクチュアリー業務を担当します。最新の統計モデルを活用した商品開発や経営戦略への貢献が期待されます。',
    requirements: '・アクチュアリー資格（または試験合格科目あり）\n・統計・数学の高い知識\n・プログラミング（R/Python）',
    benefits: '・資格取得奨励金\n・高い専門性手当\n・充実した研修\n・テレワーク可',
    postedAt: '2026-05-29',
    industry: '金融',
    tags: ['アクチュアリー', '保険', 'リスク管理', '統計']
  },
  {
    id: 33,
    title: '製造エンジニア（自動車部品）',
    company: 'デンソー株式会社',
    location: '名古屋',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 850,
    experience: 3,
    description: '自動車用電子制御ユニット（ECU）の製造工程設計・品質管理・生産効率改善を担当します。電動化・自動運転関連部品の生産技術向上に取り組みます。',
    requirements: '・機械・電気・生産工学系の学士以上\n・製造業経験3年以上\n・品質管理の知識（QC手法）',
    benefits: '・自動車購入補助\n・住宅手当\n・豊富な研修制度\n・退職金',
    postedAt: '2026-06-01',
    industry: '製造',
    tags: ['製造', '自動車', 'ECU', '生産技術', '品質管理']
  },
  {
    id: 34,
    title: '機械設計エンジニア',
    company: '株式会社安川電機',
    location: '福岡',
    jobType: 'fulltime',
    salary: 500,
    salaryMax: 800,
    experience: 3,
    description: '産業用ロボットの機械設計・開発を担当します。3D CADを用いたメカ設計から試作・評価・量産対応まで一貫して携わります。ロボット技術の最前線で活躍できます。',
    requirements: '・機械設計の実務経験3年以上\n・3D CAD（SolidWorks/CATIA等）の操作スキル\n・機械工学の基礎知識',
    benefits: '・技術士取得支援\n・社員寮あり\n・研修充実\n・退職金',
    postedAt: '2026-05-28',
    industry: '製造',
    tags: ['機械設計', 'ロボット', 'CAD', 'メカ設計']
  },
  {
    id: 35,
    title: '電気・電子回路設計',
    company: '京セラ株式会社',
    location: '大阪',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 850,
    experience: 3,
    description: '電子部品・半導体デバイスの回路設計・評価・量産対応を担当します。アナログ・デジタル回路設計の両方に携われる環境で、幅広いスキルを磨けます。',
    requirements: '・電気・電子回路設計の実務経験3年以上\n・回路シミュレーションツールの使用経験\n・半導体・電子部品の知識',
    benefits: '・資格取得支援\n・研究開発費補助\n・フレックス制\n・充実した福利厚生',
    postedAt: '2026-06-02',
    industry: '製造',
    tags: ['電気設計', '電子回路', '半導体', 'ハードウェア']
  },
  {
    id: 36,
    title: '広報・PR担当',
    company: 'ロート製薬株式会社',
    location: '大阪',
    jobType: 'fulltime',
    salary: 450,
    salaryMax: 700,
    experience: 3,
    description: '企業・製品の広報活動全般を担当します。プレスリリースの作成・メディアリレーションズ・SNS管理・危機対応など多岐にわたる広報業務を通じてブランド価値を高めます。',
    requirements: '・広報・PR実務経験3年以上\n・メディアリレーションの経験\n・ライティングスキルの高さ',
    benefits: '・社員割引（製品）\n・フレックス制度\n・育児支援\n・各種手当',
    postedAt: '2026-06-03',
    industry: 'マーケティング',
    tags: ['広報', 'PR', 'メディア', 'ブランド']
  },
  {
    id: 37,
    title: '物流・サプライチェーン管理',
    company: 'ヤマトホールディングス株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 500,
    salaryMax: 780,
    experience: 3,
    description: '国内外のサプライチェーン最適化・物流ネットワーク構築・コスト削減施策の立案実行を担当します。EC物流の急成長に対応した新しい物流モデル構築に携わります。',
    requirements: '・物流・サプライチェーン経験3年以上\n・WMS/TMS等物流システムの知識\n・データ分析スキル',
    benefits: '・配送費割引\n・フレックス制\n・健康管理支援\n・退職金制度',
    postedAt: '2026-05-31',
    industry: '物流',
    tags: ['物流', 'サプライチェーン', 'ロジスティクス', 'EC']
  },
  {
    id: 38,
    title: 'カスタマーサクセスマネージャー',
    company: 'freee株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 850,
    experience: 1,
    description: 'クラウド会計・人事労務ソフトのカスタマーサクセスを担当。中小企業のお客様が製品を最大限活用できるよう、オンボーディング・定期フォロー・活用提案を行います。',
    requirements: '・カスタマーサクセスまたはカスタマーサポート経験\n・SaaS製品への理解\n・顧客折衝・提案力',
    benefits: '・ストックオプション\n・フレックス+リモート\n・書籍補助\n・スキルアップ支援',
    postedAt: '2026-06-05',
    industry: 'IT',
    tags: ['カスタマーサクセス', 'CS', 'SaaS', '会計']
  },
  {
    id: 39,
    title: 'Webディレクター',
    company: '株式会社博報堂DYホールディングス',
    location: '東京',
    jobType: 'fulltime',
    salary: 550,
    salaryMax: 900,
    experience: 3,
    description: '大手ブランドのWebサイト制作・リニューアルプロジェクトのディレクションを担当します。クライアントとのコミュニケーションからサイト設計・制作管理・品質チェックまで一気通貫で行います。',
    requirements: '・Webディレクション経験3年以上\n・HTML/CSSの基礎知識\n・プロジェクト管理スキル',
    benefits: '・スキルアップ補助\n・フレックス制\n・社内表彰制度\n・各種保険完備',
    postedAt: '2026-06-01',
    industry: 'IT',
    tags: ['Webディレクター', 'ディレクション', 'Web制作', 'プロジェクト管理']
  },
  {
    id: 40,
    title: 'BI・データアナリスト',
    company: 'ヤフー株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 650,
    salaryMax: 1000,
    experience: 3,
    description: 'Yahoo! JAPAN各サービスの行動データを分析し、プロダクト改善・マーケティング最適化に貢献します。BIダッシュボード構築・アドホック分析・A/Bテスト設計を担当します。',
    requirements: '・データ分析実務経験3年以上\n・SQL/Python のスキル\n・Tableau/Looker 等BIツール経験',
    benefits: '・フレックス制\n・リモートワーク可\n・研修費用補助\n・健康サポート',
    postedAt: '2026-06-02',
    industry: 'IT',
    tags: ['データアナリスト', 'BI', 'SQL', 'Python', 'Tableau']
  },
  {
    id: 41,
    title: '不動産投資アナリスト',
    company: '三井不動産株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 700,
    salaryMax: 1100,
    experience: 3,
    description: '商業施設・オフィスビル・住宅等の不動産投資案件の収益分析・物件評価・投資判断支援を担当します。機関投資家向けレポート作成やデューデリジェンスにも携わります。',
    requirements: '・不動産投資・金融分析経験3年以上\n・宅地建物取引士資格\n・Excelによる財務モデリングスキル',
    benefits: '・不動産購入優待\n・充実した研修\n・年2回昇給\n・各種手当',
    postedAt: '2026-05-29',
    industry: '不動産',
    tags: ['不動産', '投資分析', 'アナリスト', '宅建']
  },
  {
    id: 42,
    title: 'コールセンター運営管理者',
    company: 'ベルシステム24ホールディングス株式会社',
    location: '大阪',
    jobType: 'fulltime',
    salary: 400,
    salaryMax: 650,
    experience: 3,
    description: '大手企業のアウトソーシングコールセンターの運営管理・品質改善・スタッフ育成を担当します。KPI管理・シフト最適化・クライアント折衝まで幅広く携わります。',
    requirements: '・コールセンター運営経験3年以上\n・マネジメント経験\n・品質改善への取り組み経験',
    benefits: '・管理職手当\n・研修制度\n・各種福利厚生\n・昇進機会',
    postedAt: '2026-06-04',
    industry: 'サービス',
    tags: ['コールセンター', 'マネジメント', 'BPO', 'オペレーション']
  },
  {
    id: 43,
    title: '社会保険労務士',
    company: 'グリーン社会保険労務士法人',
    location: '東京',
    jobType: 'fulltime',
    salary: 450,
    salaryMax: 750,
    experience: 1,
    description: '企業の労働・社会保険手続き、就業規則作成、助成金申請、給与計算などの社労士業務全般を担当します。複数クライアントを担当しながら専門性を高められます。',
    requirements: '・社会保険労務士資格\n・労務実務経験1年以上\n・顧客対応スキル',
    benefits: '・資格手当\n・研修費用補助\n・フレックス制\n・リモート対応可',
    postedAt: '2026-06-05',
    industry: '人事',
    tags: ['社労士', '労務', '社会保険', '就業規則']
  },
  {
    id: 44,
    title: '翻訳・ローカライゼーション',
    company: '株式会社翻訳センター',
    location: 'リモート',
    jobType: 'remote',
    salary: 400,
    salaryMax: 700,
    experience: 1,
    description: '医薬・特許・法律・IT分野の英日・日英翻訳業務を担当します。専門知識を活かした高品質な翻訳成果物の作成と、翻訳メモリの構築・管理も担います。',
    requirements: '・翻訳実務経験1年以上\n・英語・日本語の高い言語能力\n・専門分野の知識（医薬/IT/法律等）',
    benefits: '・完全リモート\n・フレキシブル勤務\n・専門スキル手当\n・資格取得支援',
    postedAt: '2026-06-01',
    industry: 'サービス',
    tags: ['翻訳', 'ローカライゼーション', '英語', 'リモート']
  },
  {
    id: 45,
    title: 'ゲームプランナー',
    company: '株式会社スクウェア・エニックス',
    location: '東京',
    jobType: 'fulltime',
    salary: 500,
    salaryMax: 800,
    experience: 3,
    description: 'コンシューマーゲームおよびスマートフォンゲームのゲームデザイン・仕様策定・バランス調整を担当します。世界中にファンを持つIPのゲーム体験を作り上げます。',
    requirements: '・ゲームプランナー経験3年以上\n・Excelを用いたパラメータ管理\n・ゲームへの深い理解と情熱',
    benefits: '・最新ゲーム無料配布\n・クリエイティブ環境\n・研修充実\n・各種保険',
    postedAt: '2026-05-28',
    industry: 'IT',
    tags: ['ゲーム', 'プランナー', 'ゲームデザイン', 'スクエニ']
  },
  {
    id: 46,
    title: 'クラウドネイティブ開発エンジニア',
    company: 'Google Japan合同会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 1000,
    salaryMax: 1800,
    experience: 5,
    description: 'GCP上でのクラウドネイティブアプリケーション開発・OSS貢献・技術コミュニティ支援を担当するDevRelエンジニアを募集します。Kubernetes/Istio等の先端技術に携われます。',
    requirements: '・Kubernetes/Docker の実務経験\n・クラウドネイティブアーキテクチャの深い知識\n・OSS 活動・技術発信経験',
    benefits: '・世界最高水準の報酬\n・20%プロジェクト制度\n・充実した福利厚生\n・グローバル環境',
    postedAt: '2026-06-01',
    industry: 'IT',
    tags: ['Kubernetes', 'GCP', 'クラウドネイティブ', 'OSS']
  },
  {
    id: 47,
    title: '福祉・ソーシャルワーカー',
    company: '社会福祉法人 全国社会福祉協議会',
    location: '東京',
    jobType: 'fulltime',
    salary: 350,
    salaryMax: 500,
    experience: 0,
    description: '生活困窮者・高齢者・障がい者への福祉相談・支援計画の策定・関係機関との連携を担当します。社会的課題の解決に向けて地域に根ざした支援活動を行います。',
    requirements: '・社会福祉士または精神保健福祉士資格\n・コミュニケーション・傾聴力\n・福祉への強い使命感',
    benefits: '・資格手当\n・研修制度\n・育児支援\n・退職金',
    postedAt: '2026-06-03',
    industry: '福祉',
    tags: ['福祉', 'ソーシャルワーカー', '相談支援', '社会福祉士']
  },
  {
    id: 48,
    title: '契約社員：オフィス事務・秘書',
    company: '三菱商事株式会社',
    location: '東京',
    jobType: 'contract',
    salary: 350,
    salaryMax: 500,
    experience: 1,
    description: '役員・管理職のスケジュール管理・出張手配・社内外文書作成・電話応対など秘書・オフィス事務業務全般を担当します。大手商社のグローバル環境で活躍いただけます。',
    requirements: '・秘書・事務経験1年以上\n・Excel/Word/PowerPoint スキル\n・ビジネスマナーの高さ',
    benefits: '・交通費全額支給\n・社員食堂利用可\n・各種保険適用\n・正社員登用制度',
    postedAt: '2026-06-05',
    industry: 'サービス',
    tags: ['事務', '秘書', 'オフィスワーク', '商社']
  },
  {
    id: 49,
    title: 'パート：データ入力・事務補助',
    company: '株式会社パソナグループ',
    location: '大阪',
    jobType: 'parttime',
    salary: 250,
    salaryMax: 380,
    experience: 0,
    description: 'データ入力・書類整理・電話応対など一般事務業務をサポートしていただきます。週3〜5日、1日4〜8時間のシフト制です。Excelの基本操作ができれば応募可能です。',
    requirements: '・PC基本操作（Excel/Word）\n・正確かつ丁寧な作業\n・週3日以上勤務可能な方',
    benefits: '・交通費支給\n・社会保険加入可\n・シフト相談可\n・研修あり',
    postedAt: '2026-06-05',
    industry: 'サービス',
    tags: ['パート', '事務', 'データ入力', 'アルバイト']
  },
  {
    id: 50,
    title: '業務委託：フリーランスエンジニア（React）',
    company: 'Wantedly株式会社',
    location: 'リモート',
    jobType: 'contract',
    salary: 700,
    salaryMax: 1200,
    experience: 3,
    description: 'フリーランスエンジニアとして、WantedlyのWebフロントエンド開発をリモートで担当します。週3〜5日稼働可能な方を対象に、長期的な業務委託契約を想定しています。',
    requirements: '・React/TypeScript 実務経験3年以上\n・フリーランスとしての業務管理能力\n・非同期でのチームコミュニケーション',
    benefits: '・完全リモート\n・フレキシブルな稼働時間\n・長期契約\n・高単価',
    postedAt: '2026-06-04',
    industry: 'IT',
    tags: ['フリーランス', 'React', 'リモート', '業務委託']
  },
  {
    id: 51,
    title: '新規事業開発マネージャー',
    company: '株式会社ソフトバンク',
    location: '東京',
    jobType: 'fulltime',
    salary: 800,
    salaryMax: 1300,
    experience: 5,
    description: 'AIoT・5G・フィンテックなど次世代領域の新規事業創出を担当するビジネス開発マネージャーを募集。スタートアップとの協業・社内ベンチャー育成を主導します。',
    requirements: '・事業開発・BizDev経験5年以上\n・スタートアップエコシステムの理解\n・英語でのビジネス交渉力',
    benefits: '・新規事業参画ストックオプション\n・グローバル視察機会\n・フレックス+リモート\n・MBA取得支援',
    postedAt: '2026-05-26',
    industry: 'IT',
    tags: ['新規事業', 'BizDev', 'スタートアップ', '事業開発']
  },
  {
    id: 52,
    title: '税理士・会計スタッフ',
    company: 'PwC税理士法人',
    location: '東京',
    jobType: 'fulltime',
    salary: 600,
    salaryMax: 1000,
    experience: 1,
    description: '多国籍企業・スタートアップ向けの法人税申告・税務相談・国際税務対応を担当します。Big4の環境でグローバルな税務専門知識を磨けます。',
    requirements: '・税理士資格または試験合格科目あり\n・法人税申告書作成経験\n・英語によるコミュニケーション能力',
    benefits: '・資格取得支援\n・グローバル研修\n・フレックス制\n・充実した福利厚生',
    postedAt: '2026-06-03',
    industry: '経理',
    tags: ['税理士', '法人税', '国際税務', 'Big4']
  },
  {
    id: 53,
    title: 'ブロックチェーンエンジニア',
    company: '株式会社HashPort',
    location: 'リモート',
    jobType: 'remote',
    salary: 800,
    salaryMax: 1400,
    experience: 3,
    description: 'Ethereum/Solanaを用いたスマートコントラクト開発・DeFiプロトコル設計・NFTプラットフォーム構築を担当します。Web3の最前線で日本のブロックチェーン産業を牽引します。',
    requirements: '・Solidity/Rust のプログラミング経験\n・ブロックチェーン・スマートコントラクトの知識\n・DeFi/NFT の実務経験',
    benefits: '・完全リモート\n・トークン報酬\n・最先端技術環境\n・海外カンファレンス参加',
    postedAt: '2026-06-02',
    industry: 'IT',
    tags: ['ブロックチェーン', 'Web3', 'Solidity', 'DeFi', 'NFT']
  },
  {
    id: 54,
    title: 'スポーツトレーナー・フィットネスインストラクター',
    company: '株式会社コナミスポーツ',
    location: '名古屋',
    jobType: 'fulltime',
    salary: 320,
    salaryMax: 480,
    experience: 0,
    description: 'スポーツクラブ会員への運動指導・トレーニングプログラム作成・健康相談を担当します。JATI/NSCAなどの資格があれば優遇。スポーツが好きな方を歓迎します。',
    requirements: '・健康運動指導士または関連資格\n・コミュニケーション能力\n・健康・スポーツへの情熱',
    benefits: '・施設利用無料\n・資格取得支援\n・各種保険完備\n・制服支給',
    postedAt: '2026-06-04',
    industry: 'サービス',
    tags: ['トレーナー', 'フィットネス', 'スポーツ', '健康']
  },
  {
    id: 55,
    title: 'AIプロダクトマネージャー',
    company: 'NTTコミュニケーションズ株式会社',
    location: '東京',
    jobType: 'fulltime',
    salary: 750,
    salaryMax: 1200,
    experience: 5,
    description: 'AIを活用した法人向けDXサービスのプロダクト戦略・ロードマップ策定・開発チームとの連携を担当します。生成AI・自然言語処理技術を組み込んだ次世代サービスの開発をリードします。',
    requirements: '・プロダクトマネジメント経験5年以上\n・AI/機械学習の基礎知識\n・ビジネスとテクノロジーの橋渡しスキル',
    benefits: '・テレワーク推進\n・研修・資格支援\n・子育て支援\n・退職金制度',
    postedAt: '2026-06-01',
    industry: 'IT',
    tags: ['プロダクトマネージャー', 'AI', '生成AI', 'DX', 'NTT']
  }
];

// ===================== API Endpoints =====================

// GET /api/jobs - search and filter jobs
app.get('/api/jobs', (req, res) => {
  const {
    keyword = '',
    location = '',
    jobType = '',
    salary = '',
    experience = '',
    sort = 'newest',
    page = 1,
    limit = 10
  } = req.query;

  let filtered = [...jobs];

  // Keyword filter (title, company, description, tags)
  if (keyword.trim()) {
    const kw = keyword.trim().toLowerCase();
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(kw) ||
      job.company.toLowerCase().includes(kw) ||
      job.description.toLowerCase().includes(kw) ||
      job.industry.toLowerCase().includes(kw) ||
      job.tags.some(t => t.toLowerCase().includes(kw))
    );
  }

  // Location filter
  if (location && location !== '全国') {
    if (location === 'リモート') {
      filtered = filtered.filter(job => job.location === 'リモート' || job.jobType === 'remote');
    } else {
      filtered = filtered.filter(job => job.location === location);
    }
  }

  // Job type filter (comma separated possible)
  if (jobType) {
    const types = jobType.split(',').map(t => t.trim()).filter(Boolean);
    if (types.length > 0) {
      filtered = filtered.filter(job => types.includes(job.jobType));
    }
  }

  // Minimum salary filter
  if (salary) {
    const minSal = parseInt(salary);
    if (!isNaN(minSal)) {
      filtered = filtered.filter(job => job.salary >= minSal);
    }
  }

  // Experience filter
  if (experience && experience !== '不問') {
    const expMap = { '1年以上': 1, '3年以上': 3, '5年以上': 5 };
    const minExp = expMap[experience];
    if (minExp !== undefined) {
      filtered = filtered.filter(job => job.experience >= minExp);
    }
  }

  // Sort
  if (sort === 'salary') {
    filtered.sort((a, b) => b.salary - a.salary);
  } else {
    // newest: sort by postedAt descending
    filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }

  const total = filtered.length;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(50, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;
  const paginated = filtered.slice(offset, offset + limitNum);

  res.json({
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    jobs: paginated
  });
});

// GET /api/jobs/:id - get job detail
app.get('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const job = jobs.find(j => j.id === id);
  if (!job) {
    return res.status(404).json({ error: '求人が見つかりません' });
  }
  res.json(job);
});

// GET /api/indeed-jobs - Indeed実データ検索
app.get('/api/indeed-jobs', (req, res) => {
  const fs = require('fs');
  const cachePath = path.join(__dirname, 'data', 'indeed-cache.json');
  let allJobs = [];
  try {
    allJobs = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch (e) {
    return res.json({ total: 0, jobs: [], updatedAt: null });
  }

  const { keyword = '', location = '' } = req.query;
  let filtered = allJobs;

  if (keyword) {
    const kw = keyword.toLowerCase();
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(kw) ||
      j.company.toLowerCase().includes(kw) ||
      (j.keyword && j.keyword.toLowerCase().includes(kw))
    );
  }
  if (location && location !== '全国') {
    filtered = filtered.filter(j =>
      j.location.includes(location) || j.searchLocation === location
    );
  }

  const stat = fs.statSync(cachePath);
  res.json({ total: filtered.length, jobs: filtered, updatedAt: stat.mtime });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
