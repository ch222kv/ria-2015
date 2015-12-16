/*
 This module contains action creators. They are functions which will return an object describing the actions.
 These actions are imported by Redux-aware components who need them, in our case it is just Home.
 */

import constants from "./constants";


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
        return function (dispatch, getState) {
            dispatch({type: constants.CHAT_MESSAGE, entry});
            setTimeout(()=> {
                dispatch({type: constants.ECHO_CHAT_MESSAGE, entry});
            }, Math.random() * 2000 + 500)
        };
    }
};
module.exports = actions;
export default actions;