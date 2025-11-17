const div = document.querySelector(".div");
const form = document.querySelector(".form");
const button = document.querySelector(".button");

div.addEventListener("click", fn1, {capture:true} );
form.addEventListener("click", fn1, {capture:true} );
button.addEventListener("click", fn1,  {capture:true});

function fn1(event){
    alert("event.current.target: " + event.currentTarget.tagName + " event.target: " + event.target.tagName + " this.tagName : " + this.tagName);
}

// function fn(event){
//     alert("event.current.target: " + event.currentTarget.tagName + " event.target: " + event.target.tagName + " this.tagName : " + this.tagName);
// }

//If we want to stop the propogation and just want to render the tagName that is being clicked
//then we simply gonna use e.stopPropagation();e = event in the callback function itself.

//Event Delegation - 
//provide event listener to only parent div and not to the individual descendents-

const parent = document.querySelector(".parent");

parent.addEventListener("click", (event)=>{
    console.log( event.target.closest("SPAN"));
    if( event.target.tagName === "SPAN"){
        window.location.href = window.location.href + "/" + event.target.className;
    }
});