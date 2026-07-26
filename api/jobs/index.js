const jobs = require('../../lib/jobs');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

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

  if (location && location !== '全国') {
    if (location === 'リモート') {
      filtered = filtered.filter(job => job.location === 'リモート' || job.jobType === 'remote');
    } else {
      filtered = filtered.filter(job => job.location === location);
    }
  }

  if (jobType) {
    const types = jobType.split(',').map(t => t.trim()).filter(Boolean);
    if (types.length > 0) {
      filtered = filtered.filter(job => types.includes(job.jobType));
    }
  }

  if (salary) {
    const minSal = parseInt(salary);
    if (!isNaN(minSal)) {
      filtered = filtered.filter(job => job.salary >= minSal);
    }
  }

  if (experience && experience !== '不問') {
    const expMap = { '1年以上': 1, '3年以上': 3, '5年以上': 5 };
    const minExp = expMap[experience];
    if (minExp !== undefined) {
      filtered = filtered.filter(job => job.experience >= minExp);
    }
  }

  if (sort === 'salary') {
    filtered.sort((a, b) => b.salary - a.salary);
  } else {
    filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }

  const total = filtered.length;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(50, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  res.json({
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    jobs: filtered.slice(offset, offset + limitNum)
  });
};
