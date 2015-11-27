/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

var React = require('react');
var Search = require("./search");
const ContactProfilePage = require("./contact_profile_page");

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <h2>Towes kontaktlista!</h2>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Wrapper;