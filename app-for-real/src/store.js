/*
This file defines the main Redux Store. It will be required by all "smart" components in the app,
in our case Home and Hero.
*/

var Redux = require("redux"),
	contactsReducer = require("./reducers/contacts"),
	battlefieldReducer = require("./reducers/battlefield"),
	initialState = require("./initialstate"),
	thunk = require('redux-thunk'); // allows us to use asynchronous actions

var rootReducer = Redux.combineReducers({
	contacts: contactsReducer
});
module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer, initialState());