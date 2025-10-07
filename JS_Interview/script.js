var arr = [1,2,3,4,5,6];

var newArr = arr.map((num, i, arr)=>{
    if( num%2 === 0)return num*2;
    return null;
});

// console.log(newArr);

//polyfill of map

Array.prototype.myMap = function (cb){
    var temp = [];
    for( let i=0; i<this.length; i++){
temp.push(cb(this[i],i, this));
    }
    return temp;
    
}

var newArr1 = arr.myMap((num, i, arr)=>{
    if( num%2 === 0)return num*2;
    return null;
});

console.log(newArr1);

