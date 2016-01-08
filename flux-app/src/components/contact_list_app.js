/**
 * Created by Chrille on 2015-11-20.
 */

import React from "react";
import {ContactEntryInput} from "./contact_entry";
import ContactList from "./contact_list";
import _ from "lodash";

import ContactProfilePage from "./contact_profile_page";
import ContactStore from "../stores/ContactStore";

import ContactActions from "../actions/ContactActions";

const NewApp = React.createClass({
    getInitialState(){
        return {contacts: ContactStore.getState()};
    },
    endAddContact(){
        ContactActions.endAddContact();
    },
    beginAddContact(){
        ContactActions.beginAddContact();
    },
    contactAdded(contact){
        ContactActions.addContact(contact);
    },
    removeContact(id){
        ChatActions.removeContact(id);
    },
    saveContact(contact){
        ContactActions.saveContact(id);
    },
    getContactByName(name){
        console.log("contacts", this.props);
        return this.state.contacts.filter((contact)=>contact.name === name)[0];
    },
    render(){
        console.log("Contact list app props: ", this.props);
        const contacts = this.state.contacts.contacts;
        let addContactElement;

        if (this.state.contacts.addingContact) {
            addContactElement = <div><ContactEntryInput onSubmit={this.contactAdded}/>
                <button onClick={this.endAddContact}>Stop adding</button>
            </div>;
        } else {
            addContactElement = <button onClick={this.beginAddContact}>Add contact</button>;
        }
        return (
            <div>
                <div><h2>Adding contact</h2>
                    {addContactElement}
                </div>
                <ContactList contacts={contacts} onContactAdded={this.contactAdded}/>
                {this.props.children}
            </div>
        );
    },
    componentDidMount(){
        ContactStore.addChangeListener(this._onChange);
    },
    componentWillUnmount(){
        ContactStore.removeChangeListener(this._onChange);
    },
    _onChange(){
        this.setState({contacts: ContactStore.getState()});
    }
});

/*const dispatchToProps = (dispatch) => {
 return {
 contactAdded: (name) => dispatch(actions.addContact(name)),
 contactRemoved: (id) => dispatch(actions.removeContact(id)),
 beginAddContact: () => dispatch(actions.beginAddContact()),
 endAddContact: () => dispatch(actions.endAddContact())
 };
 };*/
export default NewApp;