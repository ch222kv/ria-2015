/*
 This module contains action creators. They are functions which will return an object describing the actions.
 These actions are imported by Redux-aware components who need them, in our case it is just Home.
 */

import constants from "./constants";

import Fuse from "fuse.js";
import {getSyllabels} from "./helpers";

const actions = {
    reset: function () {
        // A normal action creator, returns a simple object describing the action.
        return {type: constants.RESET};
    },
    duckDown: function (who) {
        // here we take advantage of Redux-thunk; instead of returning an object describing an action,
        // we return a function that takes dispatch and getState as arguments. This function can then
        // invoke dispatch, now or later using setTimeout or similar.
        return function (dispatch, getState) {
            dispatch({type: constants.DUCK_DOWN, coward: who});
            setTimeout(function () {
                dispatch({type: constants.STAND_UP, coward: who});
            }, 2000);
        }
    },
    aimAt: function (killer, victim) {
        // Another async action using the Redux-thunk syntax
        return function (dispatch, getState) {
            dispatch({type: constants.AIM_AT, killer: killer, victim: victim});
            setTimeout(function () {
                dispatch({type: constants.KILL_HERO, killer: killer, victim: victim});
            }, 2000);
        };
    },
    addContact(contact){
        return {type: constants.CONTACT_ADDED, contact};
    },
    saveContact(contact){
        return {type: constants.CONTACT_SAVED, contact};
    },
    removeContact(id){
        return {type: constants.CONTACT_REMOVED, id};
    },
    beginEdit(id){
        return {type: constants.CONTACT_BEGIN_EDIT, id}
    },
    editContact(contact){
        return {type: constants.CONTACT_EDITED, contact};
    },
    endEdit(id){
        return {type: constants.CONTACT_END_EDIT, id};
    },
    loadFromLocalStore(){
        const storage = localStorage.getItem(constants.LOCALSTORAGE_KEY);
        console.log("Loaded", storage);
        return {type: constants.LOADED_FROM_LOCALSTORAGE, storage};
    },
    submitEchoChat(entry){
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
        const messages = [{
            entry: "why are you copying me?",
            response: "I'm not!"
        }];
        const fuse = new Fuse(messages, options);
        const result = fuse.search(entry.message);
        const syllables = getSyllabels(entry.message);

        return function (dispatch, getState) {

            dispatch({type: constants.CHAT_MESSAGE, entry});
            if (result.length) {
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
    }
};
module.exports = actions;
export default actions;