const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const jobs = [
  { id: 1, title: 'フロントエンドエンジニア', company: '株式会社サイバーエージェント', location: '東京', jobType: 'fulltime', salary: 600, salaryMax: 1000, experience: 3, description: 'React/TypeScriptを使ったWebアプリ開発。最新技術を積極採用し、自由な開発文化があります。フレックス制・リモート可。', tags: ['React', 'TypeScript', 'Next.js'] },
  { id: 2, title: 'バックエンドエンジニア', company: '株式会社メルカリ', location: 'リモート', jobType: 'fulltime', salary: 700, salaryMax: 1200, experience: 3, description: 'Go言語でマイクロサービス開発。グローバルなエンジニアチームと協働。週3リモート可。', tags: ['Go', 'Kubernetes', 'GCP'] },
  { id: 3, title: 'インフラエンジニア（SRE）', company: '株式会社DeNA', location: '東京', jobType: 'fulltime', salary: 650, salaryMax: 1100, experience: 3, description: 'AWSを中心としたクラウドインフラの構築・運用。CI/CDパイプライン整備、可用性向上に取り組む。', tags: ['AWS', 'Terraform', 'Docker'] },
  { id: 4, title: 'データサイエンティスト', company: '株式会社NTTデータ', location: '東京', jobType: 'fulltime', salary: 600, salaryMax: 950, experience: 3, description: '機械学習モデルの開発・運用。大規模データ分析基盤の構築。Python/R使用経験者歓迎。', tags: ['Python', '機械学習', 'SQL'] },
  { id: 5, title: 'iOSエンジニア', company: 'LINEヤフー株式会社', location: '東京', jobType: 'fulltime', salary: 650, salaryMax: 1100, experience: 3, description: 'Swift/Objective-CによるiOSアプリ開発。数千万ユーザーが使うプロダクトを担当。', tags: ['Swift', 'iOS', 'Objective-C'] },
  { id: 6, title: 'Androidエンジニア', company: '楽天グループ株式会社', location: '東京', jobType: 'fulltime', salary: 550, salaryMax: 900, experience: 1, description: 'Kotlin/JavaによるAndroidアプリ開発。楽天エコシステムを支えるアプリ開発に携わる。', tags: ['Kotlin', 'Android', 'Java'] },
  { id: 7, title: 'フルスタックエンジニア', company: 'freee株式会社', location: 'リモート', jobType: 'fulltime', salary: 600, salaryMax: 1000, experience: 3, description: 'Ruby on RailsとReactでSaaS開発。スタートアップの文化とスケールの両立。フルリモート可。', tags: ['Ruby', 'Rails', 'React'] },
  { id: 8, title: 'セキュリティエンジニア', company: '株式会社ソフトバンク', location: '東京', jobType: 'fulltime', salary: 700, salaryMax: 1200, experience: 5, description: 'ネットワーク・システムセキュリティの診断・設計。CSIRT業務も担当。CISSP保有者優遇。', tags: ['セキュリティ', 'CISSP', 'ペネトレーションテスト'] },
  { id: 9, title: 'プロダクトマネージャー', company: '株式会社リクルート', location: '東京', jobType: 'fulltime', salary: 800, salaryMax: 1400, experience: 5, description: 'デジタルプロダクトのロードマップ策定から実装まで。エンジニア・デザイナーと協働し価値を届ける。', tags: ['プロダクト', 'アジャイル', 'データ分析'] },
  { id: 10, title: 'UX/UIデザイナー', company: '株式会社サイボウズ', location: '東京', jobType: 'fulltime', salary: 500, salaryMax: 850, experience: 3, description: 'kintone等プロダクトのUX設計・UIデザイン。ユーザーリサーチからプロトタイプ作成まで担当。', tags: ['Figma', 'UXリサーチ', 'プロトタイプ'] },
  { id: 11, title: 'IT営業（法人）', company: '富士通株式会社', location: '東京', jobType: 'fulltime', salary: 450, salaryMax: 900, experience: 1, description: '大手企業向けITソリューション営業。クラウド・DX提案を中心に担当。インセンティブ制度充実。', tags: ['法人営業', 'DX', 'クラウド'] },
  { id: 12, title: 'IT営業（中小企業向け）', company: '株式会社オービック', location: '大阪', jobType: 'fulltime', salary: 400, salaryMax: 700, experience: 0, description: 'ERP・業務システムの営業。顧客の業務改善を提案。未経験者歓迎、充実した研修制度あり。', tags: ['ERP', '業務システム', 'SaaS'] },
  { id: 13, title: '海外営業', company: '株式会社村田製作所', location: '名古屋', jobType: 'fulltime', salary: 550, salaryMax: 1000, experience: 3, description: '電子部品の海外顧客向け営業。英語・中国語でのコミュニケーション。出張あり（アジア中心）。', tags: ['海外営業', '英語', '電子部品'] },
  { id: 14, title: 'デジタルマーケター', company: '株式会社電通デジタル', location: '東京', jobType: 'fulltime', salary: 500, salaryMax: 900, experience: 3, description: 'SEO/SEM、SNS広告の運用・分析。Google Analytics、広告配信ツールを使った施策立案。', tags: ['SEO', 'SEM', 'Google広告'] },
  { id: 15, title: 'コンテンツマーケター', company: '株式会社HubSpot Japan', location: 'リモート', jobType: 'fulltime', salary: 550, salaryMax: 850, experience: 3, description: 'ブログ・ホワイトペーパー・動画コンテンツの企画制作。インバウンドマーケティング戦略策定。', tags: ['コンテンツ', 'インバウンド', 'SNS'] },
  { id: 16, title: '人事（採用担当）', company: '株式会社パーソルホールディングス', location: '東京', jobType: 'fulltime', salary: 450, salaryMax: 750, experience: 1, description: '新卒・中途採用のオペレーション全般。採用ブランディング、エージェント対応も担当。', tags: ['採用', 'HR', 'ダイバーシティ'] },
  { id: 17, title: '組織開発・人材育成', company: '株式会社ベネッセホールディングス', location: '東京', jobType: 'fulltime', salary: 500, salaryMax: 800, experience: 3, description: '研修プログラムの企画・運営。従業員エンゲージメント向上施策。HRBP経験者優遇。', tags: ['組織開発', 'HRBP', '研修'] },
  { id: 18, title: '経理（決算・財務報告）', company: '株式会社資生堂', location: '東京', jobType: 'fulltime', salary: 500, salaryMax: 850, experience: 3, description: '月次・年次決算業務、有価証券報告書の作成。IFRS対応経験者優遇。英語力あれば尚可。', tags: ['決算', 'IFRS', '財務報告'] },
  { id: 19, title: '財務アナリスト', company: '野村ホールディングス株式会社', location: '東京', jobType: 'fulltime', salary: 700, salaryMax: 1500, experience: 3, description: '企業財務分析、投資先評価。CFA保有者優遇。高いコミュニケーション能力が必要。', tags: ['財務分析', 'CFA', '投資'] },
  { id: 20, title: 'コンサルタント（ITストラテジー）', company: 'アクセンチュア株式会社', location: '東京', jobType: 'fulltime', salary: 700, salaryMax: 1400, experience: 3, description: 'クライアントのDX推進・IT戦略立案。業界横断でプロジェクトをリード。海外案件あり。', tags: ['DX', 'IT戦略', 'コンサル'] },
  { id: 21, title: '経営コンサルタント', company: 'マッキンゼー・アンド・カンパニー', location: '東京', jobType: 'fulltime', salary: 1000, salaryMax: 2000, experience: 3, description: '大手企業の経営戦略立案・実行支援。MBA保有者歓迎。グローバルプロジェクト多数。', tags: ['経営戦略', 'MBA', 'グローバル'] },
  { id: 22, title: '看護師（病棟）', company: '社会医療法人財団慈泉会', location: '大阪', jobType: 'fulltime', salary: 400, salaryMax: 600, experience: 1, description: '内科・外科病棟での看護業務。2交代制勤務。看護師免許必須。院内保育所完備。', tags: ['看護師', '病棟', '医療'] },
  { id: 23, title: '薬剤師（調剤薬局）', company: 'ウエルシア薬局株式会社', location: '名古屋', jobType: 'fulltime', salary: 450, salaryMax: 700, experience: 0, description: '調剤・投薬指導・在庫管理。薬剤師免許必須。産休・育休取得実績多数。', tags: ['薬剤師', '調剤', '薬局'] },
  { id: 24, title: '医療事務', company: '独立行政法人国立病院機構', location: '福岡', jobType: 'fulltime', salary: 300, salaryMax: 450, experience: 0, description: '外来受付・会計・診療報酬請求業務。医療事務資格者優遇。未経験者も応募可。', tags: ['医療事務', 'レセプト', '受付'] },
  { id: 25, title: '小学校教員', company: '東京都公立小学校', location: '東京', jobType: 'fulltime', salary: 350, salaryMax: 650, experience: 0, description: '小学校での学級担任業務。教員免許（小学校）必須。安定した公務員待遇。', tags: ['教員', '小学校', '公務員'] },
  { id: 26, title: '塾講師（数学・理科）', company: '株式会社学研ホールディングス', location: '大阪', jobType: 'parttime', salary: 200, salaryMax: 400, experience: 0, description: '中学・高校生向け個別指導。週2日〜勤務可。大学生も歓迎。時給1500円〜。', tags: ['塾講師', '個別指導', '教育'] },
  { id: 27, title: 'Webデザイナー', company: '株式会社博報堂', location: '東京', jobType: 'fulltime', salary: 450, salaryMax: 750, experience: 1, description: 'Webサイト・バナー・LPのデザイン制作。Adobe CC必須。コーディング(HTML/CSS)もできると尚可。', tags: ['Webデザイン', 'Adobe', 'HTML/CSS'] },
  { id: 28, title: 'グラフィックデザイナー', company: '株式会社凸版印刷', location: '東京', jobType: 'contract', salary: 350, salaryMax: 600, experience: 1, description: 'パンフレット・ポスター・パッケージデザイン。DTP経験者歓迎。Adobe Illustrator/Photoshop必須。', tags: ['グラフィック', 'DTP', 'Adobe'] },
  { id: 29, title: '動画クリエイター', company: '株式会社UUUM', location: 'リモート', jobType: 'contract', salary: 400, salaryMax: 800, experience: 1, description: 'YouTube・TikTok向け動画の企画・撮影・編集。Adobe Premiere Pro使用。フルリモート。', tags: ['動画編集', 'YouTube', 'SNS'] },
  { id: 30, title: '建築士（設計）', company: '株式会社竹中工務店', location: '大阪', jobType: 'fulltime', salary: 550, salaryMax: 900, experience: 3, description: '商業施設・オフィスビルの設計業務。一級建築士優遇。CAD(Revit/AutoCAD)使用。', tags: ['建築士', '設計', 'CAD'] },
  { id: 31, title: '機械設計エンジニア', company: 'トヨタ自動車株式会社', location: '名古屋', jobType: 'fulltime', salary: 550, salaryMax: 950, experience: 3, description: '自動車部品の機械設計・解析。3D CAD(CATIA)使用。EVシフトに伴うモデル変更対応も。', tags: ['機械設計', 'CATIA', '自動車'] },
  { id: 32, title: '電気設計エンジニア', company: '株式会社日立製作所', location: '東京', jobType: 'fulltime', salary: 600, salaryMax: 1000, experience: 3, description: '産業用機器の電気回路設計。回路シミュレーション・基板設計経験者歓迎。', tags: ['電気設計', '回路', '制御系'] },
  { id: 33, title: '生産管理', company: '株式会社ブリヂストン', location: '福岡', jobType: 'fulltime', salary: 450, salaryMax: 750, experience: 1, description: '工場の生産計画・在庫管理・工程管理。SCM知識者優遇。製造業経験歓迎。', tags: ['生産管理', 'SCM', '製造業'] },
  { id: 34, title: '品質管理（QA）', company: 'パナソニック株式会社', location: '大阪', jobType: 'fulltime', salary: 500, salaryMax: 800, experience: 3, description: '家電製品の品質管理・改善業務。ISO/IECの知識必須。SQCツール使用経験歓迎。', tags: ['品質管理', 'QA', 'ISO'] },
  { id: 35, title: 'カスタマーサクセス', company: 'Sansan株式会社', location: 'リモート', jobType: 'fulltime', salary: 500, salaryMax: 800, experience: 1, description: 'SaaSプロダクトの顧客オンボーディング・活用支援。CRM活用による顧客管理。英語力あれば尚可。', tags: ['カスタマーサクセス', 'SaaS', 'CRM'] },
  { id: 36, title: 'カスタマーサポート', company: '株式会社ZOZO', location: '千葉', jobType: 'parttime', salary: 250, salaryMax: 350, experience: 0, description: 'EC顧客対応（メール・チャット）。週3日〜勤務可。テレワーク対応。未経験歓迎。', tags: ['カスタマーサポート', 'EC', 'テレワーク'] },
  { id: 37, title: '法務（契約審査）', company: '三菱UFJフィナンシャル・グループ', location: '東京', jobType: 'fulltime', salary: 600, salaryMax: 1100, experience: 3, description: '各種契約書の審査・作成。金融規制対応。弁護士資格者・法務経験者歓迎。', tags: ['法務', '契約', '金融'] },
  { id: 38, title: '知的財産（特許）', company: '株式会社ソニーグループ', location: '東京', jobType: 'fulltime', salary: 600, salaryMax: 1000, experience: 3, description: '特許出願・管理・ライセンス交渉。弁理士資格者優遇。技術系学部出身者歓迎。', tags: ['特許', '知財', '弁理士'] },
  { id: 39, title: 'Pythonエンジニア（AIシステム）', company: '株式会社Preferred Networks', location: '東京', jobType: 'fulltime', salary: 800, salaryMax: 1500, experience: 3, description: 'AIシステムの開発・研究。深層学習フレームワーク(PyTorch/TensorFlow)使用。論文発表実績者歓迎。', tags: ['Python', 'AI', 'PyTorch'] },
  { id: 40, title: 'クラウドアーキテクト', company: 'アマゾン ウェブ サービス ジャパン合同会社', location: '東京', jobType: 'fulltime', salary: 900, salaryMax: 1600, experience: 5, description: 'AWSソリューションの設計・提案。顧客の技術課題解決。AWS認定資格保有者優遇。', tags: ['AWS', 'クラウド', 'アーキテクト'] },
  { id: 41, title: 'スクラムマスター', company: '株式会社MoneyForward', location: 'リモート', jobType: 'fulltime', salary: 650, salaryMax: 1000, experience: 3, description: 'アジャイル開発チームのファシリテーション。スクラムイベント運営・チーム改善。CSM/PSM資格者優遇。', tags: ['スクラム', 'アジャイル', 'ファシリテーション'] },
  { id: 42, title: 'ERP導入コンサルタント（SAP）', company: '株式会社日本IBM', location: '東京', jobType: 'fulltime', salary: 700, salaryMax: 1300, experience: 5, description: 'SAP S/4HANAの導入・カスタマイズ。要件定義〜本番稼働まで担当。FICO/MMモジュール経験者優遇。', tags: ['SAP', 'ERP', 'コンサル'] },
  { id: 43, title: '社内SEシステム管理者', company: '株式会社良品計画', location: '東京', jobType: 'fulltime', salary: 450, salaryMax: 750, experience: 3, description: '社内システムの運用保守・ヘルプデスク対応。ネットワーク・サーバー管理経験者歓迎。', tags: ['社内SE', 'ITインフラ', 'ヘルプデスク'] },
  { id: 44, title: 'ゲームプランナー', company: '株式会社カプコン', location: '大阪', jobType: 'fulltime', salary: 400, salaryMax: 750, experience: 1, description: 'ゲームの企画立案・仕様書作成・進行管理。ゲームが好きな方歓迎。新卒採用あり。', tags: ['ゲーム企画', 'ゲーム', 'プランナー'] },
  { id: 45, title: 'ゲームエンジニア（Unity）', company: '株式会社コナミデジタルエンタテインメント', location: '東京', jobType: 'fulltime', salary: 500, salaryMax: 900, experience: 1, description: 'Unityを使ったスマートフォンゲーム開発。C#プログラミング経験者歓迎。新卒・第二新卒歓迎。', tags: ['Unity', 'C#', 'ゲーム'] },
  { id: 46, title: 'ブロックチェーンエンジニア', company: '株式会社HashPort', location: 'リモート', jobType: 'contract', salary: 800, salaryMax: 1400, experience: 3, description: 'Ethereum/Solidityを使ったスマートコントラクト開発。DeFi・NFTプロジェクト経験者優遇。', tags: ['ブロックチェーン', 'Solidity', 'Web3'] },
  { id: 47, title: 'データエンジニア', company: '株式会社SmartHR', location: 'リモート', jobType: 'fulltime', salary: 700, salaryMax: 1100, experience: 3, description: 'データパイプラインの設計・構築。BigQuery/dbt/Airflow使用。データ基盤の整備・改善。', tags: ['データエンジニア', 'BigQuery', 'dbt'] },
  { id: 48, title: 'MLOpsエンジニア', company: '株式会社PKSHA Technology', location: '東京', jobType: 'fulltime', salary: 750, salaryMax: 1200, experience: 3, description: 'MLモデルの本番環境への展開・監視・改善。KubeflowやMLflowを使ったMLパイプライン整備。', tags: ['MLOps', 'Python', 'Kubernetes'] },
  { id: 49, title: '経営企画', company: '株式会社サントリーホールディングス', location: '大阪', jobType: 'fulltime', salary: 600, salaryMax: 1100, experience: 5, description: '中期経営計画の策定・推進。M&A・新規事業開発。経営分析・資料作成。MBA歓迎。', tags: ['経営企画', '経営戦略', 'MBA'] },
  { id: 50, title: '事業開発（BizDev）', company: 'メドレー株式会社', location: '東京', jobType: 'fulltime', salary: 600, salaryMax: 1000, experience: 3, description: '医療・ヘルスケア領域での新規事業開発。パートナーシップ交渉・アライアンス推進。', tags: ['事業開発', 'ヘルスケア', 'アライアンス'] },
];

function matchesFilters(job, { keyword, location, jobType, minSalary, experience }) {
  if (keyword) {
    const kw = keyword.toLowerCase();
    const searchable = `${job.title} ${job.company} ${job.description} ${job.tags.join(' ')}`.toLowerCase();
    if (!searchable.includes(kw)) return false;
  }
  if (location && location !== '全国') {
    if (job.location !== location) return false;
  }
  if (jobType && jobType.length > 0) {
    if (!jobType.includes(job.jobType)) return false;
  }
  if (minSalary && parseInt(minSalary) > 0) {
    if (job.salaryMax < parseInt(minSalary)) return false;
  }
  if (experience && experience !== '0') {
    if (job.experience < parseInt(experience)) return false;
  }
  return true;
}

app.get('/api/jobs', (req, res) => {
  const { keyword, location, jobType, minSalary, experience, sort, page = 1, limit = 10 } = req.query;
  const jobTypes = jobType ? jobType.split(',') : [];

  let filtered = jobs.filter(j => matchesFilters(j, { keyword, location, jobType: jobTypes, minSalary, experience }));

  if (sort === 'salary') {
    filtered.sort((a, b) => b.salaryMax - a.salaryMax);
  } else {
    filtered.sort((a, b) => b.id - a.id);
  }

  const total = filtered.length;
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paginated = filtered.slice(start, start + parseInt(limit));

  res.json({ total, page: parseInt(page), limit: parseInt(limit), jobs: paginated });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ error: 'Not found' });
  res.json(job);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
