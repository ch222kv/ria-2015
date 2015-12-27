/**
 * Created by chris on 2015-12-16.
 */
import React from "react";
import _ from "lodash";

const ChatLog = React.createClass({
    render(){
        const entries = this.props.chat.log.map((entry)=><div key={Math.random() * 1000000}>
            <span>{entry.user}</span> <span>
            |</span> <span>{entry.message}</span></div>)
        return (
            <div style={this.props.style}>
                {entries}
            </div>);
    }
});
export default ChatLog;