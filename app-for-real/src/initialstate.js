/*
 This is the initial state of the Redux Store. I store it in a separate file because I also use
 it in the reducers when we do the Reset action.

 It returns a function instead of an object to make sure no one can change the initial state.
 */

import C from "./constants";
const initialstate = ()=> {
    return {
        contacts: [
            {id: 1, name: "Christoffer Holmgren", phonenumber: "+46738234460", age: 21}
        ]
    }
};

export default initialstate;
module.exports = initialstate;