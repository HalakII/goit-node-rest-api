import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (listContacts) =>
  writeFile(contactsPath, JSON.stringify(listContacts, null, 2));

export const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const listOfContacts = await listContacts();
  const needContact = listOfContacts.find(
    (contact) => contact.id === contactId
  );
  return needContact || null;
};

export const addContact = async ({ name, email, phone }) => {
  const listOfContacts = await listContacts();
  const addedContact = { id: nanoid(), name, email, phone };
  listOfContacts.push(addedContact);
  await updateContacts(listOfContacts);
  return addedContact;
};

export const removeContact = async (contactId) => {
  const listOfContacts = await listContacts();
  const deletedContactIndex = listOfContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (deletedContactIndex !== -1) {
    const [deletedContact] = listOfContacts.splice(deletedContactIndex, 1);
    await updateContacts(listOfContacts);
    return deletedContact;
  }
  return null;
};
export const updateContactById = async (contactId, data) => {
  const listOfContacts = await listContacts();
  const updateContactIndex = listOfContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (updateContactIndex !== -1) {
    const updatedContact = { ...listOfContacts[updateContactIndex], ...data };
    listOfContacts[updateContactIndex] = updatedContact;

    await updateContacts(listOfContacts);
    return updatedContact;
  }
  return null;
};
