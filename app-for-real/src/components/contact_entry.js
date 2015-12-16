/**
 * Created by Chrille on 2015-11-20.
 */

import React from "react";
import {Link} from "react-router";
import _ from "lodash";
import libphonenumber from "libphonenumber-node";

const ContactEntry = React.createClass({
    render(){
        const contact = this.props.contact;
        return (
            <div>
                <label>
                    <Link to={"/contacts/" + contact.name}>{contact.name}</Link>
                </label>
            </div>
        );
    }
});

const ContactEntryInput = React.createClass({
    getDefaultProps(){
        return {
            contact: {
                name: "",
                age: "",
                phonenumber: ""
            }
        }
    },
    handleSubmit(e){
        const values = ["name", "age", "phonenumber"];
        const contact = {};
        values.map((ref)=>{
            contact[ref] = this.refs[ref].value.trim();
        });
        if (contact.name && contact.phonenumber) {
            // Let's use Google's libphonenumber to validate the phone number!
            contact.phonenumber = libphonenumber.format(contact.phonenumber, "SE");
            if (libphonenumber.isValid(contact.phonenumber)) {
                this.props.onSubmit(contact);
                _.map(this.refs, (input)=>input.value = '');
            } else {
                alert("Invalid phone number!");
            }
        } else {
            alert("Please input correct info!");
        }
    },
    render(){
        return (
            <div>
                <div><input type="text" ref="name" defaultValue={this.props.contact.name} placeholder="Name"/></div>
                <div><input type="number" ref="age" defaultValue={this.props.contact.age} placeholder="Age"/></div>
                <div><input type="text" ref="phonenumber" defaultValue={this.props.contact.phonenumber}
                            placeholder="Phonenumber"/></div>
                <button onClick={this.handleSubmit}>
                    Save contact
                </button>
            </div>
        );
    }
});
module.exports = {
    ContactEntry,
    ContactEntryInput
};
export default {
    ContactEntry,
    ContactEntryInput
};