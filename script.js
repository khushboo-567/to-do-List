const input = document.querySelector('input');
const addButton = document.querySelector('button');
const listContainer = document.querySelector('#list-container');

/*
console.log(addButton);
console.log(input);
console.log(listContainer);
console.log(listItems); */

addButton.addEventListener("click" , ()=>{

    if(input.value.trim() !== "") {

        const listItem = document.createElement('li');
        listItem.textContent = input.value;
        
        const span = document.createElement('span');
        span.innerHTML = "\u00D7";
        span.className = "close";
        listItem.appendChild(span);

        listContainer.appendChild(listItem);
        saveTasks();
        updateTaskCounts();

        input.value = "";
    }   
})

listContainer.addEventListener("click", function(e){

    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveTasks();
        updateTaskCounts();
    }

    else if(e.target.tagName==="SPAN"){
        e.stopPropagation();
        e.target.parentElement.remove();
        saveTasks();
        updateTaskCounts();
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
    tasks=document.querySelectorAll("li");
    for (const task of tasks){
        task.classList.contains("checked")?task.style.display="none":task.style.display="block";
    }
}

function showCompleted(){
    tasks=document.querySelectorAll("li");
    for (const task of tasks){
        task.classList.contains("checked")?task.style.display="block":task.style.display="none";
    }
}

function showAll(){
    tasks=document.querySelectorAll("li");
    for (const task of tasks){
        task.style.display="block";
    }
}

showTasks();
updateTaskCounts();