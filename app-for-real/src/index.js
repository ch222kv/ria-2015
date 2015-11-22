

	/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require('react'),
	ReactDOM = require('react-dom'),
	Router = require('react-router').Router,
	Provider = require('react-redux').Provider,
	Redux = require("redux"),
	ReactRedux = require("react-redux"),
	Link = require('react-router').Link;

const thunk = require('redux-thunk');
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const { createStore } = Redux;
const { connect } = ReactRedux;
/*
 * Let's create a store.
 */



const contacts_reducer = (state, action) => {
		var newstate = Object.assign({}, state)
		console.log("newstate", newstate);
		switch(action.type){
			case 'CONTACT_ADDED':
				console.log("Adding contact", action)
				newstate.contacts.push({name:action.name, id: newstate.contacts[newstate.contacts.length-1].id+1})
				return newstate;
			default:
				return newstate;
		};
	};

var rootReducer = Redux.combineReducers({
	contacts: contacts_reducer
});

const new_store = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,{
			contacts: {
						contacts: 
							[
								{id:1, name:"Christoffer Holmgren"}
							]
						}
				}
	);

const NewApp = React.createClass({
	render(){
		console.log(this);
		return(
			<div>
				<ContactEntryInput onSubmit={(name)=>this.props.dispatch({type:'CONTACT_ADDED', name: name})} />
				<ContactList contacts={this.props.contacts} />
			</div>
			);
	}
});

const ContactList = React.createClass({
	render(){
		console.log("Contact list", this);
		console.log(new_store.getState());
		const contacts = this.props.contacts;
		const contactElements = contacts.contacts.map(contact => 
			 <ContactEntry name={contact.name} key={contact.id} contact={contact}/>
			 );
		return(
			<div>
			<h1>Contact List</h1>
				<div>
					{contactElements}
				</div>
			
			</div>
			);
	}
});

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
});

const stateToProp = (state) => {
	return {
		contacts: state.contacts
	};
};
const dispatchToProps = (dispatch) => {
	return {
		actions: {},
		dispatch
	};
};
const NewAppCont = connect(stateToProp, dispatchToProps)(NewApp);

ReactDOM.render((
	<Provider store={new_store}>
		<Router>
	  		<Route path="/" component={NewAppCont} />
		</Router>
  </Provider>
), document.getElementById("root"))