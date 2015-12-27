/**
 * Created by chris on 2015-12-26.
 */
import React from "react";
import _ from "lodash";
import ChatLog from "./chatlog";
import {connect} from "react-redux";
import actions from "../actions";
import {Link} from "react-router";

const Chat = React.createClass({
    submitEntry(e){
        if (e.which === 13) {
            this.props.submitEntry({user: this.props.chat.currentChatName, message: this.refs.chattext.value});
            this.refs.chattext.value = "";
        }
        console.log(Object.assign({}, e));

    },
    render(){
        return (<div>
            <h1>Echo cha(mber)/(t)</h1>
            <Link to={"/contacts/" + this.props.params.name}>Back to profile</Link>{" | "}
            <Link to={"/contacts/" + this.props.params.name + "/chat/settings"}>Settings</Link>
            <ChatLog chat={this.props.chat} style={{"overflowX": "scroll", "maxHeight": "100vh"}}/>
            <div style={{width: "100%", position: "absolute", bottom: 0, left: 0, right: 0}}>
                <input type="text" ref="chattext" style={{width: "80%", height: "30px", fontSize: "25px"}} autoFocus
                       onKeyPress={this.submitEntry}/>
            </div>
            <hr />

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
const EchoChatCont = connect(stateToProp, dispatchToProps)(Chat);
export default EchoChatCont;