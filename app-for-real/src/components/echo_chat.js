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
    submitEntry(){
        console.log(this);
        this.props.submitEntry({user: this.props.params.name, message: this.refs.chattext.value});
    },
    render(){
        return (<div>
            <h1>Echo cha(mber)/(t)</h1>
            <Link to={"/contacts/" + this.props.params.name}>Back to profile</Link>
            <ChatLog chat={this.props.chat}/>
            <input type="text" ref="chattext"/>
            <button onClick={this.submitEntry}>Send</button>
        </div>);
    }
});


const stateToProp = (state) => {
    return {
        chat: state.chat
    };
};
const dispatchToProps = (dispatch) => {
    return {
        submitEntry: (entry) => dispatch(actions.submitEchoChat(entry)),
    };
};
const EchoChatCont = connect(stateToProp, dispatchToProps)(EchoChat);
export default EchoChatCont;