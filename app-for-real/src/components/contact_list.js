/**
 * Created by Chrille on 2015-11-20.
 */

import {ContactEntry} from "./contact_entry";
import {Link} from "react-router";
import React from "react";

const ContactList = React.createClass({
    getDefaultProps(){
        return {
            contacts: []
        };
    },
    render(){
        console.log("Contactlist props", this.props);
        const contacts = this.props.contacts;
        const contactElements = contacts.map(contact =>
            <ContactEntry name={contact.name} key={contact.id} contact={contact}/>
        );
        return (
            <div>
                <h2>Contact List</h2>
                <div>
                    {contactElements}
                </div>

            </div>
        );
    }
});
export default ContactList;
module.exports = ContactList;