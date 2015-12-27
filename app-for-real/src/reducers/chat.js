/**
 * Created by chris on 2015-12-16.
 */
import C from "../constants";
import initialState from "../initialstate";
import ReduxLocalstorage from "redux-simple-localstorage"
const {read,write} = ReduxLocalstorage("myKey");

const reducer = (state, action)=> {
    let newstate = Object.assign({}, state);
    switch (action.type) {
        case C.CHAT_MESSAGE:
            newstate.log.push(action.entry);
            return newstate;
        case C.ECHO_CHAT_MESSAGE:
            newstate.log.push(Object.assign({}, action.entry, {user: "echo"}));
            return newstate;
        case C.SET_CHAT_NAME:
            return Object.assign(newstate, {currentChatName: action.name});
        case C.SAVE_MESSAGES:
            return Object.assign(newstate, {messages: action.messages, messagesError: null});
        case C.MESSAGES_NOT_FORMATTED_CORRECTLY:
            return Object.assign(newstate, {messagesError: "Incorrectly formatted messages!"});
        default:
            return (read() && read().chat) || initialState().chat;
    }
};

export default reducer;