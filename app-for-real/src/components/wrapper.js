/*
 This is our top-level component. Sub-components matching specific routes will be
 contained in `this.props.children` and rendered out.
 */

import React from "react";

var Wrapper = React.createClass({
    render: function () {
        return (
            <div className="wrapper">
                <h2>Towes kontaktlista!</h2>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Wrapper;
export default Wrapper;