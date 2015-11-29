/*
 This file defines the main Redux Store. It will be required by all "smart" components in the app,
 in our case Home and Hero.
 */

import Redux, {combineReducers, applyMiddleware, createStore} from "redux";
import contactsReducer from "./reducers/contacts";
import initialState from "./initialstate";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    contacts: contactsReducer
});
const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState());

module.exports = store;
export default store;