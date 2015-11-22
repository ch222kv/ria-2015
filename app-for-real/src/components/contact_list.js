/**
 * Created by Chrille on 2015-11-20.
 */
const ContactList = React.createClass({
    render(){
        console.log("Contact list", this);
        console.log(new_store.getState());
        const contacts = this.props.contacts;
        const contactElements = contacts.contacts.map(contact =>
            <ContactEntry name={contact.name} key={contact.id} contact={contact}/>
        );
        return(
            <div>
                <h1>Contact List</h1>
                <div>
                    {contactElements}
                </div>

            </div>
        );
    }
});

export default ContactList;