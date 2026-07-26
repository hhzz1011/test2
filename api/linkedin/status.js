const linkedin = require('../../lib/linkedin');

// フロントがログインボタンを出すかどうか判定するための軽量エンドポイント
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  res.json({ configured: linkedin.isConfigured(), scope: linkedin.SCOPE });
};
