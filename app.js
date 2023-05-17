const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
// let allCards = document.querySelectorAll(".card");
// let cardsArray = Array.from(allCards);
const gridContainer = document.querySelector('.grid-container');
let modal = document.getElementById('modal');
let closeBtn = document.querySelector('.close-btn');
let employees = [];

// ////////////////////
// FETCH FUNCTIONS 
// ////////////////////



fetch(urlAPI)
.then(response => response.json())
.then(response => response.results)
.then(displayEmployees)
.then(createCardsArray)
.catch(error => console.log(error));



// ////////////////////
// HELPER FUNCTIONS
// /////////////////////

function createCardsArray() {
    let allCards = document.querySelectorAll(".card");
    let cardsArray = Array.from(allCards);

    cardsArray.forEach((card) => {
        card.addEventListener('click', () => {
            modal.style.display = 'block';
        })
    })
}



function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
        </div>
        `
    });
gridContainer.innerHTML += employeeHTML;
}


//////////////////////
// EVENT LISTENERS
//////////////////////


closeBtn.addEventListener('click', () => modal.style.display = 'none');




//////////////////////
// Old code I'm keeping for now
//////////////////////

// I was told this didn't work because the promise from the fetch wasn't fulfilled by the time this function started, so there were no objects inside the employees array. When this was live, it would return employee[i] is undefined. 

// cardsArray.forEach(card => {
//     for(let i=0; i < employees.length; i++){
//         card.innerHTML += `<img src='${employees[i].picture.medium}'>`;
//         card.innerHTML += `<p>${employees[i]}</p>`;
//         card.innerHTML += `<p>${employees[i].location.city}</p>`;
//         card.innerHTML += `<p>${employees[i].email}</p>`;
//     }
// });