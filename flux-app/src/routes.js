/*
 This is the "sitemap" of our app!
 */

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute} from "react-router";

import Wrapper from "./components/wrapper";
import ContactListApp from "./components/contact_list_app";
import ContactProfilePage from "./components/contact_profile_page";
import ContactProfile from "./components/contact_profile";
import EchoChat from "./components/echo_chat";
import EditContact from "./components/edit_contact";
import ChatSettings from "./components/chat_settings";
import Chat from "./components/chat";

const routes = (
    <Route path="/" component={Wrapper}>
        <Route path="contacts" component={ContactListApp}>
            <Route path=":name" component={ContactProfilePage}>
                <IndexRoute component={ContactProfile}/>
                <Route path="edit" component={EditContact}/>
                <Route path="chat" component={EchoChat}>
                    <IndexRoute component={Chat}/>
                    <Route path="settings" component={ChatSettings}/>
                </Route>
            </Route>
        </Route>
    </Route>
);

export default routes;
