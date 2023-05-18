const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
// let allCards = document.querySelectorAll(".card");
// let cardsArray = Array.from(allCards);
const gridContainer = document.querySelector('.grid-container');
let modalContainer = document.getElementById('modal');
let modalContent = document.querySelector('.modal-content')
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
.then(createModal)
.catch(error => console.log(error));



// ////////////////////
// HELPER FUNCTIONS
// /////////////////////

function createCardsArray() {
    let allCards = document.querySelectorAll(".card");
    let cardsArray = Array.from(allCards);
    let modalHTML = '';

    cardsArray.forEach((card) => {
        card.addEventListener('click', createModal)
    })
}

function createModal(index) {
    let { name, dob, phone, email, location: 
        { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
        <h2 class='name'>${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class='address'>${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;;
    modalContent.innerHTML = modalHTML;

    console.log('click');
    modalContainer.style.display = 'block';
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


closeBtn.addEventListener('click', () => modalContainer.style.display = 'none');




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