# Using localStorage for app storage
With a webapplication there is alwasy the problem that the user might close the window, or something even more extreme. I'm planning to rely on `localState`, which means that I must have some way to prevent the loss of contacts.  
How would I go about it? My first, probably naïve solution to the problem, is to read the stores' saved state from `localStore` at app load, by just dispatching a `LOAD_FROM_LOCALSTORAGE` action to the store, and let the reducer handle loading the state.

Then comes the bigger problem of saving the store when it is needed. There is a library -- Redux-localstorage -- that handles just that.   
However, the library seems to be very advanced, and handles many different use-cases, something that I do not need. Can I use a simple `setTimeout`, that saves the `getState()` from the store?  
This seems to be a good solution, until the user closes the browser before the save has happened, and we lose some part of the contacts.

I could also imagine a solution where you wrap the reducers, and each time you return a newstate you save it to localStorage, (a decorator maybe?) but is this the most beautiful and best solution?

In the post ["Don't lose user and app state, use Page Visibility"](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/?utm_source=html5weekly&utm_medium=email) Ilya Grigorik talks about not losing progress and app state. To save our app state, or the store, can we use the same methods that Grigorik talks about? I.e. listen to visibilitychange and save the store when the visibilityState is hidden.

However, I haven't really reached that position in my app yet, so I will have some time to decide wether to use Firebase, localStorage with some homegrown solution for saving, or anything else.