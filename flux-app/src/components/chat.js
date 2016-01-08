/**
 * Created by chris on 2015-12-26.
 */
import React from "react";
import ChatLog from "./chatlog";
import {Link} from "react-router";
import ChatStore from "../stores/ChatStore";

import ChatActions from "../actions/ChatActions";

const Chat = React.createClass({
    getInitialState(){
        return {chat: ChatStore.getState()};
    },
    submitEntry(e){
        if (e.which === 13) {
            ChatActions.submitEchoChat({user: this.state.chat.currentChatName, message: this.refs.chattext.value});
            this.refs.chattext.value = "";
        }
        console.log(Object.assign({}, e));

    },
    render(){
        return (<div>
            <h1>Echo cha(mber)/(t)</h1>
            <Link to={"/contacts/" + this.props.params.name}>Back to profile</Link>{" | "}
            <Link to={"/contacts/" + this.props.params.name + "/chat/settings"}>Settings</Link>
            <ChatLog chat={this.state.chat} style={{"overflowX": "scroll", "maxHeight": "100vh"}}/>
            <div style={{width: "100%", position: "absolute", bottom: 0, left: 0, right: 0}}>
                <input type="text" ref="chattext" style={{width: "80%", height: "30px", fontSize: "25px"}} autoFocus
                       onKeyPress={this.submitEntry}/>
            </div>
            <hr />

        </div>);
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
 submitEntry: (entry) => dispatch(actions.submitEchoChat(entry)),
 changeChatName: (name) => dispatch(actions.changeCurrentChatName(name))
 };
 };*/
export default Chat;