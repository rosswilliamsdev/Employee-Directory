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

// Convert this to async/await with helper functions

fetch(urlAPI)
.then(response => response.json())
.then(response => response.results)
.then(displayEmployees)
.then(createCardsArray)
.catch(error => console.log(error));


const fetchData = async (url) => {
    const response = await fetch(url);

// const data = await response.json()
// const res = data.results

    const {results } = await response.json();

    
    console.log(results)
    // console.log(res)
    
}

fetchData(urlAPI);
// ////////////////////
// HELPER FUNCTIONS
// /////////////////////

function createCardsArray() {
    let allCards = document.querySelectorAll(".card");
    let cardsArray = Array.from(allCards);
    cardsArray.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            createModal(index)
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

function createModal(index) {
    let { name, dob, phone, email, location, picture } = employees[index];
    // let { name, dob, phone, email, location: 
    //     { city, street, state, postcode}, picture } = await employees[index];
    let date = new Date(dob.date);
    console.log(employees[index])
    console.log(location)
    let modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
        <h2 class='name'>${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class='address'>${location.city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${location.street.number} ${location.street.name}, ${location.state} ${location.postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    modalContent.innerHTML = modalHTML;

    modalContainer.style.display = 'block';
}

function closeModal() {
    modalContainer.style.display = "none";
}

//////////////////////
// EVENT LISTENERS
//////////////////////


// got this from https://tinyurl.com/5b6by8vs
document.addEventListener("click", (e) => {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
      e.target.matches(".close-btn") ||
      !e.target.closest(".modal")
    ) {
      closeModal()
    }
  },
  false
)