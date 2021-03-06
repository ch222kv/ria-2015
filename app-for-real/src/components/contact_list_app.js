/**
 * Created by Chrille on 2015-11-20.
 */

import React from "react";
import {ContactEntryInput} from "./contact_entry";
import ContactList from "./contact_list";
import actions from "../actions";
import _ from "lodash";

import ContactProfilePage from "./contact_profile_page";

import ReactRedux, { connect } from "react-redux";

const NewApp = React.createClass({
    endAddContact(){
        this.props.endAddContact();
    },
    beginAddContact(){
        this.props.beginAddContact();
    },
    contactAdded(contact){
        this.props.contactAdded(contact);
    },
    removeContact(id){
        this.props.contactRemoved(id);
        this.props.history.pushState(null, '/contacts/');
    },
    saveContact(contact){
        this.props.saveContact(id);
    },
    getContactByName(name){
        console.log("contacts", this.props);
        return this.props.contacts.filter((contact)=>contact.name === name)[0];
    },
    render(){
        console.log("Contact list app props: ", this.props);
        const contacts = this.props.contacts.contacts;
        let addContactElement;

        if (this.props.contacts.addingContact) {
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
    }
});

const stateToProp = (state) => {
    console.log(state);
    return {
        contacts: state.contacts
    };
};
const dispatchToProps = (dispatch) => {
    return {
        contactAdded: (name) => dispatch(actions.addContact(name)),
        contactRemoved: (id) => dispatch(actions.removeContact(id)),
        beginAddContact: () => dispatch(actions.beginAddContact()),
        endAddContact: () => dispatch(actions.endAddContact())
    };
};
const NewAppCont = connect(stateToProp, dispatchToProps)(NewApp);
export default NewAppCont;