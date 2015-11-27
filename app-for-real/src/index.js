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

/*
 * Let's create a store.
 */

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

ReactDOM.render((
    <Provider store={new_store}>
        <Router>
            <Route path="/" component={Wrapper}>
                <IndexRoute component={Home}/>
                <Route path="/contacts" component={NewAppCont}>
                    <Route path="/contacts/:name" component={EasyComponent}/>
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById("root"))