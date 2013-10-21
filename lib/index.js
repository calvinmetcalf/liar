var promise = require('lie');
function qMap(arr,func){
    var len = arr.length;
    if(!len){
        return [];
    }
 var i = 0;
 var out = new Array(len);
 while(i<len){
     out[i]=func(arr[i]);
     i++;
 }
 return out;
}
function pApply(thing,func){
    if(typeof thing.then === 'function'){
        return thing.then(func);
    }else{
        return func(thing);
    }
}
promise.resolve = function(value){
    return promise(function(yes){
        yes(value);
    });
};
promise.reject = function(value){
    return promise(function(yes,no){
        no(value);
    });
};
promise.all = function(array) {
    return promise(function(fulfill, reject) {
        var len = array.length;
        var fulfilled = 0;
        var out = [];
        var onSuccess = function(n) {
            return function(v) {
                out[n] = v;
                if (++fulfilled === len) {
                    fulfill(out);
                }
            };
        };
        array.map(function(a) {
            if (a && typeof a.then === 'function') {
                return a;
            }
            else {
                return promise(function(yes) {
                    yes(a);
                });
            }
        }).forEach(function(v, i) {
            v.then(onSuccess(i), function(a) {
                reject(a);
            });
        });
    });
};
promise.race = function(array) {
    return promise(function(fulfill, reject) {
         var len = array.length;
         var i = 0;
         while(i<len){
             array[i++].then(fulfill, reject);
         }
    });
};
promise.cast = function(thing){
    if(typeof thing.then === 'function'){
        return thing;
    }else{
        return promise.resolve(thing);
    }
};
promise.some = function(array) {
    return promise(function(fulfill, reject) {
        var len = array.length;
        var rejected = 0;
        var out = [];

        function onFailure(n) {
            return function(v) {
                out[n] = v;
                if (++rejected === len) {
                    reject(out);
                }
            };
        }
        array.forEach(function(v, i) {
            v.then(function(a) {
                fulfill(a);
            }, onFailure(i));
        });
    });
};
promise.map = function(array, func) {
    return pApply(array,function(arr){
        return promise.all(qMap(arr,function(a){
            return promise.resolve(a).then(function(b){
                return func(b);
            });
        }));
    });
};
promise.denodify = function(func) {
    return function() {
        var args = Array.prototype.concat.apply([], arguments);
        return promise(function(resolve, reject) {
            args.push(function(err, success) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(success);
                }
            });
            func.apply(undefined, args);
        });
    };
};
module.exports = promise;