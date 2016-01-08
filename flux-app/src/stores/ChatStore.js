/**
 * Created by chris on 2016-01-04.
 */

import {EventEmitter} from "events";
import Dispatcher from "../AppDispatcher";
import C from "../constants";

const chat = {
    log: [],
    currentChatName: null,
    messages: [{
        entry: "why are you copying me?",
        response: "I'm not!"
    }],
    messagesError: null
};

const ChatStore = Object.assign({}, EventEmitter.prototype, {
    getState(){
        return chat;
    },
    addChangeListener(callback){
        this.on("CHANGE", callback);
    },
    emitChange: function () {
        this.emit("CHANGE");
    },

    /**
     * @param {function} callback
     */
    removeChangeListener(callback){
        this.removeListener("CHANGE", callback);
    },
    dispatcherIndex: Dispatcher.register((payload)=> {
        const action = payload;

        switch (action.type) {
            case "CHAT_MESSAGE":
                chat.log.push(action.entry);
                break;
            case C.ECHO_CHAT_MESSAGE:
                chat.log.push(Object.assign({}, action.entry, {user: "echo"}));
                break;
            case C.SET_CHAT_NAME:
                chat.currentChatName = action.name;
                break;
            case C.SAVE_MESSAGES:
                chat.messages = action.messages;
                chat.messagesError = null;
                break;
            case C.MESSAGES_NOT_FORMATTED_CORRECTLY:
                chat.messagesError = "Incorrectly formatted messages!";
                break;
            // add more cases for other actionTypes, like TODO_UPDATE, etc.
        }

        ChatStore.emitChange();
        return true; // No errors. Needed by promise in Dispatcher.

    })
});

export default ChatStore
