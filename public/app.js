const API = '';
let allClubs = [];
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-' + view).classList.add('active');
    if (view === 'favorites') renderFavorites();
  });
});

// Load initial data
async function init() {
  await Promise.all([loadAreas(), loadGenres(), loadClubs()]);
  populateGuestlistSelect();
}

async function loadAreas() {
  try {
    const res = await fetch(API + '/api/areas');
    const areas = await res.json();
    const sel = document.getElementById('filterArea');
    areas.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a; opt.textContent = a;
      sel.appendChild(opt);
    });
  } catch(e) {}
}

async function loadGenres() {
  try {
    const res = await fetch(API + '/api/genres');
    const genres = await res.json();
    const sel = document.getElementById('filterGenre');
    genres.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g; opt.textContent = g;
      sel.appendChild(opt);
    });
  } catch(e) {}
}

async function loadClubs(params = {}) {
  const qs = new URLSearchParams(params).toString();
  try {
    const res = await fetch(API + '/api/clubs' + (qs ? '?' + qs : ''));
    const data = await res.json();
    allClubs = data.clubs;
    document.getElementById('resultMeta').textContent = `${data.total} 件のクラブが見つかりました`;
    renderClubs(data.clubs);
  } catch(e) {
    document.getElementById('clubsGrid').innerHTML = '<p style="color:var(--text-muted)">データの取得に失敗しました</p>';
  }
}

function renderClubs(clubs) {
  const grid = document.getElementById('clubsGrid');
  if (!clubs.length) {
    grid.innerHTML = '<div class="empty-state"><span class="empty-icon">🔍</span><p>条件に合うクラブが見つかりませんでした</p></div>';
    return;
  }
  grid.innerHTML = clubs.map(club => clubCard(club)).join('');
  grid.querySelectorAll('.club-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('fav-btn')) return;
      openModal(parseInt(card.dataset.id));
    });
  });
  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleFavorite(parseInt(btn.dataset.id), btn));
  });
}

function clubCard(club) {
  const isFav = favorites.includes(club.id);
  const discountBadges = club.discounts.slice(0, 2).map(d => `
    <div class="discount-badge">
      <div class="discount-type">${d.type}</div>
      <div class="discount-desc">${d.description}</div>
      <div class="discount-condition">📌 ${d.condition}</div>
    </div>
  `).join('');
  const genreTags = club.genre.map(g => `<span class="genre-tag">${g}</span>`).join('');
  const tags = club.tags.map(t => `<span class="tag-chip">${t}</span>`).join('');

  return `
    <div class="club-card" data-id="${club.id}">
      <img class="club-card-img" src="${club.image}" alt="${club.name}" onerror="this.style.background='#1e1e2e'">
      <div class="club-card-body">
        <div class="club-card-header">
          <div class="club-name">${club.name}</div>
          <button class="fav-btn" data-id="${club.id}" title="${isFav ? 'お気に入り解除' : 'お気に入り追加'}">${isFav ? '⭐' : '☆'}</button>
        </div>
        <div class="club-area">📍 ${club.area} · ${club.openHours}</div>
        <div class="club-genres">${genreTags}</div>
        <div class="club-discounts">${discountBadges}</div>
        <div class="club-tags">${tags}</div>
      </div>
    </div>
  `;
}

function toggleFavorite(id, btn) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    btn.textContent = '☆';
    btn.title = 'お気に入り追加';
  } else {
    favorites.push(id);
    btn.textContent = '⭐';
    btn.title = 'お気に入り解除';
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavorites() {
  const grid = document.getElementById('favoritesGrid');
  const favClubs = allClubs.filter(c => favorites.includes(c.id));
  if (!favClubs.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">⭐</span>
        <p>お気に入りはまだありません</p>
        <p class="empty-sub">クラブカードの ☆ をタップして追加しましょう</p>
      </div>`;
    return;
  }
  grid.innerHTML = favClubs.map(c => clubCard(c)).join('');
  grid.querySelectorAll('.club-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('fav-btn')) return;
      openModal(parseInt(card.dataset.id));
    });
  });
  grid.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleFavorite(parseInt(btn.dataset.id), btn);
      renderFavorites();
    });
  });
}

// Modal
async function openModal(id) {
  const club = allClubs.find(c => c.id === id) || await fetch(API + '/api/clubs/' + id).then(r => r.json());
  const isFav = favorites.includes(club.id);

  document.getElementById('modalBody').innerHTML = `
    <img src="${club.image}" alt="${club.name}" onerror="this.style.display='none'">
    <div class="modal-info">
      <div class="modal-name">${club.name}</div>
      <div class="modal-area">📍 ${club.area} · ${club.address}</div>
      <div class="modal-meta">
        <div class="meta-item"><div class="meta-label">営業時間</div><div class="meta-value">🕐 ${club.openHours}</div></div>
        <div class="meta-item"><div class="meta-label">収容人数</div><div class="meta-value">👥 ${club.capacity}名</div></div>
        <div class="meta-item"><div class="meta-label">電話番号</div><div class="meta-value">📞 ${club.phone}</div></div>
        <div class="meta-item"><div class="meta-label">ジャンル</div><div class="meta-value">🎵 ${club.genre.join('・')}</div></div>
      </div>
      <div class="modal-section-title">ゲストディスカウント情報</div>
      <div class="modal-discounts">
        ${club.discounts.map(d => `
          <div class="modal-discount-card">
            <div class="discount-type">${d.type}</div>
            <div class="discount-desc">${d.description}</div>
            <div class="discount-condition">📌 条件: ${d.condition} · 有効期限: ${d.validUntil}</div>
          </div>
        `).join('')}
      </div>
      <div class="modal-section-title">タグ</div>
      <div class="modal-tags">
        ${club.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
      </div>
      <div class="modal-actions">
        <button class="btn-primary" onclick="goToGuestlist(${club.id})">ゲストリスト登録</button>
        <button class="fav-btn-modal btn-secondary" onclick="toggleFavModal(${club.id}, this)" style="font-size:16px">
          ${isFav ? '⭐ お気に入り解除' : '☆ お気に入り追加'}
        </button>
      </div>
    </div>
  `;
  document.getElementById('clubModal').style.display = 'flex';
}

window.goToGuestlist = function(clubId) {
  closeModal();
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelector('[data-view="guestlist"]').classList.add('active');
  document.getElementById('view-guestlist').classList.add('active');
  document.getElementById('glClub').value = clubId;
};

window.toggleFavModal = function(id, btn) {
  toggleFavorite(id, { textContent: '', title: '' });
  const isFav = favorites.includes(id);
  btn.textContent = isFav ? '⭐ お気に入り解除' : '☆ お気に入り追加';
};

function closeModal() {
  document.getElementById('clubModal').style.display = 'none';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Search & Filters
document.getElementById('searchBtn').addEventListener('click', runSearch);
document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });
document.getElementById('filterArea').addEventListener('change', runSearch);
document.getElementById('filterGenre').addEventListener('change', runSearch);
document.getElementById('filterDiscount').addEventListener('change', runSearch);

function runSearch() {
  const params = {};
  const kw = document.getElementById('searchInput').value.trim();
  const area = document.getElementById('filterArea').value;
  const genre = document.getElementById('filterGenre').value;
  const discount = document.getElementById('filterDiscount').value;
  if (kw) params.keyword = kw;
  if (area) params.area = area;
  if (genre) params.genre = genre;
  if (discount) params.discountType = discount;
  loadClubs(params);
}

// Guestlist Form
function populateGuestlistSelect() {
  const sel = document.getElementById('glClub');
  allClubs.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.name;
    sel.appendChild(opt);
  });
}

document.getElementById('guestlistForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    clubId: document.getElementById('glClub').value,
    name: document.getElementById('glName').value,
    email: document.getElementById('glEmail').value,
    date: document.getElementById('glDate').value,
    partySize: document.getElementById('glPartySize').value
  };
  try {
    const res = await fetch(API + '/api/guestlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('guestlistForm').style.display = 'none';
      const msg = document.getElementById('glSuccess');
      msg.style.display = 'block';
      msg.innerHTML = `
        ✅ <strong>${data.message}</strong><br><br>
        クラブ: ${data.registration.clubName}<br>
        お名前: ${data.registration.name}<br>
        来店日: ${data.registration.date}<br>
        人数: ${data.registration.partySize}名<br><br>
        <small style="color:var(--text-muted)">登録ID: ${new Date(data.registration.registeredAt).getTime()}</small>
      `;
    }
  } catch(e) {
    alert('登録に失敗しました。もう一度お試しください。');
  }
});

init();
