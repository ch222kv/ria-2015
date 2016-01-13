# Flux vs Redux, after the port
My deep dive centers around porting my existing app, from Redux, to Flux (as in [Flux](https://facebook.github.io/flux/) and not some other derivate). This document will serve as my deep dive, there will be no video. There will be comparisons, and there will be ranting. 

First up -- comparisons, and then -- ranting!

## Comparisons
Let's look at the stores first, where the meaty part of the porting is happening.

### Stores
We begin with looking at my Redux store, as that is the beginning point of this whole thing.

#### Redux

    const rootReducer = combineReducers({
        contacts: contactsReducer,
        chat: chatReducer
    });

    const store = applyMiddleware(write, thunk)(createStore)(
                                    rootReducer, read() || initialState());

    export default store;
    
So this is my Redux store. It uses Ioseff's redux-simple-localstorage to read and write to localstorage; it uses two reducers, each one handling a separate part of the state; it uses an initialstate, given by `initialState()`; it uses thunk, to handle async actions, where you dispatch an action sometime later.  
All in all, quite simple, not much to see, not much to wrap your head around.

To make up for the fact that Flux stores handle both the role of `store` and the role of `reducer` here is my Redux reducer.

    const reducer = (state, action)=> {
        let newstate = Object.assign({}, state);
        switch (action.type) {
            case C.CHAT_MESSAGE:
                newstate.log.push(action.entry);
                return newstate;
            case C.ECHO_CHAT_MESSAGE:
                newstate.log.push(Object.assign({}, action.entry, {user: "echo"}));
                return newstate;
            case C.SET_CHAT_NAME:
                return Object.assign(newstate, {currentChatName: action.name});
            case C.SAVE_MESSAGES:
                return Object.assign(newstate, {messages: action.messages, messagesError: null});
            case C.MESSAGES_NOT_FORMATTED_CORRECTLY:
                return Object.assign(newstate, {messagesError: "Incorrectly formatted messages!"});
            default:
                return (read() && read().chat) || initialState().chat;
        }
    };

    export default reducer;

Here we can see that the reducer is a pure function. It takes a state as a parameter, and returns a new state without changing the state that it get's passed. Here is also a perfect opportunity to add a default case, when we wan't to read from localstorage. Nice and simple. 

#### Flux
On to my Flux stores.

    const chat = {
        log: [],
        currentChatName: null,
        messages: [{
            entry: "why are you copying me?",
            response: "I'm not!"
        }],
        messagesError: null
    };

    const ChatStore = Object.assign({}, EventEmitter.prototype, {
        getState(){
            return chat;
        },
        addChangeListener(callback){
            this.on("CHANGE", callback);
        },
        emitChange: function () {
            this.emit("CHANGE");
        },
    
        /**
         * @param {function} callback
         */
        removeChangeListener(callback){
            this.removeListener("CHANGE", callback);
        },
        dispatcherIndex: Dispatcher.register((payload)=> {
            const action = payload;
    
            switch (action.type) {
                case "CHAT_MESSAGE":
                    chat.log.push(action.entry);
                    break;
                case C.ECHO_CHAT_MESSAGE:
                    chat.log.push(Object.assign({}, action.entry, {user: "echo"}));
                    break;
                case C.SET_CHAT_NAME:
                    chat.currentChatName = action.name;
                    break;
                case C.SAVE_MESSAGES:
                    chat.messages = action.messages;
                    chat.messagesError = null;
                    break;
                case C.MESSAGES_NOT_FORMATTED_CORRECTLY:
                    chat.messagesError = "Incorrectly formatted messages!";
                    break;
                // add more cases for other actionTypes, like TODO_UPDATE, etc.
            }
    
            ChatStore.emitChange();
            return true; // No errors. Needed by promise in Dispatcher.
    
        })
    });
    
    export default ChatStore;
    
Here there's a lot more to talk about, so let's take it one step at a time.  
1: 
The `const chat = { ... }` part serves as my initial state. In Flux there is no way to handle an initial state, i.e. you can't inject it as you do with Redux and `createStore(rootReducer, initialState())`. Instead each store talks to an object hidden in the closure, which means that it can't be reached from outside (unless you export it). This is different from Redux in that you can't actually change a stores value __at all__ unless you use a reducer (more on that later).  
If you wan't to handle a reset of the stores state (say you wan't to handle a reset of contacts, or reset the chatlogs, you just nuke the state all together), you much explicitly do it yourself, by changing the value of `chat` in this case.  
This design also makes it so that it is difficult to add in localstorage handling, without writing the same code a large amount of times. Because where would you put it?

2: Our store is just a plain object getting some stuff from EventEmitter, and also adding some more things to that object. The difference in this is that in Flux, we need to explicitly define these methods ourself, `addChangeListener`, `emitChange`, `removeChangeListener` are all methods that we need to add, but just serves as a work around later.  
`dispatcherIndex` is where the actual meaty part of the store (which in Redux is handled in a separate reducer). This is where a statechange is boiled down to a change in `chat`. The only real difference here is that, in Flux, we change `chat`, we add values to it. This means that in Flux the reducing actions (unless we use ReducerStore, from Flux utils) isn't pure functions, they change stuff outside of the parameters it get's passed.  
When we have changed `chat` we must also `emitChange` ourselves. This makes it so that components who are listening to changes on the ChatStore know that things have changed, and should update.

### On to actual components!

#### Redux
The component I will look at is the Chat component. It is a smart component, as they would be called in Redux. These components are connected, and get a slice of the state, and can also dispatch actions.

    const Chat = React.createClass({
        submitEntry(e){
            if (e.which === 13) {
                this.props.submitEntry({user: this.props.chat.currentChatName, message: this.refs.chattext.value});
                this.refs.chattext.value = "";
            }
            console.log(Object.assign({}, e));
    
        },
        render(){
            return (<div>
                <h1>Echo cha(mber)/(t)</h1>
                <Link to={"/contacts/" + this.props.params.name}>Back to profile</Link>{" | "}
                <Link to={"/contacts/" + this.props.params.name + "/chat/settings"}>Settings</Link>
                <ChatLog chat={this.props.chat} style={{"overflowX": "scroll", "maxHeight": "100vh"}}/>
                <div style={{width: "100%", position: "absolute", bottom: 0, left: 0, right: 0}}>
                    <input type="text" ref="chattext" style={{width: "80%", height: "30px", fontSize: "25px"}} autoFocus
                           onKeyPress={this.submitEntry}/>
                </div>
                <hr />
    
            </div>);
        }
    });
    
    
    const stateToProp = (state) => {
        return {
            chat: state.chat
        };
    };
    const dispatchToProps = (dispatch) => {
        return {
            submitEntry: (entry) => dispatch(actions.submitEchoChat(entry)),
            changeChatName: (name) => dispatch(actions.changeCurrentChatName(name))
        };
    };
    const EchoChatCont = connect(stateToProp, dispatchToProps)(Chat);
    export default EchoChatCont;
    
There's a lot of stuff to look at here, so we will only talk about some of them.  
Let's first look at the `connect(stateToProp, dispatchToProps)(Chat)` part. This is where all the Redux magic is happening. What it does is wrapping our `Chat` component, and injecting both the state and also the actions into our component via the props. Here we have full control over what things will get injected, and what they will be named.  
For example, we get access to the `state.chat` via `chat`. So in our component, we can access all `state.chat` related things via `this.props.chat` (like it is done to inject the chatlines to the `ChatLog` component).  
dispatchToProps allows us to also inject actions into the props of the component. This component has access to `submitEchoChat` via submitEntry, and `changeCurrentChatName` via changeChatName. Of course, you do not need to actually rename them, you may just use their actual name as well.  
The rest is pretty simple, it's just a React component, in all it's glory. It does things based on it's props, just what you would expect. So the only part that is different from a Redux-free component is the connect part.

#### Flux
    const Chat = React.createClass({
        getInitialState(){
            return {chat: ChatStore.getState()};
        },
        submitEntry(e){
            if (e.which === 13) {
                ChatActions.submitEchoChat({user: this.state.chat.currentChatName, message: this.refs.chattext.value});
                this.refs.chattext.value = "";
            }
            console.log(Object.assign({}, e));
    
        },
        render(){
            return (<div>
                <h1>Echo cha(mber)/(t)</h1>
                <Link to={"/contacts/" + this.props.params.name}>Back to profile</Link>{" | "}
                <Link to={"/contacts/" + this.props.params.name + "/chat/settings"}>Settings</Link>
                <ChatLog chat={this.state.chat} style={{"overflowX": "scroll", "maxHeight": "100vh"}}/>
                <div style={{width: "100%", position: "absolute", bottom: 0, left: 0, right: 0}}>
                    <input type="text" ref="chattext" style={{width: "80%", height: "30px", fontSize: "25px"}} autoFocus
                           onKeyPress={this.submitEntry}/>
                </div>
                <hr />
    
            </div>);
        },
        componentDidMount(){
            ChatStore.addChangeListener(this._onChange);
        },
        componentWillUnmount(){
            ChatStore.removeChangeListener(this._onChange);
        },
        _onChange(){
            this.setState({chat: ChatStore.getState()});
        }
    });
    export default Chat;
    
Here is the Flux component. Instead of `connect`ing this component, we are using the change listeners that we talked about earlier. This leads to `this._onChange` getting called, which updates the state with the stores current state.  
The way that Flux is handling updates to the store is a lot more manual work (and in my oppinion, a lot uglier). Instead of using a nice little wrapper, a decorator or any other way that you might inject data to a component, we just update the `state` of the component whenever a change event is emitted from the `store`. This solution feels like a hack, and it also goes against some ideas and oppinions (I believe) that the React team has to say about React and `state`, `props` and what role they fill([Props in getInitialState Is an Anti-Pattern](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)).  
Using state instead of props also makes it so that it get's more difficult to use, test and argue about the component. Because now we have tightly coupled the `Chat` component with the store, which makes it so that it get's a lot harder to remove the store if we wan't to change it for something else, if we wan't to wrap the `Chat` component inside another component that is the component that listens to changes et al. In my head it doesn't make sense to store things in the `state` that somehow is affected by things outside of the component itself, that is what `props` are for.  
As we can see in [props vs state](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md#readme) 
>props (short for properties) are a Component's configuration, its options if you may. They are received from above and immutable as far as the Component receiving them is concerned.

This makes sense to me. Since what we are doing in the component is to dispatch actions, and let the `store` handle the changes, it would make sense to use props for this use case.
> A Component manages its own state internally, but—besides setting an initial state—has no business fiddling with the state of its children. You could say the state is private.

If you can't, or shouldn't change the state of children to the component, how are you going to inject, say, a contact to a profile displayer? Then you must listen for changes on a lot of components, just because you chose state, instead of props to store your data.

### And finally, actions

#### Redux
    export default {
        submitEchoChat(entry){
                return function (dispatch, getState) {
                    dispatch({type: constants.CHAT_MESSAGE, entry});
                    if ([...]) {
                        setTimeout(() => dispatch({
                            type: constants.ECHO_CHAT_MESSAGE,
                            entry: entry
                        }), 750);
                    } else {
                        const loop = (syllablesToCheck) => {
                            setTimeout(()=> {
                                    if (syllablesToCheck.length > 0) {
                                        [ ... ]
                                        dispatch({
                                            type: constants.ECHO_CHAT_MESSAGE,
                                            entry: entry
                                        });
                                        //Yay for more arbitrary messages
                                        time = 5;
                                        loop(syllablesToCheck.slice(0, length));
                                    }
                                },
                                time);
                        };
                        setTimeout(()=> {
                            dispatch({type: constants.ECHO_CHAT_MESSAGE, entry});
                            loop(syllablesLeft);
                        }, 1000);
                    }
                };
            },
            changeCurrentChatName(name){
                return {type: constants.SET_CHAT_NAME, name};
            },
            saveMessages(messages){
                try {
                    return {type: constants.SAVE_MESSAGES, messages: JSON.parse(messages)};
                } catch (SyntaxError) {
                    return {type: constants.MESSAGES_NOT_FORMATTED_CORRECTLY};
                }
            }
        }
    };

#### Flux
    export default {
        submitEchoChat(entry){
            AppDispatcher.dispatch({type: constants.CHAT_MESSAGE, entry});
            //Prevents getting the canned result back always
            if ([...]) {
                setTimeout(() => AppDispatcher.dispatch({
                    type: constants.ECHO_CHAT_MESSAGE,
                    entry: entry
                }), 750);
            } else {
                const loop = (syllablesToCheck) => {
                    setTimeout(()=> {
                            if (syllablesToCheck.length > 0) {
                                [ ... ]
                                AppDispatcher.dispatch({
                                    type: constants.ECHO_CHAT_MESSAGE,
                                    entry: entry)
                                });
                                //Yay for more arbitrary messages
                                time = 5
                                loop(syllablesToCheck.slice(0, length));
                            }
                        }, time);
                };
                setTimeout(()=> {
                    AppDispatcher.dispatch({type: constants.ECHO_CHAT_MESSAGE, entry});
                    loop(syllablesLeft);
                }, 1000);
            }
        },
        changeCurrentChatName(name){
            return AppDispatcher.dispatch({type: constants.SET_CHAT_NAME, name});
        },
        saveMessages(messages){
            try {
                return AppDispatcher.dispatch({type: constants.SAVE_MESSAGES, messages: JSON.parse(messages)});
            } catch (SyntaxError) {
                return AppDispatcher.dispatch({type: constants.MESSAGES_NOT_FORMATTED_CORRECTLY});
            }
        }
    }
    
(The code has been shortened to only include the parts that you would care about, but check out the full repo for all the code if you want!)

#### The difference in the actions
The only, real, difference between these two pieces of code, is that the Flux code explicitly calls `AppDispatcher.dispatch` when it want's to dispatch an action, whilst the Redux code only returns an object, that is then dispatched via the `dispatchToProps` object that you use when you `connect` your component. So in Flux, you call the dispatch in you action, and in Redux you just return an object that is later dispatched. No that big of a difference, really.  
The keen eyed observer might notice that there is one more difference, the `submitEchoChat` method. The difference here is that in Redux, since you are expected to return an object, and have no direct access to the `dispatch` method, how are you going to handle async actions, such as `submitEchoChat`? Well, you can't... Unless you use Redux-thunk, or some other middleware. Redux-thunk injects `dispatch`, and `getState` into the async method, and allows you to dispatch an action when you want, which allows for async actions.

This makes it easier to use Flux, if you are using a lot of async actions, but all calls to `AppDispatcher.dispatch` are just boilerplate code, and shouldn't really be necessary, at least in my Redux infected mind. 


## Now, onto Ranting!
This will probably be mostly me ranting about what is bad about Flux, and not that much about what is good about Flux. Hopefully I can constrain myself, and write some lines that doesn't bash on every part of Flux that is in some way different from Redux (maybe?).

The thing with Flux is, there are a lot of people that have oppinions about Flux. That wouldn't be a problem if the people who had the oppinions could agree on something, but it seems it is very difficult to come to any sort of conclusion what so ever.


### Stores...
How do yo handle things like API calls, in the action creator, in the store, some other place? No body seems to be able to agree. One example that perfectly shows this is this question on [stackoverflow](http://stackoverflow.com/questions/25630611/should-flux-stores-or-actions-or-both-touch-external-services). Other questions are similar, and get different answers back.   

#### ...compared to Redux
In the Redux world, it's a lot easier since stores should be pure functions. That way they can't access outside resources, since that would break the pure part. In Redux there is a clear way to do things.  

Only actions, or in `connected` components should ever `dispatch` actions.  
Only actions should access outside resources.  
Only stores should ever permute the current state, by returning a new state to be used.

If there is no ambiguity, nobody should be able to be confused, everything should be clear, and everything get's easier.  
But it's not. As I have already pointed out, there are areas that aren't clear. This must be Flux's greatest weakness.

Now you might say that Flux is just a references implementation of an architecture, and that there can be, and are, other implementations that solve the problems in other ways (like Redux, Reflux, et al). But that is just a poor explanation for things that shouldn't be.

### Documentation 
To continue on, the [Flux documentation](https://facebook.github.io/flux/docs/overview.html#content), as I have already mentioned, is lacking in almost all areas. Instead of having clear examples, good explanations, like Redux (just look at [that](http://rackt.org/redux/index.html) beautiful documentation), it just has a few pages of "do a little what ever you like" probably also owing to the whole "we are just a reference implementation". Also one of the things that bugs me the most is that they have NuclearMail ("Facebook engineer Ian Obermiller shows how to build a more complex Flux application in NuclearMail, an example GMail client.") as an example of "a more complex Flux application", but it uses Redux instead of Flux. This makes no sense, unless they swapped out Flux for Redux sometime in the development of NuclearMail, or are trying to argue that Redux is a derivative of Flux, and as such is using Flux.  
Luckiy they also provide some "Yahoo! Flux examples" that actually use Flux, but heavily modded by different helpers and so on to actually make it managable. Fluxible is undoubtedly more or less needed to make Flux somewhat comparable to Redux, but why should it be needed in the first place? Many of the problems with Flux is because of its base architecture, not because the problems are in themselves hard to solve, since many have solved them.

### `waitFor`
What is this odd thing actually for? Well, according to the documentation, if you want your store to depend on other stores updating, you must use `waitFor` so that things doesn't happen in the wrong order, or something. It also gives you a nice little implementation of it, but says that it will deadlock if you have two stores that `waitFor` eachother. So why did they even bother to provide the code if it is, by design, wrong? Nobody knows, I guess.  
So what do you actually use `waitFor` for? Nobody knows, again, since they didn't bother to provide a more advanced example.

### The good (can you believe that there is something good?)
However, what I do like about Flux is that things are a bit more clear, there isn't that much magic happening, not at the same level as it is happening on the Redux side. If you can look past the boilerplatey code, and the fact that you need to write quite repetative code to get a component to listen to a store, it's still quite nice. This, as I might have covered earlier could also, probably, be done by some kind of wrapper ( such as Fluxible) so that the code you write doesn't need to explicitly add event listeners to the store to get it to work.

### Summary of my ranting
To summarize it feels like Flux relies very heavily on other people doing the work, and Flux only being a reference implementation, that you will have to fix with Fluxible, or other libraries that solve the nitty gritty details that the Flux developers for some reason didn't do anything about.  
What is inexcusable is the awful state their documentation is, compared to Redux great one. If you are new to Flux (which you probably are if you visit their documentation) then you probably want some good examples with varying level of complexity, which you won't find. What you will find is an incompete documentation that is lacking in almost all areas. 

## My app
Anyway, back to centering around my application more than just ranting.

My ContactApp is now ported over to Flux, except for a single feature, the localStorage sync.  
When I used Redux, it was easy to just throw in Ioseff's redux-simple-localstorage and get it to save the whole state to localStorage on each action. But how would you go about implementing this in a Flux application? In my port, I am using a single AppDispatcher (which seem to be the way to do it), which is the only common ground on which both stores stand, which makes it one of the few places to place the saving, that doesn't require code duplication en masse.   
Once again there are a lot of different solutions to this problem. "Use componentDidUpdate on each component.", "Use a initialize method on each store.", which all makes architectural sacrifices just to implement something that should be quite easy to handle.
