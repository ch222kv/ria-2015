/**
 * Created by chris on 2015-11-24.
 */

import React from "react";
import ContactProfile from "./contact_profile";
import {Link} from "react-router";

import {ContactEntryInput} from "./contact_entry";
import ContactList from "./contact_list";
import _ from "lodash";

import ContactStore from "../stores/ContactStore";


const ContactProfilePage = React.createClass({
    getContactByName(name){
        return this.state.contacts.contacts.filter((c)=>c.name == name)[0];
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
    },
    componentDidMount(){
        ContactStore.addChangeListener(this._onChange);
    },
    componentWillUnmount(){
        ContactStore.removeChangeListener(this._onChange);
    },
    _onChange(){
        this.setState({contacts: ContactStore.getState()});
    },
    getInitialState(){
        return {contacts: ContactStore.getState()};
    }
});

/*const dispatchToProps = (dispatch) => {
 return {
 contactAdded: (name) => dispatch(actions.addContact(name)),
 contactRemoved: (id) => dispatch(actions.removeContact(id)),
 contactBeginEdit: (id) => dispatch(actions.beginEdit(id)),
 contactSaved: contact => dispatch(actions.saveContact(contact))
 };
 };*/

export default ContactProfilePage;