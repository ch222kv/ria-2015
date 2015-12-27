/*
 This module contains action creators. They are functions which will return an object describing the actions.
 These actions are imported by Redux-aware components who need them, in our case it is just Home.
 */

import constants from "./constants";

import Fuse from "fuse.js";
import {getSyllabels} from "./helpers";

const actions = {
    addContact(contact){
        return {type: constants.CONTACT_ADDED, contact};
    },
    saveContact(contact){
        return {type: constants.CONTACT_SAVED, contact};
    },
    removeContact(id){
        return {type: constants.CONTACT_REMOVED, id};
    },
    editContact(contact){
        return {type: constants.CONTACT_EDITED, contact};
    },
    beginAddContact(){
        return {type: constants.CONTACT_BEGIN_ADD};
    },
    endAddContact(){
        return {type: constants.CONTACT_END_ADD};
    },
    submitEchoChat(entry){
        return function (dispatch, getState) {
            const options = {
                caseSensitive: false,
                includeScore: false,
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: 50,
                maxPatternLength: 32,
                keys: ["entry"]
            };
            const messages = getState().chat.messages;
            const fuse = new Fuse(messages, options);
            const result = fuse.search(entry.message);
            const syllables = getSyllabels(entry.message);

            dispatch({type: constants.CHAT_MESSAGE, entry});
            //Prevents getting the canned result back always
            if (result.length && Math.random() < 0.8) {
                const chosenResult = _.sample(result);

                setTimeout(() => dispatch({
                    type: constants.ECHO_CHAT_MESSAGE,
                    entry: Object.assign({}, entry, {message: chosenResult.response})
                }), 750);
            } else {
                let syllablesLeft = syllables;
                let time = 1000;
                // To prevent the looping instantly overwriting a lot of echos and a large amount of setTimeouts
                const loop = (syllablesToCheck) => {
                    setTimeout(()=> {
                            if (syllablesToCheck.length > 0) {
                                let length = syllablesToCheck.length - 1;
                                //Arbitrary length check
                                //If the number of syllables is larger than [arbitrary number]
                                // and also we rolled a number over 0.5 remove and extra from length
                                if (length > 7 && Math.random() >= 0.5) {
                                    length -= 1;
                                }
                                dispatch({
                                    type: constants.ECHO_CHAT_MESSAGE,
                                    entry: Object.assign({}, entry, {message: syllablesToCheck.reduce((a, b) => a + b, "") + "..."})
                                });
                                //Yay for more arbitrary messages
                                time = Math.random() * 1000 + (750 - syllablesToCheck.length * 35);
                                loop(syllablesToCheck.slice(0, length));
                            }
                        },
                        time);
                };
                setTimeout(()=> {
                    dispatch({type: constants.ECHO_CHAT_MESSAGE, entry});
                    loop(syllablesLeft);
                }, 1000);

            }

        };
    },
    changeCurrentChatName(name){
        return {type: constants.SET_CHAT_NAME, name};
    },
    saveMessages(messages){
        try {
            return {type: constants.SAVE_MESSAGES, messages: JSON.parse(messages)};
        } catch (SyntaxError) {
            return {type: constants.MESSAGES_NOT_FORMATTED_CORRECTLY};
        }

    }
};
export default actions;