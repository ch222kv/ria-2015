/**
 * Created by chris on 2015-11-24.
 */

const React = require('react');
const ContactProfile = React.createClass({
    render(){
        console.log("Contact profile", this);
        return (
            <div>
                <div>
                    <img style={{width: "200px", height: "200px", position: "relative"}} />
                </div>
                {this.props.contact.name}
            </div>
        );
    }
});
export default ContactProfile;
module.exports = ContactProfile;