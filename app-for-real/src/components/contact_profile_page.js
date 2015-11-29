/**
 * Created by chris on 2015-11-24.
 */

import React from "react";
import ContactProfile from "./contact_profile";
import {Link} from "react-router";
import {getContactByName} from "../helpers";

const ContactProfilePage = React.createClass({
    render(){
        const contact = getContactByName(this.props.params.name);
        console.log("Contact profile page", this.props);
        if (contact) {
            return (
                <div className={contact === undefined ? "profile-page hidden" : "profile-page"}>
                    <h1>{contact.name}</h1>
                    <Link to={'/contacts'} className="close-button">X</Link>
                    <ContactProfile contact={contact}/>
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
export default ContactProfilePage;
module.exports = ContactProfilePage;