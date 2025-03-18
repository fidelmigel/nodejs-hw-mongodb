import { SORT_ORDER } from '../constants/index.js';
import Contacts from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find();

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

export async function getContactById(id) {
  const contact = await Contacts.findById(id);
  return contact;
}

export async function createContact(payload) {
  const contact = await Contacts.create(payload);
  return contact;
}

export async function updateContact(contactId, contact) {
  return await Contacts.findByIdAndUpdate(contactId, contact, { new: true });
}

export async function deleteContact(contactId) {
  return await Contacts.findByIdAndDelete(contactId);
}
