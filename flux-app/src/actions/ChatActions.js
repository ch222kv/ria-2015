/**
 * Created by chris on 2016-01-04.
 */
import AppDispatcher from "../AppDispatcher";
import constants from "../constants";
import Fuse from "fuse.js";
import {getSyllabels} from "../helpers";
import ChatStore from "../stores/ChatStore";

export default {
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
        const messages = ChatStore.getState().messages;
        const fuse = new Fuse(messages, options);
        const result = fuse.search(entry.message);
        const syllables = getSyllabels(entry.message);

        AppDispatcher.dispatch({type: constants.CHAT_MESSAGE, entry});
        //Prevents getting the canned result back always
        if (result.length && Math.random() < 0.8) {
            const chosenResult = _.sample(result);

            setTimeout(() => AppDispatcher.dispatch({
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
                            AppDispatcher.dispatch({
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
                AppDispatcher.dispatch({type: constants.ECHO_CHAT_MESSAGE, entry});
                loop(syllablesLeft);
            }, 1000);

        }

    },
    changeCurrentChatName(name){
        return AppDispatcher.dispatch({type: constants.SET_CHAT_NAME, name});
    },
    saveMessages(messages){
        try {
            return AppDispatcher.dispatch({type: constants.SAVE_MESSAGES, messages: JSON.parse(messages)});
        } catch (SyntaxError) {
            return AppDispatcher.dispatch({type: constants.MESSAGES_NOT_FORMATTED_CORRECTLY});
        }

    }
}