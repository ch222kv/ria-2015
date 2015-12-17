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
        handleRemoveContact(id){
            this.props.contactRemoved(id);
            this.props.history.pushState(null, "/contacts");
        },
        render(){
            console.log("Contact profile page", this.props);
            const contact = this.getContactByName(this.props.params.name);
            let contents;

            if (contact && !this.props.children) {
                contents = (
                    <div>
                        <h1>{contact.name}</h1>
                        <ContactProfile contact={contact} onRemoveContact={this.handleRemoveContact}
                                        onSubmit={this.props.contactSaved} beginEdit={this.props.contactBeginEdit}/>
                    </div>);
            } else if (this.props.children) {
                contents = <div>{this.props.children}</div>;
            } else {
                contents = <div><h1>Contact doesn't exist</h1></div>;
            }
            return (
                <div className={contact === undefined ? "profile-page hidden" : "profile-page"}>
                    {contents}
                    <Link to={'/contacts'} className="close-button">X</Link>
                </div>
            )
        }
    })
    ;

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
module.exports = ContactProfilePageCont;