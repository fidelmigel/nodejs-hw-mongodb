const parseType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) {
    return;
  }

  const isType = (type) => {
    return ['work', 'home', 'personal'].includes(type);
  };
  if (isType(type)) {
    return type;
  }
};

const parseIsFavourite = (bool) => {
  if (typeof bool === 'string') {
    if (bool.toLowerCase() === 'true') {
      return true;
    }
    if (bool.toLowerCase() === 'false') {
      return false;
    }
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
