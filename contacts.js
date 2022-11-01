const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    return JSON.parse(
      await fs.readFile(contactsPath, (err) => {
        if (err) return err.message;
      })
    );
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter(({ id }) => id === contactId.toString());
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) console.error(err);
    });
    return updatedContacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: (Number(contacts[contacts.length - 1].id) + 1).toString(),
      name,
      email,
      phone,
    };
    const newContactsList = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (err) => {
      if (err) console.error(err);
    });
    return newContactsList;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
