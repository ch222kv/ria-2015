/**
 * Created by chris on 2015-12-16.
 */
import C from "../constants";
import initialState from "../initialstate";
const reducer = (state, action)=> {
    let newstate = Object.assign({}, state);
    switch (action.type) {
        case C.CHAT_MESSAGE:
            newstate.log.push(action.entry);
            return newstate;
        case C.ECHO_CHAT_MESSAGE:
            newstate.log.push(Object.assign({}, action.entry, {user: "echo"}));
            return newstate;
        default:
            return initialState().chat;
    }
};

export default reducer;