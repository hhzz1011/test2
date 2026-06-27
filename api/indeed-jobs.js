const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const cachePath = path.join(process.cwd(), 'data', 'indeed-cache.json');
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
};
