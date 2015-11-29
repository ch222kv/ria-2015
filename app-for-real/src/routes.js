/*
 This is the "sitemap" of our app!
 */

import React from "react";
import ReactDOM from "react-dom";
import {Link, Router, Route, IndexRoute} from "react-router";
import Redux, {createStore} from "redux";
import thunk from "redux-thunk";
import ReactRedux, {Provider} from "react-redux";

import new_store from "./store";
import Wrapper from "./components/wrapper";
import NewAppCont from "./components/contact_list_app";
import ContactProfilePage from "./components/contact_profile_page";

const Home = React.createClass({
    render(){
        return (
            <Link to={'/contacts'}>Go to your contacts.</Link>
        )
    }
});
const EasyComponent = React.createClass({
    render(){
        return (
            <h2>Easy Component{this.props.params.id}</h2>
        );
    }
});

const routes = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Home}/>
        <Route path="/contacts" component={NewAppCont}>
            <Route path="/contacts/:name" component={NewAppCont}/>
        </Route>
    </Route>
);

module.exports = routes;
export default routes;
