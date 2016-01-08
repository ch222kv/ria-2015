/**
 * Created by chris on 2016-01-04.
 */

import EventEmitter from "events";
import Dispatcher from "../AppDispatcher";
import C from "../constants";

const contacts = {
    contacts: [
        {id: 1, name: "Christoffer Holmgren", phonenumber: "+46738234460", age: 21, editing: false}
    ],
    addingContact: false,
    currentMaxId: 2
};

const ContactStore = Object.assign({}, EventEmitter.prototype, {
    getState(){
        return contacts;
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
        const findContactById = (id) => _.findKey(contacts.contacts, contact => contact.id == id);

        switch (action.type) {
            case C.CONTACT_ADDED:
                contacts.contacts.push(Object.assign({}, action.contact, {id: contacts.currentMaxId++}));
                break;
            case C.CONTACT_SAVED:
                contacts.contacts[findContactById(action.contact.id)] = Object.assign({}, action.contact, {editing: false});
                break;
            case C.CONTACT_REMOVED:
                contacts.contacts.splice(findContactById(action.id), 1);
                break;
            case C.CONTACT_BEGIN_ADD:
                contacts.addingContact = true;
                break;
            case C.CONTACT_END_ADD:
                contacts.addingContact = false;
                break;
        }

        ContactStore.emitChange();
        return true; // No errors. Needed by promise in Dispatcher.

    })
});

export default ContactStore;