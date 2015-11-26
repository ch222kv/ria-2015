var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../actions");

var Home = React.createClass({
	render: function(){
		var battleprops = this.props.battle;
		return (
			<div>
				{ battleprops.standing === 1 && <button onClick={this.props.reset}>Reset</button> }
			</div>
		);
	}
});

module.exports = Home;
