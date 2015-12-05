# TOS
1. [A Discussion on time(rs)](#a-discussion-on-timers)
2. [JavaScript and concurrency](#javascript-and-concurrency)
3. [A caveat about scheduling in general](#a-caveat-about-scheduling-in-general)
4. [setTimoeut](#settimeout)
    1. [A trick with setTimeout](#a-trick-with-settimeout)
5. [setinterval](#setinterval)
    1. [In common](#in-common)
    2. [setTimeout and setInterval, which to use](#settimeout-and-setinterval-which-to-use)
6. [requestAnimatinFrame](#requestanimationframe)
7. [process.nextTick](#processnexttick)


# A discussion on time(rs)

So a while ago (some days ago) there was a discussion on Slack about JavaScripts differnet timers, or more specificly, about `setTimeout` and `setInterval`. To add to that list, there is also `requestAnimationFrame` and in Node: `process.nextTick`. So what is the difference between these, and when should you use them? (We might even talk a little about Web Workers.)

### JavaScript and concurrency
JavaScript runs in a single thread in the environment that it runs, be it the V8 engine that Chrome has, SpiderMonkey for Firefox or any other such environment. This makes it a lot easier to have JavaScript interact with the webpage that will most likely be the front-end of the code that is executed (since we do not need to handle race conditions, locks and other hard to handle problems).  
However, when you want to use JavaScript as an actual programming language, and not just as a simple scripting language for changing the color of a button on click, then it might be a hinderance. While there is no way to get around the problem with JavaScript begin a single threaded language by design (except for Web Workers) we can still fake concurrency by using the differnet timers that excist.

### A caveat about scheduling in general
Since JavaScript is single threaded, there might be something blocking the callback for running, which means that the time specified is not guaranteed to be met exactly. It might run before, at, or after the time that you specify. However, this is something that you will have to live with when running timers in any environment, unless you have complete controll over the hardware. This applies to all timers, in almost all programming languages, on almost all operating systems. Even if you schedule something with the Windows low level API, you still wont get perfect timing.

#### `setTimeout`
`setTimeout` might be the easiest timer to understand in JavaScript. In the most easiest form, `setTimeout` takes a callback function, and a specified time. When the statement is executed, the timer starts ticking, and when the specified time is up, the callback function is executed. Sort of..  (See the previous section for more specifics about timers.)

#### A trick with `setTimeout`
One thing that you can do with `setTimeout` to get code to run when there is nothing else running, then you can use `setTimeout(fn, 0)`. This queues `fn` to run as soon as possible. As you will see, if you can both to read past the `requestAnimationFrame` part is that this is more or less equivalent of `process.nextTick`, just less efficient.

#### `setInterval`
`setInterval` is almost like `setTimeout`. It behaves just the same way. It takes a callback, and a time and runs the callback after the specified time. The difference comes in that `setInterval` executes the callback until it is canceled. I.e. the callback is executed, and the timer starts over. And then the callback is executed and the loops starts over. This continues until you explicitly call `clearInterval` with the return value of `setInterval`.

##### In common
Both of these timers have the same method signature: `(callback, time) -> id`. The id is used to stop the timer, which you pass to either `clearInterval` or `clearTimeout`.

##### `setTimeout` and `setInterval`, which to use
When you look at these methods, you would think that they are quite similar, and you would be correct -- they are. So which one should you use?  
In general, or in any specific case really, you shouldn't use `setInterval` at all. The problem stems from the fact that these timers aren't actually JavaScript code that is executed, they are native methods found in the JavaScript engine.   
So why would that be a problem, you might ask?  
The problem is that `setInterval` doesn't care about how long the callback method takes to execute, it can return immediately, or it can lock for several seconds, but `setInterval` will still execute according to the time, each and every time. You'd think that it would wait until the function returns before scheduling the next execution, but you'd be wrong. This might not be a problem for some types of situations, but imagine an application where we use Ajax to load data from somewhere. We can never know how long time the data will take to load, it might load almost instantly if the browser has it cached and decides that it can use the cache, or it might take seconds, minutes, or longer. In such a situation it would be foolish to try to use `setInterval`, because if the callback waits for the result of the Ajax call longer than the time, then the callback will be called again, and again, and again... which we probably do not want.  
A better solution would be to use `setTimeout` and use a self calling method in the callback, so that it reschedules itself when the timer has ended. This makes it so that we can guarantee that the callback has ended before it is scheduled again.  
Something like: 

    function takesLongTime(){
        var json = getJson(someslowloadingpage);
        /* do something with the result */
        setTimeout(takesLongTime, 1000);
    }
    
In this kind of situation, takesLongTime would be called atmost once every second.

### `requestAnimationFrame`
Woah, I almost forgot we had two more functions to discuss.  
The first of these to discuss, as you probably already guessed from the h3, is `requestAnimationFrame`. This neat little function, does what it says on the tin. It requests an animation frame.  
But, what is an animation frame, and why should we care?  
To understand this, we must first discuss how you can see stuff on your screen. 

Everything that you can see when you use a screen, such as a phone screen, a monitor or a TV, is pixels that are sending out light, given some specification from the GPU in the device. The device updates some given amount of times each second, called the FPS, or Frame Per Second. This number is most likely 60, unless you own a fancy screen with a FPS of 120 or maybe even 144. (This number can also be given in Hertz, or Hz, which is just FPS with a fancier name.)  
What does this have to do with JavaScript then? Well.. everything that happens on in a program will be rendered to the screen a specific amount of times each second, 60 in this case. If the browser would render more times than 60, it wouldn't show up on the screen, which would be a waste of resources. So the browser will try to update the image 60 times a second. Each of these is called a repaint, it repaints what it displays. An unpdate to the UI, a component rendered by React, a letter added to a textarea on the dillinger.io page or anything else, will be repainted each of these frames.  
So if you have a game, or some other graphical application, where you care when something gets displayed as soon as possible you want to render the changes before the screen gets repainted, or the changes won't happen until the next repaint.

This is how you want the rendering cycle to look like: 

    [Changes to canvas] | [Repaint] | [Displays on screen] | [Other stuff] | [Loop]
    
You render the canvas, and the browser repaints, which gets displayed on screen. Then other stuff happens, and the cycles goes around. This means that changes gets displayed as soon as possible, to intrudce the least amount of lag between input and display of the changes those inputs made.

If you instead would do it like this:

    [Repaint] | [Displays on Screen] | [Changes to canvas] | [Other stuff] | [Loop]
    
It would mean that the time it takes between the changes to the canvas happens, and them actually getting displayed is much larger than in the first example. This intrudces lag, and makes for a poorer user experience.


With all that said, what does this have to do with `requestAnimationFrame`?  
`requestAnimationFrame` is for those situations where you want to update a canvas, or anything graphically, and you want it to happen before the next repaint. So if you have a game, the rendering function would be passed to the `reqestAnimationFrame` call, so that you display the changes as close to the repaint as possible, with the least amount of lag.  
`requestAnimationFrame` is functionally equivalent of `setTimeout` with a time value of 1000/60, if the update time of the screen is 60 Hz, but it is probably better to use `requestAnimationFrame` than to use `setTimeout` when you want to actually do some sort of rendering, animation or similar visible changes.

### `process.nextTick`
And for my next trick, I will pull a function not accessible from the browser into this already way too long article.

`process.nextTick` is a function that you can use if you are running your JavaScript code in Node.js. This function works like the other timer function, in that it takes a callback, and runs it. The difference is that it does it as soon as it possibly can (give or take). It is also [a LOT](https://gist.github.com/mmalecki/1257394) more efficient than setTimeout if you use it a large amount of times. If you need your code to be run asynchronosly, and do not need to run the code some specific amount of time in the future, the `process.nextTick(fn)` is a better choise than `setTimeout(fn, 0)`. 
(The fact of the matter is that it's a lot more complicated than my simple explanation, and you can find better [explanations](http://howtonode.org/understanding-process-next-tick) elsewhere if you actually need it.)
