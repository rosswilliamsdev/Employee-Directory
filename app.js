const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
let modalContainer = document.getElementById('modal');
let modalContent = document.querySelector('.modal-content')
let closeBtn = document.querySelector('.close-btn');
let employees = [];
let previousArrow = document.querySelector('.previous');
let nextArrow = document.querySelector('.next');


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
    let date = new Date(dob.date);

    let modalHTML = `
    <span class="close-btn">&times;</span>
    <img class="avatar" src="${picture.large}" />
    <button class='previous arrow'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293"/>
</svg>
    </button>
    <button class='next arrow'>
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
}

function closeModal() {
    modalContainer.style.display = "none";
}

//////////////////////
// EVENT LISTENERS
//////////////////////

document.addEventListener("click", (e) => {
    if (
      e.target.matches(".close-btn")
    ) {
      closeModal()
    }
  }, false)

previousArrow.addEventListener('click', () => {
    if(employees[index] === 0) {
        createModal(11);
    } else {
        createModal(index - 1)
    }
})

nextArrow.addEventListener('click', () => {
    if(employees[index] === 11) {
        createModal(0);
    } else {
        createModal(index + 1)
    }
})