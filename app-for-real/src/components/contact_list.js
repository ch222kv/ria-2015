/**
 * Created by Chrille on 2015-11-20.
 */

import {ContactEntry} from "./contact_entry";
import {Link} from "react-router";
import React from "react";

const ContactList = React.createClass({
    render(){
        console.log(this.props);
        const contacts = this.props.contacts;
        const contactElements = contacts.map(contact =>
            <ContactEntry name={contact.name} key={contact.id} contact={contact}/>
        );
        return(
            <div>
                <h1>Contact List</h1>
                <Link to="#/test">Test</Link>
                <div>
                    {contactElements}
                </div>

            </div>
        );
    }
});
export default ContactList;
module.exports = ContactList;