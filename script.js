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

        span.addEventListener("click", (e) => {
            e.stopPropagation();
            listContainer.removeChild(listItem);
        });

        listItem.addEventListener("click", (e) => {
            listItem.classList.toggle("checked");
        });

        input.value = "";
    }   
})


