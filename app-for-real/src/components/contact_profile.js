/**
 * Created by chris on 2015-11-24.
 */

import React from "react";

const ContactProfile = React.createClass({
    getInitialState(){
        return {
            editing: false
        };
    },
    beginEdit(){
        this.setState({editing: true});
    },
    handleSubmit(e){
        const contact = {
            name: this.refs.name.value.trim(),
            age: this.refs.age.value.trim(),
            phonenumber: this.refs.phonenumber.value.trim()
        };
        this.props.onSubmit(contact);
        _.map(this.refs, (input)=>input.value = '');
        this.setState({editing: false});
    },
    render(){
        const c = this.props.contact;
        console.log("Contact profile", this);
        if (this.state.editing) {
            return (
                <div>
                    <div>
                        <img style={{width: "200px", height: "200px", position: "relative"}}/>
                    </div>
                    <div>Name: <input type="text" ref="name" defaultValue={c.name}/></div>
                    <div>Age: <input type="number" ref="age" defaultValue={c.age}/></div>
                    <div>Phonenumber: <input type="text" ref="phonenumber" defaultValue={c.phonenumber}/></div>
                    <button onClick={this.handleSubmit}>Save this contact</button>
                    <button onClick={this.props.onRemoveContact.bind(null, c.id)}>Remove this contact
                    </button>
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
                <div>Phonenumber: <label>{c.phonenumber}</label></div>
                <button onClick={this.beginEdit}>Edit this contact</button>
                <button onClick={this.props.onRemoveContact.bind(null, c.id)}>Remove this contact
                </button>
            </div>
        );
    }
});
export default ContactProfile;
module.exports = ContactProfile;