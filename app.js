const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const card = document.querySelector(".card");
const cardsArray = Array.from(document.querySelectorAll(".card"));
const gridContainer = document.querySelector('.grid-container');
let modal = document.getElementById('modal');
let employees = [];

// ////////////////////
// FETCH FUNCTIONS 
// ////////////////////



fetch(urlAPI)
.then(response => response.json())
.then(response => response.results)
.then(displayEmployees)
.catch(error => console.log(error));



// ////////////////////
// HELPER FUNCTIONS
// /////////////////////

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


//////////////////
// EVENT LISTENERS
//////////////////


gridContainer.addEventListener('click', () => {
    console.log('click')
    modal.style.display = 'block';
});



// I was told this didn't work because the promise from the fetch wasn't fulfilled by the time this function started, so there were no objects inside the employees array. When this was live, it would return employee[i] is undefined. 

// cardsArray.forEach(card => {
//     for(let i=0; i < employees.length; i++){
//         card.innerHTML += `<img src='${employees[i].picture.medium}'>`;
//         card.innerHTML += `<p>${employees[i]}</p>`;
//         card.innerHTML += `<p>${employees[i].location.city}</p>`;
//         card.innerHTML += `<p>${employees[i].email}</p>`;
//     }
// });