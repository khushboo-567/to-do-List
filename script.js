const input = document.querySelector('input');
const addButton = document.querySelector('.add-button');
const listContainer = document.querySelector('#list-container');
let currentFilter = "all"; // Initialize the current filter to "all"

/*
console.log(addButton);
console.log(input);
console.log(listContainer);
console.log(listItems); */

addButton.addEventListener("click" , ()=>{

    if(input.value.trim() !== "") {

        const listItem = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.className = "taskText";
        taskText.innerHTML = input.value;

        const span = document.createElement('span');
        span.innerHTML = "\u00D7";
        span.className = "close";
    
        const button = document.createElement("button");
        button.innerHTML = 'Edit';
        button.className = "edit";

        listItem.appendChild(taskText);
        listItem.appendChild(button);
        listItem.appendChild(span);

        listContainer.appendChild(listItem);
        saveTasks();
        updateTaskCounts();

        if (currentFilter === "completed") {
             showCompleted();
            } else if (currentFilter === "remaining") {
                showRemaining();
            } else {
                showAll();
            }


        input.value = "";
    }   
})

listContainer.addEventListener("click", function(e){

    if(e.target.tagName==="LI" || e.target.classList.contains("taskText")){

        const listItem = e.target.closest("li");

        listItem.classList.toggle("checked");
        
        saveTasks();
        updateTaskCounts();
    }

    
    

    else if(e.target.classList.contains("close")){
        e.stopPropagation();
        e.target.parentElement.remove();
        saveTasks();
        updateTaskCounts();
    }
    
    else if (e.target.classList.contains("edit")) {

    e.stopPropagation();

    const item = e.target.closest("li");
    const taskText = item.querySelector(".taskText");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.textContent;

    item.replaceChild(editInput, taskText);

    editInput.focus();

    function saveEdit() {
        taskText.innerText = editInput.value.trim() || taskText.innerText;
        item.replaceChild(taskText, editInput);
        saveTasks();
    }

    editInput.addEventListener("keydown", function(e){

        if(e.key === "Enter"){
            saveEdit();
        }

    });

    editInput.addEventListener("blur", saveEdit);

}

});

function saveTasks(){
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks(){
    listContainer.innerHTML = localStorage.getItem("tasks");
}

const totalTasks = document.getElementById("total-count");
const completedTasks = document.getElementById("completed-count");
const remainingTasks = document.getElementById("remaining-count");

function updateTaskCounts(){
    const Total = listContainer.querySelectorAll("li").length;
    totalTasks.textContent = `Total: ${Total}`;

    const Completed = listContainer.querySelectorAll("li.checked").length;
    completedTasks.textContent = `Completed: ${Completed}` ;

    const Remaining = Total - Completed;
    remainingTasks.textContent = `Remaining: ${Remaining}`;
}

totalCount = document.getElementById("total-count");
completedCount = document.getElementById("completed-count");
remainingCount = document.getElementById("remaining-count");

totalCount.addEventListener("click", showAll); 
completedCount.addEventListener("click", showCompleted);
remainingCount.addEventListener("click", showRemaining);

function showRemaining(){

    currentFilter = "remaining";

    tasks=document.querySelectorAll("li");
    for (const task of tasks){
        task.classList.contains("checked")?task.style.display="none":task.style.display="flex";
    }
}

function showCompleted(){

    currentFilter = "completed";

    tasks=document.querySelectorAll("li");
    for (const task of tasks){
        task.classList.contains("checked")?task.style.display="flex":task.style.display="none";
    }
}

function showAll(){

    currentFilter = "all";

    tasks=document.querySelectorAll("li");
    for (const task of tasks){
        task.style.display="flex";
    }
}

showTasks();
updateTaskCounts();



/*adding Edit Button functionality

editButton= document.querySelector(".edit");


editButton.addEventListener("click",()=>{
    let taskText = document.querySelector(".taskText");
    let item = taskText.closest("li");

    let editInput = document.createElement("input");
    editInput.type="text";
    editInput.value=taskText.textContent;

    item.replaceChild(editInput, taskText);

    editInput.focus();

    editInput.addEventListener("keydown", (e) => {

        console.log(e.key);
    if (e.key === "Enter") {

        taskText.innerText = editInput.value.trim() || taskText.innerText;

        item.replaceChild(taskText, editInput);
    }
});

})*/