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
            newstate.contacts.push({name: action.name, id: newstate.contacts[newstate.contacts.length - 1].id + 1});
            console.log(newstate);
            return newstate;
        default:
            return initialState();
    }
};
module.exports = reducer;
export default reducer;