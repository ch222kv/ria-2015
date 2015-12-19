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
        this.props.submitEntry({user: this.props.chat.currentChatName, message: this.refs.chattext.value});
        this.refs.chattext.value = "";
    },
    changeChatName(e){
        console.log(e);
        this.props.changeChatName(e.target.value);
    },
    render(){
        return (<div>
            <h1>Echo cha(mber)/(t)</h1>
            <Link to={"/contacts/" + this.props.params.name}>Back to profile</Link>
            <ChatLog chat={this.props.chat}/>
            <div>
                <input type="text" ref="chattext"/>

                <button onClick={this.submitEntry}>Send</button>
            </div>
            <hr />
            <label>Change name <input type="text" onChange={this.changeChatName}/></label>
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
        changeChatName: (name) => dispatch(actions.changeCurrentChatName(name))
    };
};
const EchoChatCont = connect(stateToProp, dispatchToProps)(EchoChat);
export default EchoChatCont;