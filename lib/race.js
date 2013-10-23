var promise = require('lie');
function race(array) {
    return promise(function(fulfill, reject) {
         var len = array.length;
         var i = 0;
         while(i<len){
             array[i++].then(fulfill, reject);
         }
    });
}
module.exports = race;