var promise = require('lie');
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
    if (Array.isArray(array)) {
        return promise.all(array.map(func));
    }
    else if (typeof array.then === 'function') {
        return array.then(function(a) {
            return promise.all(a.map(func));
        });
    }
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