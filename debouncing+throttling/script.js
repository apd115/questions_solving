let btn = document.querySelector(".button");
let debounceCount = document.querySelector(".debounceCount");
let normalCount = document.querySelector(".normalCount");

let normal_press = 0;
let debounce_press = 0;

let debounce = myDebounce(300);
let timer;
function myDebounce(d, ...args) {
   
   return function (...args){
    if(timer) clearInterval(timer);
     timer =  setTimeout(()=>{
        debounceCount.innerHTML = ++debounce_press;
      },d);
   }
}


btn.addEventListener("click",()=>{
    normalCount.innerHTML = ++normal_press;
    debounce(); 
    // throttling();
});

// const throttling = _.throttling(()=>{
//     debounceCount.innerHTML = ++debounce_press;
// }, 500);