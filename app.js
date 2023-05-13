class Employee {
    constructor(image, name, email, city) {
        this.name = name;
        this.email = email;
        this.city = city;
        this.image = image;
    }
}

const cards = document.querySelectorAll(".card");

 //Basic fetch request // to request 12 users add ?results=12
fetch('https://randomuser.me/api/?exc=login')
.then(response => response.json())
.then(data => console.log(data))


cards.forEach(card => {
card.innerHTML = `<img src="${employee.picture.medium}"/><h2>${employee.name}</h2><p>${employee.email}</p><p>${employee.city}</p>`
});