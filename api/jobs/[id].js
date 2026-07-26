const jobs = require('../../lib/jobs');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const id = parseInt(req.query.id);
  const job = jobs.find(j => j.id === id);
  if (!job) {
    return res.status(404).json({ error: '求人が見つかりません' });
  }
  res.json(job);
};
