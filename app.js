const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
let modalContainer = document.getElementById('modal');
let modalContent = document.querySelector('.modal-content')
let closeBtn = document.querySelector('.close-btn');
let searchBar = document.querySelector('.searchbar');
let employees = [];



// ////////////////////
// FETCH 
// ////////////////////

fetch(urlAPI)
.then(response => response.json())
.then(response => response.results)
.then(displayEmployees)
.then(modalListeners)
.then(search)
.catch(error => console.log(error));

// ////////////////////
// FUNCTIONS
// /////////////////////


// Creates cards from the employees array
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

// Adds click event listeners to the cards to create modals
function modalListeners() {
    let allCards = document.querySelectorAll(".card");
    let cardsArray = Array.from(allCards);
    cardsArray.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            createModal(index)
        })
    })
}

// Creates modals from the card clicked
// Adds event listeners to next/previous arrows so you can cycle through the modals
function createModal(index) {
    let { name, dob, phone, email, location, picture } = employees[index];
    let date = new Date(dob.date);

    let modalHTML = `
    <span class="close-btn">&times;</span>
    <img class="avatar" src="${picture.large}" />
    <button class='previous'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293"/>
</svg>
    </button>
    <button class='next'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
</svg>
    </button>
    <div class="modal-text-container">
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

    let previousArrow = document.querySelector('.previous');
    let nextArrow = document.querySelector('.next');

    previousArrow.addEventListener('click', () => {
        if(index == 0) {
            createModal(11);
        } else {
            createModal(index - 1);
        }
})

    nextArrow.addEventListener('click', () => {
        if(index == 11) {
            createModal(0);
        } else {
            createModal(index + 1)
        }
    })
}

function closeModal() {
    modalContainer.style.display = "none";
}

//////////////////////
// EVENT LISTENERS
//////////////////////

// When the little x in upper right corner is clicked it closes the modal window
document.addEventListener("click", (e) => {
    if (
      e.target.matches(".close-btn")) {
      closeModal()
    }
  }, false)

// Employee cards should appear/disappear based on searchbar input
function search() {
    searchBar.addEventListener('keyup', (e) => {
        let currentValue = e.target.value.toLowerCase();
        let allCards = document.querySelectorAll(".card");
        let cardsArray = Array.from(allCards);

        console.log(currentValue);

        cardsArray.forEach(card => {
                if (card.innerText.includes(currentValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            })
    })     
}