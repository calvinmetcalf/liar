var promise = require('lie');

function isPromise(a){
    return (a && typeof a.then === 'function');
}

function qMap(array,func){
    var len = array.length;
    var out = new Array(len);
    var i = -1;
    while(++i<len){
        out[i] = func(array[i],i);
    }
    return out;
}
function qMaps(array){
    var i = 0;
    var len = arguments.length;
    var out = array;
    while(++i<len){
        out = qMap(out,arguments[i]);
    }
    return out;
}
function ifPromise(thing,success,err){
    return isPromise(thing)?thing.then(success,err):success(thing);
}
function map(array,func){
    return promise(function(yes,no){
        if(!Array.isArray(array)){
            return no('not an array');
        }else if(!array.length){
            return yes([]);
        }
        var len = array.length;
        var out = new Array(len);
        function one(p){
            return func?ifPromise(p,func,no):p;
        }
        function two(p,i){
            ifPromise(p,function(value){
                out[i]=value;
                if(!(--len)){
                    yes(out);
                }
            },no);
        }
        qMaps(array,one,two);
    });
}
function maps(array){
    return promise(function(yes,no){
        var i = 0;
        var len = arguments.length;
        var out = array;
        function loopFunc(I){
            return function(v){
                return map(v,arguments[I]);
                };
            }
        do{
            out = ifPromise(out,loopFunc(++i),no);
        }while(i<len);
        yes(out);
    });
}

exports.map = maps;
exports.all = function(a){
    return maps(a);
};
exports.ifPromise = ifPromise;
exports.isPromise = isPromise;