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


//Currying

//Ques - sum(2)(6)(1)

function sum(a){
   return function(b){
       return function(c){
        // console.log(a+b+c) ;
       }
   }
}

sum(2)(6)(1);

//Ques - 
//evaluate("sum")(4)(2) => 6
//evaluate("multiply")(4)(2) => 8
//evaluate ("divide")(4)(2) => 2
//evaluate ("subtract")(4)(2)=>2

function evaluate (operation){
   return function (a){
    return function(b){
         if( operation === "sum")return a+b;
         else if ( operation === "multiply")return a*b;
         else if( operation === "divide")return a/b;
         else{
            return a-b;
         }
    }
   }
}

// console.log( evaluate("sum")(4)(2));
// console.log(evaluate("subtract")(4)(2));
// console.log(evaluate("divide")(4)(2));

//infinite currying
//sum(2)(3)(4)......so on

function sum(a){
    return function(b){
      if(b)return sum(a+b);  //this returns a function sum(a+b) which closes over a = a+b
      return a;  //accumulated a+b so far 
    }

}

// console.log( sum(1)(2)(3)(4)());


//Difference between currying and Partial Application
 function currying(a){
    return function (b){
       return  function (c){
            return (a+b+c);
        }
    }
 }

console.log( currying(1)(2)(3));

function pApp(a){
    return function(b,c){
        return(a+b+c);
    }
}

console.log( pApp(1)(2,3)); //or var sum = pApp(1); 
                            //sum(2,3);


//Ques- Real world scenario of currying

function updateElementText(id){
   return function(text){
     document.querySelector("#"+ id).textContent = text;
   }
}

var headingText = updateElementText("heading");
headingText("Hello Aparna");

//this way we can use currying to reduce the repetition of full dom manupulation 
//now we simply wrote the function with id as parameter for once and then we can store the function returned from this 
//into a variable and we can call this textprovider function as many times as we want.



//Objects - 
//Ques- what will be the output

var fun = (function(a){
    delete a;
    return a;
})(5);

console.log(fun); //this will print 5 only as 'delete' can be used to delete the property of an object
//but can't be used to delete a local variable.

//How to add a dynamic property to an object

const property = "firstName";
const Name = "Apoorv";

const user = {
    name:"Aparna",
    age:25,
    [property]:name,

}

// console.log( user[property]);
// //or
// console.log(user["firstName"]);
// //or
// console.log(user.firstName);


//Hpw to loop through an object

for( key in user ){
    // console.log(key);
    // console.log(user[key]);
}

//Ques - give the output

const obj = {
    a:"first",
    b:"second",
    a:"third",
}
console.log(obj);

//a:"third"
//b:second
//the a will have the last assigned value in the same position.

//Ques - create a function multiplyByTwo(obj) which multiplies all the numeric properties of an object by 2.

const obj1= {
    a:100,
    b:200,
    title:"practise",
}

multiplyByTwo(obj1);

function multiplyByTwo(obj){
    for( key in obj){
        if( typeof obj[key] === "number"){
            obj[key] = obj[key]*2;
        }
    }
}

// console.log(obj1);

//Ques - what's the output of this

const a ={};
const b = {key:"b"};
const d ={key:"d"};

a[b] = 123;
a[d] = 456;

console.log(a[b]);
//output - 256 because b can't be assigned as key inside of a unless it is a string so inside of a it'll be assigned as 
//a["object object"] = 123 - first and then a["object object"] = 456
//so finally it prints 456

//Ques- Difference between JSON.stringify and JSON.parse-

console.log(obj1);
var strObj = JSON.stringify(obj1);
console.log(strObj);

var parObj = JSON.parse(strObj);
console.log(parObj);

//Real world use case of JSON.stringify()

localStorage.setItem("test", strObj);
// console.log("apd:",localStorage.getItem("test"));

// Ques - spread operation 

// console.log([..."Aparna"]); 
//outout - [
 //   "A",
 //   "p",
 //   "a",
 //   "r",
 //   "n",
 //   "a"
//]

//Ques - output of this - spread operator

const obj2 = {
    name:"Aparna",
    color: "white",
    lastName: "dwivedi",
};

const obj3 = {
    user:"Apoorv",
    ...obj2,
};

// console.log(obj3);

//Ques - predict the output

// console.log( JSON.stringify(obj2, ["name","lastName"])); //this will stringify only 2 mentioned properties of the obj3


//Ques - output

const test = {
    radius:2,
    diameter(){
        return this.radius*2;
    },
    perimeter:()=>{
       return 2*Math.PI*(this.radius);
    },
};

console.log(test.diameter());
console.log(test.perimeter());

//output - 4
// NaN //this is  because arrow functions can only access global variables via this keyword 


//Destructuring - 

const girl = {
    who:"appi",
    age:25,
    virtue : {
      day: "happy",
      night: "sad",
    },
};

const {who} = girl;
console.log(who);

//if want to change the property name while destructuring
const{who:Thegirl} = girl;
console.log(Thegirl);

//destructuring nested object
const{virtue:{day}} = girl;
console.log(day);


//object referencing ques-


// const girl = {
//     who:"appi",
//     age:25,
//     virtue : {
//       day: "happy",
//       night: "sad",
//     },
// };
let D;
D = girl;
 girl.who = "aparna";

 console.log(girl.who);
 console.log(D.who); //the expected output is appi but it's aparna
 //and thats because when we assigned the girl object to the variable D , only the reference to this object is being
 //assigned to this variable and not the actual object so whatever is being changed in the girl object the same has been changed
 //for the variable d as well.

 //Ques - 
 console.log({a:1} == {a:1});
 console.log({a:1} === {a:1});

 //output of both will be false as objects are only equal if their reference are equal. They are not not made equal by value.

 //Ques- predict the output

 let person = {name:"aparna"};
 let member  = [person];
 person = null;
 console.log(member);
 //o/p - [
//     {
//         "name": "aparna"
//     }
// ]
//thats because we made the whole person object as null which wont affect the memmber[0]
//if you want to make the person object as null, you need to make its propertied as null
//i.e. person.name = null //this will print console.log(member) as null.

//Ques-
const value = {number:10};
function Multiply(x = {...value}){
    return x.number*=2;
}

console.log(Multiply()); //o/p - 20 because here we used spread operator so the actual object is being assigned to x
console.log(Multiply(value)); //o/p - 20 here we didn't used spread operator so only reference to the object is being passed
console.log(Multiply(value)); //o/p- 40 //here we have modified the object.number and the reference it's taking is from the same object
//so this time x.number is changed to 20 and now 20*2 is returned and the output will be 40

//Ques-
const person1 = {
    name:"apd",
    age:25,
}
function modPer(person){
    person.name="appoo";
    person={
        name:"apd2",
        age:30,
    }
    return person;
}

// console.log(modPer(person1));
//output - {
//     "name": "apd2",
//     "age": 30
// }

//Ques - How to make the deep copy of an object

const object = {
    name: "poonam",
    age: "45",
    virtue:{
        day:"happy",
        night:"sad",
    },
}

// const objClone = Object.assign({}, object);  //first method
// const objClone =JSON.parse(JSON.stringify(object)); //second method
const objClone = {...object};
objClone.virtue.day = "afternoon";
// console.log(objClone);
// console.log(object);


//this keyword 
//this doesn't refer to ita parent function instead it refers to the object that calls that function.

function normal(){
    var name = "apd23";
    return  ()=>{
        // console.log(this.name);
    }
}

normal()(); //this won't print nothing because "name" is a local variable and hasn't been assigned to
//windows object


//for arrow function
const thisL = {
    name:"apd23",

    arrowThis : ()=>{
        // console.log(this.name);
    }
}
thisL.arrowThis(); //prints nothing because this refers to the window object where this arrow function is defined.

//for normal function

const thisLL = {
    name:"apd2306",
    normalThis : function(){
    //    console.log(this.name);
    }

}

thisLL.normalThis(); //this prints because its this refers to its caller.

//where arrow function prints - 

const arrowThis2 = {
    name: "apd2001",
    nestedThis(){
        const nestedArrow = () =>{
            // console.log( this.name ); //this will print the name as its this refers to the plae where it is defined i.e. inside 
            //of nestedThis so basically it takes its this from nestedArrow and nestedArrow has its this from arrowThis2 object i.e. its caller so this time nestedarrow can print name .
        }
        nestedArrow();
    }
}

arrowThis2.nestedThis();

//Ques - "this" keyword

const testObj = {
    name: "aparna",
    getUser(){
    //    console.log(this.name);
    }
}

setTimeout(testObj.getUser, 1000); //what is logged?
//it doesn't log anything because as soon as you put getuser method in the setTimeout it's no longer 
//a method of an object and it's a normal function whose caller is window object so it'll print nothing.

//Ques -  Fix this code

setTimeout(()=>{
    testObj.getUser();
},2000);

//create a calculator object such that - calculator.read() - willask user to give 2 numbers
//calculator.sum() - will add these 2 numbers
//calculator.multiply -  will multiply these 2 numbers

const calculator = {
    read(){
        this.a = +prompt("a : ", a);
        this.b = +prompt("b : ", b);
    },
    sum(){
         console.log( this.a + this.b );
        
    },
    multiply(){
        console.log( this.a * this.b );
    }
    
}

// calculator.read();
// calculator.sum();
// calculator.multiply();

//Ques - what's the output of this 

var length = 4;

function print(){
    console.log(this.length);
}

// const objApd = {
//     length: 5,
//     meth(fn){
//        fn();
//     }
// }

// objApd.meth(print); //what'll be the output

//the output will be 4 as this print function as a whole is passed to the meth method of the object
//so this time objApd should treat it like a method but since we are calling this fn() inside of the method so it will have 
//its identity attached to it and it will refer to the global scope which is length = 4
//this is same as setTimeout ques - there we were passing the method of the object as a whole to the setTimeout and setTimeout was treating it a normal function of its own but as soon as we created new callback funtion inside of the setTimeout and then we called this object method inside it it took its identity back, and this is exactly the case here also.

//Variant of the previous ques - 


const objApd = {
    length: 5,
    meth(){
       arguments[0](); //this will print 3 , as inside of array protoytpes there's one property as length and which will give 3  as length since arguments array has 3 length
    }
}
objApd.meth(print, 2, 3);