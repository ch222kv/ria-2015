/**
 * Created by chris on 2015-11-23.
 */

var C = require("../constants");
//import {constants as C} from '../constants';
var initialState = require("../initialstate");

module.exports = (state, action) => {
    var newstate = Object.assign({}, state)
    switch(action.type){
        case C.CONTACT_ADDED:
            newstate.contacts.push({name:action.name, id: newstate.contacts[newstate.contacts.length-1].id+1})
            return newstate;
        default:
            return initialState();
    };
};