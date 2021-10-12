import { useState, useEffect} from 'react';
import shortid from 'shortid';
import ContactForm from 'Components/ContactForm/ContactForm';
import ContactList from 'Components/ContactList/ContactList';
import Filter from 'Components/Filter/Filter';

import './App.css';

export default function App () {
  const [contacts, setContacts] = useState (() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState ('');
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  useEffect (() => {
   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

  // componentDidMount() {
  //   const contacts = localStorage.getItem('localDataContacts');
  //   const parsContacts = JSON.parse(contacts);
  //   if (parsContacts) {
  //     this.setState({ contacts: parsContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem(
  //       'localDataContacts',
  //       JSON.stringify(this.state.contacts),
  //     );
  //   }
  // }

 const addContact = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.filter(contact => contact.name.toLowerCase().includes(contact)).length > 0
      // this.state.contacts.find(
      //   con => con.name.toLowerCase() === contact.name.toLowerCase(),
      // )
    ) {
      alert(`${contacts.name} is alresdy in contacts`);
      return;
    } else
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      }));
  };

 const onFilter = e => {
    this.setState({ filter: e.target.value });
  };

 const onContactsFilter = () => {
    // const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

 const onDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

 
  
    return (
      <div className="block">
        <h2>Phonebook</h2>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilter={onFilter} />
        <ContactList
          contacts={onContactsFilter()}
          onDelete={onDelete}
        />
      </div>
    );
  
}
