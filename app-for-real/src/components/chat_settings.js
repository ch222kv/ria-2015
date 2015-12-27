/**
 * Created by chris on 2015-12-26.
 */

import React from "react";
import ChatLog from "./chatlog";
import {connect} from "react-redux";
import actions from "../actions";
import {Link} from "react-router";

const ChatSettings = React.createClass({
    onKeyDown(event){
        if (event.which === 9) {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            event.target.value = event.target.value.substring(0, start)
                + "    "
                + event.target.value.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 4;
        }
    },
    render(){
        return (
            <div>
                <h2>Settings</h2>
                <p>Everything gets saved automatically. You do not need to do anything else!</p>
                <Link to={"/contacts/" + this.props.params.name + "/chat"}>Back to chat</Link>
                <div><label>Change name <input type="text" onChange={this.props.changeChatName}
                                               value={this.props.chat.currentChatName}/></label></div>
                <div>
                    <textarea defaultValue={JSON.stringify(this.props.chat.messages, null, 4)} ref="messages"
                              style={{height: "400px", width: "400px"}} onKeyDown={this.onKeyDown}
                              onChange={this.props.saveMessages}/>
                    {this.props.chat.messagesError ?
                        <span style={{color: "red" }}>{this.props.chat.messagesError}</span> : ''}
                </div>
            </div>
        );
    }
});
const stateToProp = (state) => {
    return {
        chat: state.chat
    };
};
const dispatchToProps = (dispatch) => {
    return {
        changeChatName: (event) => dispatch(actions.changeCurrentChatName(event.target.value)),
        saveMessages: (messages) => dispatch(actions.saveMessages(messages.target.value))
    };
};
const ChatSettingsCont = connect(stateToProp, dispatchToProps)(ChatSettings);
export default ChatSettingsCont;