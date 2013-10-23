var use = require('./use');
var all = require('./all');
var qMap = require('./qmap');
var resolve = require('./resolve');
function map(array, func) {
    return use(array,function(arr){
        return all(qMap(arr,function(a){
            return resolve(a).then(function(b){
                return func(b);
            });
        }));
    });
}
module.exports = map;