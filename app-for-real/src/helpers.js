/**
 * Created by chris on 2015-11-29.
 */
import store from "./store";


const getContactByName = (name) => {
    console.log("contacts", store.getState().contacts);
    return store.getState().contacts.contacts.filter((contact)=>contact.name === name)[0];
};

export {getContactByName};