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

 //Basic fetch request // to request 12 users add ?results=12
fetch(url)
.then(response => response.json())
.then(data => employees.push(...data.results))

console.log(employees);

// ////////////////////
// HELPER FUNCTIONS
// /////////////////////

function generateImage(data){
    const employeeCardPicture = `<img src="${data}" alt>`;
    cardsArray.forEach(card => {
        card.innerHTML += employeeCardPicture;
    })
}

cardsArray.map(card => {

})






// cards.forEach(card => {
// card.innerHTML = `<img src="${employee.picture.medium}"/><h2>${employee.name}</h2><p>${employee.email}</p><p>${employee.city}</p>`
// });