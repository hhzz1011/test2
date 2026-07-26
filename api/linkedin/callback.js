const linkedin = require('../../lib/linkedin');

function redirectHome(res, params) {
  const query = new URLSearchParams(params).toString();
  res.setHeader('Set-Cookie', linkedin.clearStateCookie());
  res.writeHead(302, { Location: '/?' + query });
  res.end();
}

// GET /api/linkedin/callback - OAuth のコールバック
module.exports = async (req, res) => {
  if (!linkedin.isConfigured()) {
    res.statusCode = 503;
    return res.json({ error: 'LinkedIn連携が未設定です' });
  }

  const { code, state, error, error_description: errorDescription } = req.query || {};

  // ユーザーが承認をキャンセルした場合など
  if (error) {
    return redirectHome(res, { li_error: errorDescription || error });
  }

  const expectedState = linkedin.readStateCookie(req);
  if (!state || !expectedState || state !== expectedState) {
    return redirectHome(res, { li_error: '認証リクエストの検証に失敗しました（state不一致）' });
  }

  if (!code) {
    return redirectHome(res, { li_error: '認証コードが取得できませんでした' });
  }

  try {
    const accessToken = await linkedin.exchangeCodeForToken(code);
    const profile = await linkedin.fetchUserInfo(accessToken);

    return redirectHome(res, {
      li_name: profile.name || '',
      li_picture: profile.picture || '',
      li_email: profile.email || '',
    });
  } catch (err) {
    console.error('LinkedIn callback error:', err);
    return redirectHome(res, { li_error: 'LinkedIn連携に失敗しました' });
  }
};
