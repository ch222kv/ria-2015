/**
 * Created by chris on 2015-11-24.
 */

import React from "react";
import {Link} from "react-router";
import libphonenumber from "libphonenumber-node";
import ContactActions from "../actions/ContactActions";

import ContactStore from "../stores/ContactStore";

const ContactProfile = React.createClass({
    getContact(){
        const contact = this.state.contacts.contacts.filter((c)=>c.name == this.props.params.name)[0];
        return contact;
    },
    handleRemoveContact(){
        ContactActions.removeContact(this.getContact().id);
        this.props.history.pushState(null, '/contacts/');
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
    },
    componentDidMount(){
        ContactStore.addChangeListener(this._onChange);
    },
    componentWillUnmount(){
        ContactStore.removeChangeListener(this._onChange);
    },
    _onChange(){
        this.setState({contacts: ContactStore.getState()});
    },
    getInitialState(){
        return {contacts: ContactStore.getState()};
    }
});

/*const dispatchToProps = (dispatch) => {
 return {
 contactRemoved: (id) => dispatch(actions.removeContact(id)),
 };
 };*/
export default ContactProfile;