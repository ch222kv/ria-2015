/**
 * Created by chris on 2015-11-24.
 */

import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import libphonenumber from "libphonenumber-node";

const ContactProfile = React.createClass({
    getContact(){
        const contact = this.props.contacts.contacts.filter((c)=>c.name == this.props.params.name)[0];
        return contact;
    },
    handleRemoveContact(){
        this.props.contactRemoved(this.getContact().id);
    },
    render(){
        const c = this.getContact();
        return (
            <div>
                <div><Link to={"/contacts/" + c.name + "/chat"}>Chat "with" {c.name}</Link></div>
                <div>
                    <img style={{width: "200px", height: "200px", position: "relative"}}/>
                </div>
                <div>Name: <label>{c.name}</label></div>
                <div>Age: <label>{c.age}</label></div>
                <div>Phonenumber: <label>{libphonenumber.format(c.phonenumber, "local")}</label></div>
                <Link to={"/contacts/" + c.name + "/edit"}>Edit this contact</Link>
                <button onClick={this.handleRemoveContact}>Remove this contact
                </button>
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
        contactRemoved: (id) => dispatch(actions.removeContact(id)),
    };
};
export default connect(stateToProp, dispatchToProps)(ContactProfile);