import { SORT_ORDER } from '../constants/index.js';
import Contacts from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contacts.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(id, userId) {
  const contact = await Contacts.findOne({ _id: id, userId });

  return contact;
}

export async function createContact(payload) {
  const contact = await Contacts.create(payload);
  return contact;
}

export async function updateContact(contactId, userId, contact) {
  return await Contacts.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });
}

export async function deleteContact(contactId, userId) {
  return await Contacts.findOneAndDelete({ _id: contactId, userId });
}
