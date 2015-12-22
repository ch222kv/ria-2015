const NewComp = React.createClass({
 	render(){
 		var {dispatch} = this.props
 		var {value} = this.props.counter
 		var {onIncrement, onDecrement} = this.props.actions
 		console.log(this);
 		return(
 			<div>
 				<h1>{value}</h1>
			    <input type="number" onChange={this.onChange} ref="input"/>
			    <button onClick={onIncrement}>+</button>
			    <button onClick={onDecrement}>-</button>
			    </div>
 			)
 	}
 })

const CounterComp = React.createClass({
	onChange(e){
		console.log(this);
		this.props.store.dispatch({type: 'CHANGE', value: this.refs.input.value})
	},
	render(){
		return (<div>
			<h1>{this.props.value}</h1>
		    <input type="number" onChange={this.onChange} ref="input"/>
		    <button onClick={this.props.onIncrement}>+</button>
		    <button onClick={this.props.onDecrement}>-</button>
		  </div>)		
	}
})
const counter_reducer = (state, action) => {
	var newstate = Object.assign({}, state)
	newstate.value = newstate.value || 0
  switch (action.type) {
    case 'INCREMENT':
	    return Object.assign({}, newstate, {value: newstate.value+1})
    case 'DECREMENT':
    	if(newstate.value <= 0)
    		return {value: 0}
    	return {value: newstate.value - 1}
    case 'CHANGE':
      	console.log(action)
      	return {value: +action.value}
    case 'ASYNC':
    	console.log(action);
    	return newstate;
    default:
      return newstate;
  }
} 

const other_reducer = (state, action) => {
	var newstate = Object.assign({}, state)
	switch(action.type){
		case 'NAME_CHANGE':
			newstate.name = action.name;
			return newstate;
		default:
			return newstate;
	}
}
const messages_reducer = (state, action) => {
	var newstate = Object.assign({}, state)
	switch(action.type){
		default:
			return newstate;
	}
}
/*
 * What does UI look like, assuming it doesn't know
 * about the state or actions, and is a function
 * of the props?
 */

/*
 * Which injected props should be calculated
 * from the application state and how?
 */
const mapStateToProps = (state) => {
	console.log(state)
  return {
    counter: state.counter,
    other: state.other
  };
}
const {bindActionCreators} = require('redux');
/*
 * Which injected props should be callbacks
 * that dispatch actions, and which actions?
 */
const mapDispatchToProps = (dispatch) => {
  return { actions: {onIncrement: () => {
  	console.log("INCREMNET")
  	dispatch(doAsync())
      dispatch({
        type: 'INCREMENT'           
      })            
    },
    onDecrement: () => {
      dispatch({
        type: 'DECREMENT'           
      })            
    },
    onChange: () => {
    	dispatch({
    		type: 'CHANGE'
    	})
    }},
  dispatch
  };
};

function doAsync(){
	return function(dispatch, getState){
		console.log("getState", getState())
		dispatch({
			type: 'ASYNC',
			done_at: Date.now()
		})
		setTimeout(function(){
			console.log(Date.now())
			return 5;
		}, 1000);
	}
}

const NewCompContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComp);

const NewWrapper = React.createClass({
	render(){
		return(<div className="wrapper">
			<Link to="/">/</Link>
			<Link to="/test">Test</Link>
			{'wrapper'}
			{this.props.children}</div>)
	}
})

const App = React.createClass({
 	render(){
 		return(<div className="app">{'app'}{this.props.children}</div>)
 	}
 })

const AppContainer = connect()(App);

const Home = React.createClass({
	onChange(e){
		console.log(e)
		console.log(this)
		this.props.dispatch({type: 'NAME_CHANGE', name: this.refs.input.value})
	},
	onSubmit(e){
		console.log(e)
		this.setState({input_disabled: true})
		this.props.dispatch({type: 'NAME_CHANGE', name: this.refs.input.value})
	},
	render(){
		console.log(this)
		this.state = this.state || {input_disabled: false};
		return(<div className="home">Whats your name, friend? <input type="text" ref="input" onKeyDown={this.onChange} onChange={this.onChange} onSubmit={this.onSubmit} value={this.props.other.name} disabled={this.state.input_disabled == true}/><div disabled={this.props.other.name == ''}>{this.props.other.name}</div></div>)
	}
})
const HomeContainer = connect(mapStateToProps)(Home)

const new_store = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer,
	()=>{
		return{
			counter:{ value: 0}, 
			other:{ name:''},  
			contacts: {
						contacts: 
							[
								{id:1, name:"Christoffer Holmgren"}
							]
						},
			messages: {
						messages: 
							[
								{text: "Hello there", id: 1},
							]
					}
				}
		}
	)