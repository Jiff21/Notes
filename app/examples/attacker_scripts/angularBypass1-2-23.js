


{{toString.constructor.prototype.toString=toString.constructor.prototype.call;["a","alert(1)"].sort(toString.constructor)}}
["a", "alert(1)"]


// avlidienbrunn exploit on angular 1.2.23 and under.
// In my recent research I discovered a bypass to the AngularJS "sandbox", allowing me to execute arbitrary JavaScript from within the Angular scope, while not breaking any of the implemented rules (eg. Function constructor can't be accessed directly).

// The main reason I was allowed to do this is because functions executing callbacks, such as Array.sort(), Array.map() and Array.filter() are allowed. If we use the Function constructor as callback, we can carefully construct a payload that generates a valid function that we control both the arguments for, as well as the function body. This results in a sandbox bypass.

// Example: {{toString.constructor.prototype.toStri