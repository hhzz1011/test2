const linkedin = require('../../lib/linkedin');

// GET /api/linkedin/auth - LinkedIn の認証画面へリダイレクトする
module.exports = (req, res) => {
  if (!linkedin.isConfigured()) {
    res.statusCode = 503;
    return res.json({
      error: 'LinkedIn連携が未設定です',
      required: ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET', 'LINKEDIN_REDIRECT_URI'],
      docs: 'README.md の「LinkedIn連携のセットアップ」を参照してください',
    });
  }

  const state = linkedin.createState();
  res.setHeader('Set-Cookie', linkedin.stateCookie(state));
  res.writeHead(302, { Location: linkedin.buildAuthUrl(state) });
  res.end();
};
