/**
 * Created by chris on 2015-11-24.
 */
var React = require('react');

var Search = React.createClass({
    render(){
        return(
            <div>
                <input type="text" placeholder="Search for contact here"/>
            </div>
        );
    }
});

module.exports = Search;