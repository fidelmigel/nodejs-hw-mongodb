import { SORT_ORDER } from '../constants/index.js';

const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
  ];

  if (keysOfContacts.includes(sortBy)) {
    return sortBy;
  }
  return 'name';
};

const parseSortOrder = (sortOrder) => {
  const isKnowOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnowOrder) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
