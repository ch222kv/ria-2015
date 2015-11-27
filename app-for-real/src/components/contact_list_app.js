/**
 * Created by Chrille on 2015-11-20.
 */

import React from "react";
import {ContactEntryInput} from "./contact_entry";
import ContactList from "./contact_list";
import actions from "../actions";

import ContactProfilePage from "./contact_profile_page";
import Search from "./search";

import ReactRedux, { connect } from "react-redux";
const NewApp = React.createClass({
    filterContacts(){

    },
    getInitialState(){
        return {
            displayProfilePage: false
        };
    },
    getContactByName(name){
        console.log("contacts", this.props.contacts);
        return this.props.contacts.filter((contact)=>contact.name === name)[0];
    },
    render(){
        console.log("Conctact-list-app, params", this.props.params.name);
        let profile_page;
        if (this.props.params.name !== undefined) {
            profile_page = <div><h1>What now</h1>
                <ContactProfilePage
                contact={this.getContactByName(this.props.params.name)}/></div>;
        }


        return (
            <div>
                <Search onChange={this.filterContacts}/>
                <ContactEntryInput onSubmit={this.props.contactAdded}/>
                <ContactList contacts={this.props.contacts}/>
                {profile_page}
            </div>
        );
    }
});

const stateToProp = (state) => {
    return {
        contacts: state.contacts.contacts
    };
};
const dispatchToProps = (dispatch) => {
    return {
        contactAdded: (name) => dispatch(actions.addContact(name)),
    };
};
const NewAppCont = connect(stateToProp, dispatchToProps)(NewApp);
export default NewAppCont;
module.exports = NewAppCont;