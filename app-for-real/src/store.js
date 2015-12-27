/*
 This file defines the main Redux Store. It will be required by all "smart" components in the app,
 in our case Home and Hero.
 */

import Redux, {combineReducers, applyMiddleware, createStore} from "redux";
import contactsReducer from "./reducers/contacts";
import chatReducer from "./reducers/chat";
import initialState from "./initialstate";
import thunk from "redux-thunk";
import ReduxLocalstorage from "redux-simple-localstorage"
const {read,write} = ReduxLocalstorage("myKey");

const rootReducer = combineReducers({
    contacts: contactsReducer,
    chat: chatReducer
});

const store = applyMiddleware(write, thunk)(createStore)(rootReducer, read() || initialState());

export default store;