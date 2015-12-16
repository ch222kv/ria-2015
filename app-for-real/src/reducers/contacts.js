/**
 * Created by chris on 2015-11-23.
 */

import C from "../constants";
import initialState from "../initialstate";
const reducer = (state, action) => {
    let newstate = Object.assign({}, state);
    let key;
    console.log(state, action);
    const findContactById = (id) => _.findKey(newstate.contacts.contacts, contact => contact.id == id);

    const actions = {
        [C.CONTACT_ADDED]: () => {
            console.log(action.contact, newstate);
            action.contact.id = newstate.contacts.currentMaxId++;
            newstate.contacts.contacts.push(action.contact);
            return newstate;
        },
        [C.CONTACT_SAVED]: () => {
            key = findContactById(action.contact.id);
            action.contact.editing = false;
            newstate.contacts.contacts[key] = action.contact;
            return newstate;
        },
        [C.CONTACT_REMOVED]: ()=> {
            const index = newstate.contacts.contacts.findIndex((element)=>element.id === action.id);
            newstate.contacts.contacts.splice(index, 1);
            return newstate;
        },
        [C.CONTACT_BEGIN_EDIT]: ()=> {
            key = findContactById(action.id);
            console.log(key);
            newstate.contacts.contacts[key].editing = true;
            return newstate;
        },
        [C.CONTACT_END_EDIT]: ()=> {
            key = _.findKey(newstate.contacts.contacts, (contact=> {
                return contact.id == action.id;
            }));
            newstate.contactscontacts[key].editing = false;
            return newstate;
        },
        [C.LOADED_FROM_LOCALSTORAGE]: ()=> {
            if (action.storage !== null) {
                return action.storage;
            }
            return initialState().contacts;
        }

    };
    console.log(actions, action);
    try {
        const result = actions[action.type]();
        return result;
    } catch (TypeError) {
        return initialState().contacts;
    }
};
module.exports = reducer;
export default reducer;