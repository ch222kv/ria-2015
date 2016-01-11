/*
 This is the entry point for the app! From here we merely import our routes definitions,
 then use React and React-DOM to render it.
 */


import React from "react";
import ReactDOM from "react-dom";
import {Link, Router, Route, IndexRoute} from "react-router";
import Redux, {createStore} from "redux";
import thunk from "redux-thunk";
import ReactRedux, {Provider} from "react-redux";

import store from "./store";
import Wrapper from "./components/wrapper";
import NewAppCont from "./components/contact_list_app";
import routes from "./routes";
import actions from "./actions";


/*
 * Let's create a store.
 */

ReactDOM.render((
    <Provider store={store}>
        <Router routes={routes} />
    </Provider>
), document.getElementById("root"));
