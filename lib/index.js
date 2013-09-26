var promise = require('lie');
function toPromise(thing){
    return promise(fulfill){
        fulfill(thing);
    }
}
function list(array){
    return array.map(toPromise);
}
exports.list = list;
function all(array) {
    return promise(function(fulfill,reject){
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
        list(array).forEach(function(v, i) {
            v.then(onSuccess(i), function(a) {
                reject(a);
            });
        });
    });
};
exports.all = all;
function some(array) {
    return promise(function(fulfill,reject){
        var len = array.length;
        var fulfilled = 0;
        var out = [];
        var done = function() {
            if(out.length){
                fulfill(out);
            }else{
                reject();
            }
        };
        array.forEach(function(v, i) {
            v.then(function(v) {
                out.push(v);
                if (++fulfilled === len) {
                    done();
                }
            }, function() {
                if (++fulfilled === len) {
                    done();
                }
            });
        });
    });
};
exports.some = some;
function map(array, func){
    return all(list(array).map(function(v){
        return v.then(func);
    }));
}
exports.map = map;

function fold(array,func,accum){
    return promise(function(fulfill,reject){
        var fulfilled = 0;
        var arr = list(array);
        accum = toPromise(accum) || arr.shift();
        var len = arr.length;
        function next(thing){
            all([accum,thing]).then(function(answers){
                accum = func(answers[0],answers[1]);
                if(fulfilled>=len){
                    fulfill(accum);
                }
            },reject);
        }
       arr.forEach(next);
    });
}

exports.fold = fold;

