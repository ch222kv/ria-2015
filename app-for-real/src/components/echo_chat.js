/**
 * Created by chris on 2015-12-16.
 */
import React from "react";
import _ from "lodash";
import ChatLog from "./chatlog";
import {connect} from "react-redux";
import actions from "../actions";
import {Link} from "react-router";

const EchoChat = React.createClass({
    render(){
        return (<div>{this.props.children}</div>);
    }
});
export default EchoChat;