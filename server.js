const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const clubs = [
  {
    id: 1,
    name: 'Club Womb',
    area: '渋谷',
    address: '東京都渋谷区円山町2-16',
    genre: ['テクノ', 'ハウス'],
    capacity: 1000,
    openHours: '23:00 - 05:00',
    phone: '03-5459-0039',
    website: 'https://www.womb.co.jp',
    lat: 35.6580,
    lng: 139.6982,
    discounts: [
      { type: 'ゲストリスト', description: '事前ゲストリスト登録で入場料50%OFF', condition: '23:00前入場', validUntil: '2026-12-31' },
      { type: '女性割引', description: '女性は深夜1時まで無料入場', condition: '女性限定', validUntil: '2026-12-31' }
    ],
    tags: ['外国人フレンドリー', '国際DJ', 'VIPあり'],
    image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=400'
  },
  {
    id: 2,
    name: 'ageHa',
    area: '新木場',
    address: '東京都江東区新木場2-2-10',
    genre: ['テクノ', 'トランス', 'ハウス'],
    capacity: 3000,
    openHours: '23:00 - 05:00',
    phone: '03-5534-2525',
    website: 'https://www.ageha.com',
    lat: 35.6319,
    lng: 139.8040,
    discounts: [
      { type: 'ゲストリスト', description: 'ゲストリスト登録で¥1,000OFF', condition: '24:00前入場', validUntil: '2026-12-31' },
      { type: '早割', description: '23:30前入場で¥500割引', condition: '時間限定', validUntil: '2026-12-31' }
    ],
    tags: ['大型クラブ', 'アウトドアエリア', 'プールあり'],
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400'
  },
  {
    id: 3,
    name: 'SOUND MUSEUM VISION',
    area: '渋谷',
    address: '東京都渋谷区道玄坂2-10-7',
    genre: ['ハウス', 'テクノ', 'ヒップホップ'],
    capacity: 800,
    openHours: '22:00 - 05:00',
    phone: '03-5728-2824',
    website: 'https://vision-tokyo.com',
    lat: 35.6590,
    lng: 139.6990,
    discounts: [
      { type: 'ゲストリスト', description: 'スタッフゲストリストで入場料無料', condition: '23:00前・限定30名', validUntil: '2026-12-31' },
      { type: 'グループ割', description: '5名以上グループで各¥500OFF', condition: 'グループ限定', validUntil: '2026-12-31' }
    ],
    tags: ['複数フロア', 'VIPルーム', 'バー充実'],
    image: 'https://images.unsplash.com/photo-1520095972714-909e91b038e5?w=400'
  },
  {
    id: 4,
    name: 'Club Asia',
    area: '渋谷',
    address: '東京都渋谷区円山町1-8',
    genre: ['ヒップホップ', 'R&B', 'レゲエ'],
    capacity: 600,
    openHours: '22:00 - 05:00',
    phone: '03-5458-2551',
    website: 'https://www.clubasia.co.jp',
    lat: 35.6575,
    lng: 139.6978,
    discounts: [
      { type: 'ゲストリスト', description: 'ゲストリスト登録で入場料30%OFF', condition: '23:00前入場', validUntil: '2026-12-31' },
      { type: 'カップル割', description: 'カップルで入場すると2人で¥1,000OFF', condition: 'カップル限定', validUntil: '2026-12-31' }
    ],
    tags: ['ヒップホップ特化', 'ドリンク充実', '喫煙ルームあり'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  },
  {
    id: 5,
    name: 'MAHARAJA Roppongi',
    area: '六本木',
    address: '東京都港区六本木3-8-15',
    genre: ['J-POP', 'ディスコ', 'ダンス'],
    capacity: 500,
    openHours: '21:00 - 05:00',
    phone: '03-3404-5551',
    website: 'https://www.maharaja.com',
    lat: 35.6640,
    lng: 139.7310,
    discounts: [
      { type: 'ゲストリスト', description: 'VIPゲストリスト登録で優先入場+フリードリンク1時間', condition: '22:00前入場', validUntil: '2026-12-31' },
      { type: '誕生日特典', description: '誕生日当日は入場無料+シャンパン1本', condition: '要証明書', validUntil: '2026-12-31' }
    ],
    tags: ['VIP重視', '豪華内装', 'バブル期レジェンド'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400'
  },
  {
    id: 6,
    name: 'The Room',
    area: '渋谷',
    address: '東京都渋谷区宇田川町6-7',
    genre: ['ハウス', 'ダウンテンポ'],
    capacity: 200,
    openHours: '23:00 - 05:00',
    phone: '03-3461-7285',
    website: '#',
    lat: 35.6617,
    lng: 139.6979,
    discounts: [
      { type: 'ゲストリスト', description: '定員制ゲストリストで入場料無料', condition: '限定20名・23:30前入場', validUntil: '2026-12-31' }
    ],
    tags: ['小箱', 'アンダーグラウンド', 'こだわり音響'],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400'
  },
  {
    id: 7,
    name: 'Oath',
    area: '渋谷',
    address: '東京都渋谷区道玄坂1-7-1',
    genre: ['ヒップホップ', 'トラップ', 'R&B'],
    capacity: 400,
    openHours: '22:00 - 05:00',
    phone: '03-6427-8041',
    website: '#',
    lat: 35.6594,
    lng: 139.6984,
    discounts: [
      { type: 'ゲストリスト', description: 'ゲストリストで入場料¥1,500→¥500', condition: '23:00前入場', validUntil: '2026-12-31' },
      { type: '女性割引', description: '女性は23:30まで無料', condition: '女性限定', validUntil: '2026-12-31' }
    ],
    tags: ['ヒップホップ', '若者向け', 'ドレスコードあり'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'
  },
  {
    id: 8,
    name: 'MUSE',
    area: '六本木',
    address: '東京都港区六本木4-1-1',
    genre: ['ポップ', 'R&B', 'ダンス'],
    capacity: 700,
    openHours: '21:00 - 05:00',
    phone: '03-5786-0002',
    website: '#',
    lat: 35.6620,
    lng: 139.7290,
    discounts: [
      { type: 'ゲストリスト', description: 'スタッフゲストリストで男性¥2,000OFF', condition: '22:00前入場', validUntil: '2026-12-31' },
      { type: '女性割引', description: '女性は終日入場無料', condition: '女性限定', validUntil: '2026-12-31' }
    ],
    tags: ['六本木定番', '外国人多め', 'ドレスコードあり'],
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400'
  }
];

// GET /api/clubs
app.get('/api/clubs', (req, res) => {
  const { area, genre, discountType, keyword } = req.query;
  let result = [...clubs];

  if (area) result = result.filter(c => c.area === area);
  if (genre) result = result.filter(c => c.genre.some(g => g.includes(genre)));
  if (discountType) result = result.filter(c => c.discounts.some(d => d.type === discountType));
  if (keyword) {
    const kw = keyword.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(kw) ||
      c.area.includes(kw) ||
      c.genre.some(g => g.includes(kw)) ||
      c.tags.some(t => t.includes(kw))
    );
  }

  res.json({ total: result.length, clubs: result });
});

// GET /api/clubs/:id
app.get('/api/clubs/:id', (req, res) => {
  const club = clubs.find(c => c.id === parseInt(req.params.id));
  if (!club) return res.status(404).json({ error: 'クラブが見つかりません' });
  res.json(club);
});

// GET /api/areas
app.get('/api/areas', (req, res) => {
  res.json([...new Set(clubs.map(c => c.area))]);
});

// GET /api/genres
app.get('/api/genres', (req, res) => {
  res.json([...new Set(clubs.flatMap(c => c.genre))]);
});

// POST /api/guestlist
app.post('/api/guestlist', (req, res) => {
  const { clubId, name, email, date, partySize } = req.body;
  if (!clubId || !name || !email) {
    return res.status(400).json({ error: '必須項目が不足しています' });
  }
  const club = clubs.find(c => c.id === parseInt(clubId));
  if (!club) return res.status(404).json({ error: 'クラブが見つかりません' });

  res.json({
    success: true,
    message: `${club.name} のゲストリストに登録しました`,
    registration: {
      clubId, clubName: club.name, name, email,
      date: date || new Date().toISOString().split('T')[0],
      partySize: partySize || 1,
      registeredAt: new Date().toISOString()
    }
  });
});

// GET /api/favorites - demo endpoint
app.get('/api/favorites', (req, res) => {
  res.json({ favorites: [] });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tokyo Club Discount App running on http://localhost:${PORT}`);
});
