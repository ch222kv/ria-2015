/**
 * Created by chris on 2015-11-23.
 */

import C from "../constants";
import initialState from "../initialstate";
const reducer = (state, action) => {
    var newstate = Object.assign({}, state);
    console.log(state, action);
    switch (action.type) {
        case C.CONTACT_ADDED:
            let id;
            try {
                id = newstate.contacts[newstate.contacts.length - 1].id + 1
            } catch (TypeError) {
                id = 1;
            }
            action.contact.id = id;
            newstate.contacts.push(action.contact);
            return newstate;
        case C.CONTACT_REMOVED:
            const index = newstate.contacts.findIndex((element)=>element.id === action.id);
            newstate.contacts.splice(index, 1);
            return newstate;
        default:
            return initialState();
    }
};
module.exports = reducer;
export default reducer;