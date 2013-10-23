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
module.exports = qMap;