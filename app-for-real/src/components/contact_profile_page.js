/**
 * Created by chris on 2015-11-24.
 */

import React from "react";
import ContactProfile from "./contact_profile";
import {Link} from "react-router";

import {ContactEntryInput} from "./contact_entry";
import ContactList from "./contact_list";
import actions from "../actions";
import _ from "lodash";

import ReactRedux, { connect } from "react-redux";

const ContactProfilePage = React.createClass({
    getContactByName(name){
        console.log(name);
        console.log(this.props);
        const contact = this.props.contacts.contacts.filter((c)=>c.name == name)[0]
        console.log(contact);
        return contact;
    },
    render(){
        const contact = this.getContactByName(this.props.params.name);
        console.log("Contact profile page", this.props);
        if (contact) {
            return (
                <div className={contact === undefined ? "profile-page hidden" : "profile-page"}>
                    <h1>{contact.name}</h1>
                    <Link to={'/contacts'} className="close-button">X</Link>
                    <ContactProfile contact={contact} onRemoveContact={this.props.contactRemoved}
                                    onSubmit={this.props.contactAdded}/>
                </div>
            );
        } else {
            return (
                <div className="profile-page">
                    <h1>Contact doesn't exist</h1>
                    <Link to={'/contacts'} className="close-button">X</Link>
                </div>
            );
        }
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
        contactRemoved: (id) => dispatch(actions.removeContact(id)),
    };
};

const ContactProfilePageCont = connect(stateToProp, dispatchToProps)(ContactProfilePage);
export default ContactProfilePageCont;
module.exports = ContactProfilePageCont;