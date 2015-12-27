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
        return this.props.contacts.contacts.filter((c)=>c.name == name)[0];
    },
    handleRemoveContact(id){
        this.props.contactRemoved(id);
        this.props.history.pushState(null, "/contacts");
    },
    render(){
        const contact = this.getContactByName(this.props.params.name) || {name: ""};
        console.log(this.props);

        return (
            <div className={contact === undefined ? "profile-page hidden" : "profile-page"}>
                <h1>{contact.name || "Contact doesn't exist"}</h1>
                {contact.name ? this.props.children : ''}
                <Link to={'/contacts'} className="close-button">X</Link>
            </div>
        )
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
        contactBeginEdit: (id) => dispatch(actions.beginEdit(id)),
        contactSaved: contact => dispatch(actions.saveContact(contact))
    };
};

const ContactProfilePageCont = connect(stateToProp, dispatchToProps)(ContactProfilePage);
export default ContactProfilePageCont;