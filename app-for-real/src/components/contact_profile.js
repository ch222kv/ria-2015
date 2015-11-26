/**
 * Created by chris on 2015-11-24.
 */

const React = require('react');
const ContactProfile = React.createClass({
    render(){
        return (
            <div>
                {this.props.contact}
            Profile name here
            </div>
        );
    }
});

module.exports = ContactProfile;