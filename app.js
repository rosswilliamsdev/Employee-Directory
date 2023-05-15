class Employee {
    constructor(image, name, email, city) {
        this.name = name;
        this.email = email;
        this.city = city;
        this.image = image;
    }
}
const url = 'https://randomuser.me/api/?results=12'
const card = document.querySelector(".card");
const cardsArray = Array.from(document.querySelectorAll(".card"));
let employees = [];

// ////////////////////
// FETCH FUNCTIONS 
// ////////////////////

fetch(url)
.then(response => response.json())
.then(data => employees.push(...data.results))

console.log(employees[0].picture.medium)

// Something I'm working on to add object properties to the cards
cardsArray.forEach(card => {
    for(let i=0; i < employees.length; i++){
        card.innerHTML += `<img src='${employees[i].picture.medium}'>`;
        card.innerHTML += `<p>${employees[i]}</p>`;
        card.innerHTML += `<p>${employees[i].location.city}</p>`;
        card.innerHTML += `<p>${employees[i].email}</p>`;
    }
});


// ////////////////////
// HELPER FUNCTIONS
// /////////////////////

function generateImage(data){
    const employeeCardPicture = `<img src="${data}" alt>`;
    cardsArray.forEach(card => {
        card.innerHTML += employeeCardPicture;
    })
}








// cards.forEach(card => {
// card.innerHTML = `<img src="${employee.picture.medium}"/><h2>${employee.name}</h2><p>${employee.email}</p><p>${employee.city}</p>`
// });