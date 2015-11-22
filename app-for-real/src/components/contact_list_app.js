/**
 * Created by Chrille on 2015-11-20.
 */
const NewApp = React.createClass({
    render(){
        console.log(this);
        return(
            <div>
                <ContactEntryInput onSubmit={(name)=>this.props.dispatch({type:'CONTACT_ADDED', name: name})} />
                <ContactList contacts={this.props.contacts} />
            </div>
        );
    }
})

const stateToProp = (state) => {
    return {
        contacts: state.contacts
    };
};
const dispatchToProps = (dispatch) => {
    return {
        actions: {},
        dispatch
    };
};
const NewAppCont = connect(stateToProp, dispatchToProps)(NewApp);

export default NewAppCont;