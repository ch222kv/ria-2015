/**
 * Created by chris on 2015-11-24.
 */

import React from "react";

const ContactProfile = React.createClass({
    render(){
        console.log("Contact profile", this);
        return (
            <div>
                <div>
                    <img style={{width: "200px", height: "200px", position: "relative"}}/>
                </div>
                <div>Name: <label>{this.props.contact.name}</label></div>
                <div>Age: <label>{this.props.contact.age}</label></div>
                <div>Phonenumber: <label>{this.props.contact.phonenumber}</label></div>
                <button>Edit this contact</button>
                <button onClick={this.props.onRemoveContact.bind(null, this.props.contact.id)}>Remove this contact
                </button>
            </div>
        );
    }
});
export default ContactProfile;
module.exports = ContactProfile;