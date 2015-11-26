/**
 * Created by Chrille on 2015-11-20.
 */

const React = require('react');
const ContactEntry = React.createClass({
    getInitialState(){
        return {editing: false};
    },
    handleDoubleClick(){
        this.setState({editing: true});
    },
    handleSave(id, text){
        if(text.length === 0){
            this.props.deleteContact(id);
        } else {
            this.props.editContact(id, text);
        }
        this.setState({editing: false});
    },
    render(){
        console.log("Rendering entry", this);
        var contact = this.props.contact;

        if(this.state.editing){
            var element = <ContactEntryInput onSubmit={(text)=>this.handleSave(contact.id, text)}  name={this.props.name}/>;
        } else {
            element = <label>{this.props.name}</label>;
        }
        return(
            <div>
                {element} {this.state.editing === true ? 'Yes' : 'No'}
                <label onClick={this.handleDoubleClick}>
                    Edit
                </label>
            </div>
        );
    }
});

const ContactEntryInput = React.createClass({
    handleSubmit(e){
        const text = this.refs.input.value.trim();
        this.props.onSubmit(text);
        this.refs.input.value = '';
    },
    render(){
        return(
            <div>
                <input type="text" ref="input" defaultValue={this.props.name}/>
                <button onClick={this.handleSubmit}>
                    Save contact
                </button>
            </div>
        );
    }
})
module.exports = {
    ContactEntry: ContactEntry,
    ContactEntryInput: ContactEntryInput
}