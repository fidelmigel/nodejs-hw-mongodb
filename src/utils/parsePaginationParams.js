const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) {
    return defaultValue;
  }
  const parseNumber = parseInt(number);

  if (Number.isNaN(parseNumber)) {
    return defaultValue;
  }
  return parseNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);

  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
