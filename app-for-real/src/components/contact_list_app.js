/**
 * Created by Chrille on 2015-11-20.
 */
var React = require('react'),
    ReactRedux = require("react-redux"),
    ContactEntryInput = require("./contact_entry").ContactEntryInput,
    ContactList = require("./contact_list"),
    actions = require("../actions");

const { connect } = ReactRedux;
const NewApp = React.createClass({
    render(){
        console.log(this);
        return(
            <div>
                <ContactEntryInput onSubmit={this.props.contactAdded} />
                <ContactList contacts={this.props.contacts} />
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