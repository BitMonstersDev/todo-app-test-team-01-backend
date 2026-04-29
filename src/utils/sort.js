function compareValues(aValue, bValue) {
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return aValue.localeCompare(bValue);
  }

  if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
    return Number(aValue) - Number(bValue);
  }

  const aTime = Date.parse(aValue);
  const bTime = Date.parse(bValue);
  if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
    return aTime - bTime;
  }

  return aValue > bValue ? 1 : -1;
}

function sortItems(items, { sortBy, sortOrder }) {
  const direction = sortOrder === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => compareValues(a[sortBy], b[sortBy]) * direction);
}

module.exports = {
  sortItems,
};
