# My project
My project is a contact list, ish. At least that's where it started. So the main thing that you will see is a list of contacts that you have added to your list.

## Routes
Let's begin with my routes.

    const routes = (
    <Route path="/" component={Wrapper}>
        <Route path="contacts" component={ContactListApp}>
            <Route path=":name" component={ContactProfilePage}>
                <IndexRoute component={ContactProfile}/>
                <Route path="edit" component={EditContact}/>
                <Route path="chat" component={EchoChat}>
                    <IndexRoute component={Chat}/>
                    <Route path="settings" component={ChatSettings}/>
                </Route>
            </Route>
        </Route>
    </Route>
    );

Since we are to use React, Redux and Router in this project, I intended to use Router as much as I can. As such we can keep the routing login by itself, and not having to care at all how it is actually handled by Router.

## Components

### Dumb components
Wrapper and EchoChat are just plain components that do not depend on Redux in any way. They just render this.props.children and do not care about what that actually is. That way we can easily add other components later without changing anything, really.

#### Pseudo-smart-component
ContactProfilePage is a pseudo-smart component, as in, it is connected, but the only thing it does is display either the contact name in the header, or "Contact doesn't exist". I would rather have had it so that ContactProfilePage wouldn't be a smart component.

### Smart components
Contrary to what Redux recommends, there are quite a few connected components in this application. The reason behind that, is because Redux and Router works against eachother, and makes it really difficult to inject props into the dynamically rendered component (the component that gets stuffed into this.props.children on the parent component) without using ugly hacks such as React.cloneElement, which just seems wrong.

## Inspiration
The application takes a lot of inspiration from Slack, in that it has a small list to the left, and when a contact is clicked a larger window is opened to the right, where you can "chat" and more.

## Chatting
Chatting was a cheat feature to actually have something more to do. It isn't actually a chat since there is no backend, so you won't get any real responses back. Which is why I named it the Echo cha(mber)/t since the default is to echo back your message. A nice little feature is that it strips the "syllables" from the message, instead of just removing some given length of strings, which makes it feel more "dynamic".
There are also some phrases that will, instead of echoing the phrase back, return a preprogrammed response. This is handled by Fuse.js which is a fuzzy search library, so that you do not need to match the message exactly.

### Settings
In the settings you can change both your chat name, and also the responses that you can get back.
Responses are stored as json, which means that it will be parsed and stringified. As such, we do not want to store anything that is invalid, since things will break horribly. To handle this, I handle it in my action creator like this:

    saveMessages(messages){
        try {
            return {type: constants.SAVE_MESSAGES, messages: JSON.parse(messages)};
        } catch (SyntaxError) {
            return {type: constants.MESSAGES_NOT_FORMATTED_CORRECTLY};
        }

    }

The constants.MESSAGES_NOT_FORMATTED_CORRECTLY is used to display a message under the input for the messages, so that you know that it isn't parsed correctly.

I also implemented using tab for formatting the json, instead of having to press space four times. This is handled like this:

    onKeyDown(event){
        if (event.which === 9) {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            event.target.value = event.target.value.substring(0, start)
                + "    "
                + event.target.value.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 4;
        }
    }

event.which === 9 checks for the tab key. Then we need to prevent default, so that the focus doesn't jump to another element. Then we add four spaces where the cursor is, and set the cursor at the correct place again, by using the hack of selectionStart = selectionEnd, since there is no native way of setting the cursor otherwise.

## Localstorage
If you have read my other blog posts, I have mentioned localstorage before. Instead of rolling my own solution, I used Ioseffs tiny, but great, library for storing things in localstorage [Redux-simple-localstorage](https://www.npmjs.com/package/redux-simple-localstorage). This makes it super simple, as long as you remember to also add it to your reducers.

    default:
            return (read() && read().contacts) || initialState().contacts;

Or some other nicer solution.