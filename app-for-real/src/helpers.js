/**
 * Created by chris on 2015-11-29.
 */
import store from "./store";


const getContactByName = (name) => {
    console.log("contacts", store.getState().contacts);
    return store.getState().contacts.contacts.filter((contact)=>contact.name === name)[0];
};
const getSyllabels = function getSyllables(string) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    let syllables = [];
    let currentWord = string;
    let numVowels = 0;
    let lastWasVowel = false;
    let syllableString = "";
    for (let wc of currentWord) {
        let foundVowel = false;
        syllableString += wc;
        for (let v of vowels) {
            //don't count diphthongs
            if (v == wc && lastWasVowel) {
                foundVowel = true;
                lastWasVowel = true;
                break;
            }
            else if (v == wc && !lastWasVowel) {
                syllables.push(syllableString);
                numVowels++;
                syllableString = "";
                foundVowel = true;
                lastWasVowel = true;
                break;
            }
        }

        //if full cycle and no vowel found
        if (!foundVowel)
            lastWasVowel = false;
    }

    return syllables;
};
export {getContactByName, getSyllabels};