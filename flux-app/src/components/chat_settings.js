/**
 * Created by chris on 2015-12-26.
 */

import React from "react";
import ChatLog from "./chatlog";
import {Link} from "react-router";
import ChatStore from "../stores/ChatStore";

import ChatActions from "../actions/ChatActions";

const ChatSettings = React.createClass({
    getInitialState(){
        return {chat: ChatStore.getState()};
    },
    saveMessages(event){
        ChatActions.saveMessages(event.target.value);
    },
    changeChatName(event){
        ChatActions.changeCurrentChatName(event.target.value);
    },
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
                <div><label>Change name <input type="text" onChange={this.changeChatName}
                                               value={this.state.chat.currentChatName}/></label></div>
                <div>
                    <textarea defaultValue={JSON.stringify(this.state.chat.messages, null, 4)} ref="messages"
                              style={{height: "400px", width: "400px"}} onKeyDown={this.onKeyDown}
                              onChange={this.saveMessages}/>
                    {this.state.chat.messagesError ?
                        <span style={{color: "red" }}>{this.state.chat.messagesError}</span> : ''}
                </div>
            </div>
        );
    },
    componentDidMount(){
        ChatStore.addChangeListener(this._onChange);
    },
    componentWillUnmount(){
        ChatStore.removeChangeListener(this._onChange);
    },
    _onChange(){
        this.setState({chat: ChatStore.getState()});
    }
});

/*const dispatchToProps = (dispatch) => {
 return {
 changeChatName: (event) => dispatch(actions.changeCurrentChatName(event.target.value)),
 saveMessages: (messages) => dispatch(actions.saveMessages(messages.target.value))
 };
 };*/
export default ChatSettings;