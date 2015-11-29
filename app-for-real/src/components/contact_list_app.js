/**
 * Created by Chrille on 2015-11-20.
 */

import React from "react";
import {ContactEntryInput} from "./contact_entry";
import ContactList from "./contact_list";
import actions from "../actions";
import _ from "lodash";

import ContactProfilePage from "./contact_profile_page";
import Search from "./search";

import ReactRedux, { connect } from "react-redux";

const NewApp = React.createClass({
    getInitialState(){
        return {
            addingContact: false
        };
    },
    contactAdded(name){
        //this.setState(this.state);
        this.props.contactAdded(name);
    },
    getContactByName(name){
        console.log("contacts", this.props);
        return this.props.contacts.contacts.filter((contact)=>contact.name === name)[0];
    },
    beginAddContact(){
        this.setState({addingContact: true});
    },
    endAddContact(){
        this.setState({addingContact: false});
    },
    render(){
        const contacts = this.props.contacts.contacts;
        let addContactElement;

        if (this.state.addingContact) {
            addContactElement = <div><ContactEntryInput onSubmit={this.contactAdded}/>
                <button onClick={this.endAddContact}>Stop adding</button>
            </div>;
        } else {
            addContactElement = <button onClick={this.beginAddContact}>Add contact</button>;
        }

        return (
            <div>
                {addContactElement}
                <ContactList contacts={contacts} onContactAdded={this.contactAdded} stateish={this.state.what}/>
                {this.props.children}
            </div>
        );
    }
});

const stateToProp = (state) => {
    return {
        contacts: state.contacts
    };
};
const dispatchToProps = (dispatch) => {
    return {
        contactAdded: (name) => dispatch(actions.addContact(name)),
    };
};
const NewAppCont = connect(stateToProp, dispatchToProps)(NewApp);
export default NewAppCont;
module.exports = NewAppCont;