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

// console.log(newArr1);

const array2 = [2,5,6,7];

//polyfill of filter 

Array.prototype.myFilter = function (cb){
    const temp = [];
    for( let i =0; i<this.length; i++){
        if( cb(this[i], i, this ))temp.push(this[i]);
    }
    return temp;
}
const array2f = array2.myFilter((num)=>{
    return num>2;
});

// console.log(array2f);

//If no initial value is given to the reduce function thn it will take first element of the array as the initial value.




//polyfill of reduce

Array.prototype.myReduce = function(cb, initial){
    var acc = initial;
    for( let i = 0; i<this.length; i++ ){
        acc = acc?cb(acc, this[i], i, this):this[i];
    }
    return acc;
}
const array2R = array2.myReduce((acc, curr, i, array2)=>{
    return acc = acc + curr;
}, 0);
// console.log(array2R);

for( var i = 0; i<5; i++){
    // setTimeout(()=>console.log(i), i*1000);
}

for( let i=0; i<5; i++){
//       setTimeout(()=>console.log(i), i*1000);
}

aparna();
function aparna (){
     var a = "aparna";
    // console.log(a);
   
}

function fun1(){
    var a ="A";
     return function fun2(num1){
        var b = "B";
        // console.log(a, num1);
       return function fun3(num2){
            var c = "C";
            // console.log(b, num2);

            return function fun4(num3){
                var d = "D";
                // console.log(d, num3);
            }
            
        }
      
    }
   
}

fun1()(2);

//write a funtion which would allow you to do that

var addSix = createBase(6);
addSix(10); //returns 16
addSix(21); //returns 27


function createBase(num){
    return function fun2(num1){
        // console.log( num + num1 );
    }
}


//ques - opimtimze the time answer - closure


// function find(index){
//     var arr = [];
//     for( let i=0; i<1000000; i++){
//         arr[i] = i*i;
//     }
   
//     console.log(arr[index]);
// }


function find(){
    var arr = [];
    for( let i=0; i<1000000; i++){
        arr[i] = i*i;
    }

    return function  closure(index){
        console.log(arr[index]);
    }
}


console.time(); //start the timer
find()(6);
console.timeEnd(); //stops the timer
console.time();
find()(50);
console.timeEnd();

//QUES - LET & VAR question

// function fun3(){
//     for( var i=0; i<3; i++){
//         setTimeout(
//             function log(){
//                 console.log(i);
//             }
//         , i*1000);
//     }
// }

// fun3();

//print 0,1,2 using var only i.e. without using let. Again, the answer is closure.

    for( var i=0; i<3; i++ ){
        function inner(i){
            setTimeout(
                function log(){
                    // console.log(i);
                }
                , i*1000)
        }

        inner(i);
    }


    //private counter - when we don't directly change a private variable instead uses functions to change its value.

    function pCounter(){
        var _counter = 0;  //by convention we name private variables starting with '_'
        function add(increment){
            _counter += increment;
            // console.log(_counter);
        }
        function retrieve(num){
            // console.log(num);
        }
        return{
            add,
            retrieve,
        }

    }

    var c = pCounter();
    c.add(5);
    c.retrieve(6);

    //Module Pattern

    //same way as we were safeguarding the variable using closure we will safeguard a function usinf closure and we term it as madule pattern 

    function mPattern(){
        function private(){
            console.log("private function");
        }

        return function public(){
            console.log("public function");
            private();
        }
    }
    
    mPattern()();

//Ques- make the function run onnly once

let view ;

function likeTheVideo(){
    let count = 0;

    return function(){
        if( count > 0){
        console.log("already liked");
    }
    else{
        console.log("video liked");
        count++;
    }
    };
  
}

// likeTheVideo()(); //this is wrong as by doing this , every time this likeTheVideo function is called  a new memory block is created and a brand new copy of count variable is created to prevent this we need to store the closure returned by this function in a variable and then we can call that variable multiple times by maintaining only one copy of the count variable.

var called = likeTheVideo(); //storing the closure returned by this likeTheVideo function
called();
called();
called();
called();






