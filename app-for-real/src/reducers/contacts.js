/**
 * Created by chris on 2015-11-23.
 */

import C from "../constants";
import initialState from "../initialstate";
import ReduxLocalstorage from "redux-simple-localstorage"
const {read,write} = ReduxLocalstorage("myKey");

const reducer = (state, action) => {
    const newstate = Object.assign({}, state);
    let key;
    const findContactById = (id) => _.findKey(newstate.contacts, contact => contact.id == id);
    switch (action.type) {
        case C.CONTACT_ADDED:
            action.contact.id = newstate.contacts.currentMaxId++;
            newstate.contacts.push(action.contact);
            return newstate;
        case C.CONTACT_SAVED:
            key = findContactById(action.contact.id);
            action.contact.editing = false;
            newstate.contacts[key] = action.contact;
            return newstate;
        case C.CONTACT_REMOVED:
            key = findContactById(action.id);
            newstate.contacts.splice(key, 1);
            return newstate;
        case C.CONTACT_BEGIN_ADD:
            return Object.assign({}, state, {addingContact: true});
        case C.CONTACT_END_ADD:
            return Object.assign({}, state, {addingContact: false});
        default:
            return (read() && read().contacts) || initialState().contacts;
    }
};
export default reducer;