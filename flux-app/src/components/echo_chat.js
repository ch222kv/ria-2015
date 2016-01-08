/**
 * Created by chris on 2015-12-16.
 */
import React from "react";
import ChatLog from "./chatlog";

const EchoChat = React.createClass({
    render(){
        return (<div>{this.props.children}</div>);
    }
});
export default EchoChat;