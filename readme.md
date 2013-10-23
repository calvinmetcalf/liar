# liar

  A modular collection of tools for asynchronous programing via promises, all tools are available as a bundle here or standalone in their own repo.

## API

```bash
npm install liar
```

```javascript
var promise = require('liar');
```

###[basic promise](https://github.com/calvinmetcalf/lie)

```javascript
promise(function(resolve,reject){
    resolve(value);
    //or
    reject(reason);
});
```

a shortcut to [my library lie](ttps://github.com/calvinmetcalf/lie). You need to give it a function
which takes 2 arguments, a function to call on success and one to call on failure.

###[all](https://github.com/calvinmetcalf/lie-all)

```javascript
promise.all(array of promises)
```

returns a promise for an array of all the responses, returns an error if any of the promises throw errors. Returned values are in the same order as the input array.

###[some](https://github.com/calvinmetcalf/lie-some)

```javascript
promise.some(array of promises)
```

Similar to all but will only throw an error if all of the promises throw errors, otherwise returns an array of whichever values succeeded in the order that they completed, on error returns an array of errors.

###[map](https://github.com/calvinmetcalf/lie-map)

```javascript
promise.map(array of promises, function)
```

Takes the array of values, applies function to them, and returns a promise for all the values. Function will be called with a value (not a promise) and may return either a promise or a value, array can filled with promises or values or a mixture.


###[race](https://github.com/calvinmetcalf/lie-race)

```javascript
promise.race(array of promises)
```

resolved with whatever value or error that resolves first.

###[cast](https://github.com/calvinmetcalf/lie-cast)

```javascript
promise.cast(value or promise)
```

If it's a promise, returns it, if it's a value, returns a promise that resolves to it.

###[use](https://github.com/calvinmetcalf/lie-use)

```javascript
promise.use(value or promise, function)
```

If the value is a promise, apply the function to the value it resolves into and return a promise for that, otherwise apply the function to the value and return the result.

###[resolve](https://github.com/calvinmetcalf/lie-resolve)

```javascript
promise.resolve(value)
```

create a promise that is resolved with this value.

###[reject](https://github.com/calvinmetcalf/lie-reject)

```javascript
promise.reject(value)
```

create a promise that is rejected with this value.

###[denodify](https://github.com/calvinmetcalf/lie-denodify)

```javascript
promise.denodify(function)
```

takes as an argument a function which has a callback as it's last argument, returns a function that acts identically except it returns a promice instead of taking a callback.

## License

  MIT
