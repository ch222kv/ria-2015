/**
 * Created by Chrille on 2015-11-20.
 */
const ContactEntry = require("./contact_entry").ContactEntry;
const Link = require('react-router').Link;

const React = require('react');
const ContactList = React.createClass({
    render(){
        console.log(this.props);
        const contacts = this.props.contacts;
        const contactElements = contacts.contacts.map(contact =>
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

module.exports = ContactList;