function baseSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function uniqueSlug(title) {
  const b = baseSlug(title);
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${b}-${suffix}`;
}

module.exports = { uniqueSlug };
