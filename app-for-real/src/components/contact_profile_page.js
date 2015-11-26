/**
 * Created by chris on 2015-11-24.
 */

const React = require('react');
const ContactProfile = require("./contact_profile");

const ContactProfilePage = React.createClass({
    render(){
        return(
            <div>
                Profile page
                <ContactProfile contact={null}/>
            </div>
        );
    }
});

module.exports = ContactProfilePage;