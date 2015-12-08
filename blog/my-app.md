# My application
My application strives to be a really simple application: a contact list. To save the contacts I intend to use localStorage. 

To the right, I have a profile page viewer, a feature that I stole from slack. It's a nice feature, and instead of having a full-on new page, which it also could be, this is just a page that opens halfway.
Here I have encountered a problem.  
My routes.js looks like this:  

    <Router>
        <Route path="/" component={Wrapper}>
        <IndexRoute component={Home}/>
        <Route path="/contacts" component={NewAppCont}>
            <Route path="/contacts/:name" component={NewAppCont}/>
        </Route>
        </Route>
    </Router>
    
If, instead of having the `NewAppCont` being the component for the path "/contacts/:name", I have a `ProfilePage`, I could render it by using `{this.props.children}` in the `NewAppCont` render method. However, this also means that `ProfilePage`cannot get anything from `NewAppCont` in means of props, such as a Contact based on the route.  
This all boils down to that `ProfilePage` needs to be an "smart" component, something that seems to be really wasteful. Am I overreacting, or should I just render it manually from `NewAppCont` instead?

**Update:** It seems that I was overracting. Instead of having NewApp inject all the different stuff into the profile page component, it was much easier just to do it by having profile page be a "smart" component and deciding stuff on it's own.

What have I learn't? If it seems easier, and produces less and better looking code, then maybe it's the better solution? :D