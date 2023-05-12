class Employee {
    constructor(image, name, email, city) {
        this.name = name;
        this.email = email;
        this.city = city;
        this.image = image;
    }
}

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
card.innerHTML = `<img src="${employee.image}"/><h2>${employee.name}</h2><p>${employee.email}</p><p>${employee.city}</p>`
});