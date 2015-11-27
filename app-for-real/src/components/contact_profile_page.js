/**
 * Created by chris on 2015-11-24.
 */

const React = require('react');
const ContactProfile = require("./contact_profile");
import {Link} from "react-router";

const ContactProfilePage = React.createClass({
    render(){
        const contact = this.props.contact;
        console.log("Contact profile page", this.props);
        return(
            <div className="profile-page">
                <h1>{contact.name}</h1>
                <Link to={'/contacts'} className="close-button">X</Link>
                <ContactProfile contact={contact}/>
            </div>
        );
    }
});
export default ContactProfilePage;
module.exports = ContactProfilePage;