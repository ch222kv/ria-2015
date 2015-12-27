/*
 This is our top-level component. Sub-components matching specific routes will be
 contained in `this.props.children` and rendered out.
 */

import React from "react";
import {Link} from "react-router";

var Wrapper = React.createClass({
    render: function () {
        return (
            <div className="wrapper">
                <h1>The Contact list</h1>
                <ul>
                    <li><Link to="/">Home</Link>
                    </li>
                    <li><Link to={'/contacts'}>Go to your contacts.</Link></li>
                </ul>

                {this.props.children}
            </div>
        );
    }
});
export default Wrapper;