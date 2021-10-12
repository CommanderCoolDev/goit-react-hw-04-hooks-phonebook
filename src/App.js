import { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from 'Components/ContactForm/ContactForm';
import ContactList from 'Components/ContactList/ContactList';
import Filter from 'Components/Filter/Filter';

import './App.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      // contacts.filter(contact => contact.name.toLowerCase().includes(contact)).length > 0
      contacts.find(
        con => con.name.toLowerCase() === newContact.name.toLowerCase(),
      )
    ) {
      alert(`${name} is alresdy in contacts`);
      return;
    }
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  const onContactsFilter = () => {
    // const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const onDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    // setContacts(prevContacts => ({
    //    contacts.filter(contact => contact.id !== contactId),
    // }));
  };

  return (
    <div className="block">
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={onFilter} />
      <ContactList contacts={onContactsFilter()} onDelete={onDelete} />
    </div>
  );
}
