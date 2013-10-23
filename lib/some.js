var promise = require('lie');
var cast = require('./cast');
function some(array) {
    return promise(function(fulfill, reject) {
        var len = array.length;
        var succeded = [];
        var failed = [];
        function check(){
            if (failed.length === len) {
                reject(failed);
            }else if((succeded.length+failed.length)===len){
                 fulfill(succeded);
            }
        }

        array.map(cast).forEach(function(v) {
            v.then(function(a) {
                succeded.push(a);
                check();
            },function(a) {
                failed.push(a);
                check();
            });
        });
    });
}
module.exports = some;