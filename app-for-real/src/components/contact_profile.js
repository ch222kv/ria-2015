/**
 * Created by chris on 2015-11-24.
 */

import React from "react";
import libphonenumber from "libphonenumber-node";

const ContactProfile = React.createClass({
    beginEdit(id){
        this.props.beginEdit(id);
    },
    handleSubmit(e){
        const contact = {
            name: this.refs.name.value.trim(),
            age: this.refs.age.value.trim(),
            phonenumber: this.refs.phonenumber.value.trim(),
            id: this.props.contact.id
        };
        if (contact.name && contact.phonenumber) {
            // Let's use Google's libphonenumber to validate the phone number!
            contact.phonenumber = libphonenumber.format(contact.phonenumber, "SE");
            if (libphonenumber.isValid(contact.phonenumber)) {
                this.props.onSubmit(contact);
                _.map(this.refs, (input)=>input.value = '');
                this.setState({editing: false});
            } else {
                alert("Invalid phone number!");
            }
        } else {
            alert("Please input correct info!");
        }
    },
    handleRemoveContact(){
        this.props.onRemoveContact(this.props.contact.id);
    },
    render(){
        const c = this.props.contact;
        console.log("Contact", c);
        if (c.editing) {
            return (
                <div>
                    <div>
                        <img style={{width: "200px", height: "200px", position: "relative"}}/>
                    </div>
                    <div>Name: <input type="text" ref="name" defaultValue={c.name}/></div>
                    <div>Age: <input type="number" ref="age" defaultValue={c.age}/></div>
                    <div>Phonenumber: <input type="text" ref="phonenumber"
                                             defaultValue={libphonenumber.format(c.phonenumber, "local")}/></div>
                    <button onClick={this.handleSubmit}>Save this contact</button>
                </div>
            );
        }
        return (
            <div>
                <div>
                    <img style={{width: "200px", height: "200px", position: "relative"}}/>
                </div>
                <div>Name: <label>{c.name}</label></div>
                <div>Age: <label>{c.age}</label></div>
                    <div>Phonenumber: <label>{libphonenumber.format(c.phonenumber, "local")}</label></div>
                    <button onClick={this.beginEdit}>Edit this contact</button>
                    <button onClick={this.handleRemoveContact}>Remove this contact
                    </button>
            </div>
    );
    }
    });
    export default ContactProfile;
    module.exports = ContactProfile;