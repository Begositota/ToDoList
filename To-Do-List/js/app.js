// select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
//let input= document.querySelector('input')

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//variables first used ones
// let LIST = []
//     , id=0;

//variables
let LIST, id;


//get item from local storage
let data = localStorage.getItem("TODO");

//check if data isn't empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;// set the id to the last one in the list
    loadList(LIST); //loads the list tho the user interface
} else {
    //if data is not empty
    LIST = [];
    id = 0;

}
//load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });

}

//clear local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})




//get item to local storage (the below code must be added every where  the LIST array is update our code )
//localStorage.setItem("TODO", JSON.stringify(LIST))

//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
//console.log(today);
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash) {
   
    //prevents the below code from execution if its in trash
    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
        <i class="fa ${DONE} co " job="complete" id="${id}"></i>
        <p class="text" ${LINE}>${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

    
}

//addToDo ("drink coffee") ;
//add an item to the user when press the enter key

document.addEventListener( "keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        //if the input isn't empty
        if (toDo) {
            addToDo(toDo , id , false ,false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //get item to local storage (the below code must be added every where  the LIST array is update our code )
            localStorage.setItem("TODO", JSON.stringify(LIST))

            id++;
        } 
      //to clear the input value after adding an item use (input.value="") 
        input.value=" "

       
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
    
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; //returns the clicked element inside list
    const elementJob = element.attributes.job.value;// complete or delete the list
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    //get item to local storage (the below code must be added every where  the LIST array is update our code )
    localStorage.setItem("TODO", JSON.stringify(LIST))

});