import s from './App.module.css';
import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = data => {
    const { contacts } = this.state;
    const names = contacts.map(contact => contact.name.toLowerCase());

    names.includes(data.name.toLowerCase())
      ? alert(`${data.name} is already in contact`)
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    const lowerCaseFilter= e.currentTarget.value.toLowerCase();
    this.setState({ filter: lowerCaseFilter});
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <>
        <div className={s.container}>
          <h1 className={s.title}>Phonebook</h1>
          <ContactForm onSubmit={this.addContacts}/>
          <h2 className={s.title}>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContact}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
