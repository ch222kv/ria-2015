/**
 * Created by chris on 2015-12-22.
 */
import React from "react";
import ReactRedux, { connect } from "react-redux";
import libphonenumber from "libphonenumber-node";

import actions from "../actions";

const EditContact = React.createClass({
    getContact(){
        const contact = this.props.contacts.contacts.filter((c)=>c.name == this.props.params.name)[0];
        return contact;
    },
    handleSubmit(e){
        const contact = Object.assign({}, this.getContact(), {
            name: this.refs.name.value.trim(),
            age: this.refs.age.value.trim(),
            phonenumber: this.refs.phonenumber.value.trim()
        });
        if (contact.name && contact.phonenumber) {
            // Let's use Google's libphonenumber to validate the phone number!
            contact.phonenumber = libphonenumber.format(contact.phonenumber, "SE");
            if (libphonenumber.isValid(contact.phonenumber)) {
                this.props.contactSaved(contact);
                _.map(this.refs, (input)=>input.value = '');
                this.props.history.pushState(null, "/contacts/" + contact.name);
            } else {
                alert("Invalid phone number!");
            }
        } else {
            alert("Please input correct info!");
        }
    },
    render(){
        const c = this.getContact();
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
});


const stateToProp = (state) => {
    return {
        contacts: state.contacts
    };
};
const dispatchToProps = (dispatch) => {
    return {
        contactSaved: contact => dispatch(actions.saveContact(contact))
    };
};

export default connect(stateToProp, dispatchToProps)(EditContact);