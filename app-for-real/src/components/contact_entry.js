/**
 * Created by Chrille on 2015-11-20.
 */

import React from "react";
import {Link} from "react-router";
import _ from "lodash";

const ContactEntry = React.createClass({
    getInitialState(){
        return {editing: false};
    },
    handleClick(){
        this.setState({editing: true});
    },
    handleSave(id, text){
        if (text.length === 0) {
            this.props.deleteContact(id);
        } else {
            this.props.editContact(id, text);
        }
        this.setState({editing: false});
    },
    render(){
        const contact = this.props.contact;

        if (this.state.editing) {
            var element = <ContactEntryInput onSubmit={(text)=>this.handleSave(contact.id, text)}
                                             contact={contact}/>;
        } else {
            element = (
                <label>
                    <Link to={"/contacts/" + contact.name}>{contact.name}</Link>
                </label>);
        }
        return (
            <div>
                {element}
                <label onClick={this.handleClick}>
                    Edit
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
        const contact = {
            name: this.refs.name.value.trim(),
            age: this.refs.age.value.trim(),
            phonenumber: this.refs.phonenumber.value.trim()
        };
        this.props.onSubmit(contact);
        _.map(this.refs, (input)=>input.value = '');
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