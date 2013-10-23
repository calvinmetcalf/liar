var promise = require('lie');
var cast = require('./cast');
function all(array) {
    return promise(function(fulfill, reject) {
        var len = array.length;
        if(!len){
            fulfill([]);
        }
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
        array.map(cast).forEach(function(v, i) {
            v.then(onSuccess(i), function(a) {
                reject(a);
            });
        });
    });
}
module.exports = all;