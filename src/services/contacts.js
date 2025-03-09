import Contacts from '../models/contact.js';

export async function getAllContacts() {
  const contacts = await Contacts.find();

  return contacts;
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
