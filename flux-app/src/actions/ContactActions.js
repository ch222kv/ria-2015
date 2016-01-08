/**
 * Created by chris on 2016-01-04.
 */
import AppDispatcher from "../AppDispatcher";
import constants from "../constants";

export default {
    addContact(contact){
        return AppDispatcher.dispatch({type: constants.CONTACT_ADDED, contact});
    },
    saveContact(contact){
        return AppDispatcher.dispatch({type: constants.CONTACT_SAVED, contact});
    },
    removeContact(id){
        return AppDispatcher.dispatch({type: constants.CONTACT_REMOVED, id});
    },
    editContact(contact){
        return AppDispatcher.dispatch({type: constants.CONTACT_EDITED, contact});
    },
    beginAddContact(){
        return AppDispatcher.dispatch({type: constants.CONTACT_BEGIN_ADD});
    },
    endAddContact(){
        return AppDispatcher.dispatch({type: constants.CONTACT_END_ADD});
    }
}