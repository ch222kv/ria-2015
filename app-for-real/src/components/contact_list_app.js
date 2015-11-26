/**
 * Created by Chrille on 2015-11-20.
 */
var React = require('react'),
    ReactRedux = require("react-redux"),
    ContactEntryInput = require("./contact_entry").ContactEntryInput,
    ContactList = require("./contact_list"),
    actions = require("../actions");

import ContactProfilePage from "./contact_profile_page";

const { connect } = ReactRedux;
const NewApp = React.createClass({
    render(){
        if(this.props.params.id){
            console.log("id", this.props.params.id);
            var profile_page = <div><h1>What now</h1><ContactProfilePage /></div>;
        }
        console.log(this);


        return(
            <div>
                <ContactEntryInput onSubmit={this.props.contactAdded} />
                <ContactList contacts={this.props.contacts} />
                {profile_page}
            </div>
        );
    }
})

const stateToProp = (state) => {
    return {
        contacts: state.contacts
    };
};
const dispatchToProps = (dispatch) => {
    return {
        contactAdded: (name) => dispatch(actions.addContact(name)),
    };
};
const NewAppCont = connect(stateToProp, dispatchToProps)(NewApp);
module.exports = NewAppCont;