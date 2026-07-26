// LinkedIn OAuth 2.0 (OpenID Connect) 連携の共通ロジック
// server.js（ローカル）と api/linkedin/*.js（Vercel）の両方から利用する

const crypto = require('crypto');

const AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const USERINFO_URL = 'https://api.linkedin.com/v2/userinfo';
const SCOPE = 'openid profile email';
const STATE_COOKIE = 'li_state';

function getConfig() {
  return {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI,
  };
}

// 3つの環境変数が揃っているときのみ連携を有効にする。
// 未設定でもアプリ全体は動作させたいので、ここで判定してUI側を出し分ける。
function isConfigured() {
  const { clientId, clientSecret, redirectUri } = getConfig();
  return Boolean(clientId && clientSecret && redirectUri);
}

function createState() {
  return crypto.randomBytes(16).toString('hex');
}

function buildAuthUrl(state) {
  const { clientId, redirectUri } = getConfig();
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: SCOPE,
  });
  return AUTH_URL + '?' + params.toString();
}

async function exchangeCodeForToken(code) {
  const { clientId, clientSecret, redirectUri } = getConfig();
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error('LinkedIn token exchange failed (' + res.status + '): ' + detail);
  }

  const json = await res.json();
  if (!json.access_token) {
    throw new Error('LinkedIn token response did not contain access_token');
  }
  return json.access_token;
}

async function fetchUserInfo(accessToken) {
  const res = await fetch(USERINFO_URL, {
    headers: { Authorization: 'Bearer ' + accessToken },
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error('LinkedIn userinfo failed (' + res.status + '): ' + detail);
  }
  return res.json();
}

// state を httpOnly Cookie に保存してCSRFを防ぐ
function stateCookie(state) {
  const parts = [
    STATE_COOKIE + '=' + state,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=600',
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}

function clearStateCookie() {
  return STATE_COOKIE + '=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
}

function readStateCookie(req) {
  // Express の cookie-parser に依存しないよう自前でパースする
  const header = req.headers && req.headers.cookie;
  if (!header) return null;
  for (const pair of header.split(';')) {
    const idx = pair.indexOf('=');
    if (idx === -1) continue;
    if (pair.slice(0, idx).trim() === STATE_COOKIE) {
      return pair.slice(idx + 1).trim();
    }
  }
  return null;
}

module.exports = {
  SCOPE,
  isConfigured,
  createState,
  buildAuthUrl,
  exchangeCodeForToken,
  fetchUserInfo,
  stateCookie,
  clearStateCookie,
  readStateCookie,
};
