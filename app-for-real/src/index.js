/*
 This is the entry point for the app! From here we merely import our routes definitions,
 then use React and React-DOM to render it.
 */

var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    Redux = require("redux"),
    ReactRedux = require("react-redux"),
    Router = require('react-router').Router,
    Link = require('react-router').Link;

const thunk = require('redux-thunk');
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const { createStore } = Redux;
const { connect } = ReactRedux;
const new_store = require("./store");
const Wrapper = require("./components/wrapper");
const NewAppCont = require("./components/contact_list_app");
const Home = require("./components/home");

/*
 * Let's create a store.
 */

ReactDOM.render((
    <Provider store={new_store}>
        <Router>
            <Route path="/" component={Wrapper}>
                <IndexRoute component={NewAppCont}>

                    </IndexRoute>
                <Route path="test" component={Home}/>
                </Route>
        </Router>
    </Provider>
), document.getElementById("root"))