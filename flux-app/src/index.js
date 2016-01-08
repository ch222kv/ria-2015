/*
 This is the entry point for the app! From here we merely import our routes definitions,
 then use React and React-DOM to render it.
 */

import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router";

import routes from "./routes";


/*
 * Let's create a store.
 */

ReactDOM.render((
    <Router routes={routes}/>
), document.getElementById("root"));