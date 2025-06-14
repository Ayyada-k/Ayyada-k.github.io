const pets = [
    {
        "name": "Buddy",
        "type": "Dog",
        "age": 3,
        "img": "img/dogs/dog01.jpg"
    },
    {
        "name": "Mumu",
        "type": "Dog",
        "age": 3,
        "img": "img/dogs/dog02.jpg"
    },
    { "name": "Amber", "type": "Dog", "age": 2, "img": "img/dogs/dog03.jpg" },
    { "name": "Whiskers", "type": "Cat", "age": 2, "img": "img/cats/cat01.jpg" },
    { "name": "Mittens", "type": "Cat", "age": 2, "img": "img/cats/cat02.jpg" },
    { "name": "Tuna", "type": "Cat", "age": 1, "img": "img/cats/cat03.jpg" },
    { "name": "Lemon", "type": "Bird", "age": 1, "img": "img/birds/bird01.jpg" },
    { "name": "Blue", "type": "Bird", "age": 2, "img": "img/birds/bird02.jpg" },
    { "name": "Booboo", "type": "Capybara", "age": 2, "img": "img/capybaras/capybara01.jpg" },
    { "name": "Bobo", "type": "Capybara", "age": 3, "img": "img/capybaras/capybara02.jpg" }

]

for(let i = 0; i < pets.length; i++) {
    const pet = pets[i];
    const petDiv = document.getElementById('pet-list').appendChild(document.createElement('div'));
    petDiv.className = 'pet';
    petDiv.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}">
        <h3>${pet.name}</h3>
        <p>Type: ${pet.type}</p>
        <p>Age: ${pet.age} years</p>
        <button onclick="adoptPet()">Adopt Now</button>
    `;
    document.getElementById('pet-list').appendChild(petDiv);
}
// function loadPets() { 

//     console.log('Loading pets...'); 
  
//     const petList = document.getElementById('pet-list'); 
  
//     pets.forEach(pet => { 
  
//       const petItem = document.createElement('div'); 
  
//       petItem.className = 'pet'; 
  
//       petItem.innerHTML = ` 
  
//         <img src="${pet.img}" alt="${pet.name}"> 
  
//         <h3>${pet.name}</h3> 
  
//         <p>Type: ${pet.type}</p> 
  
//         <p>Age: ${pet.age} years</p> 
  
//         <button onclick="adoptPet()">Adopt Now</button> 
  
//     `; 
  
//       petList.appendChild(petItem); 
  
//     }); 
  
//   } 
  
//   document.addEventListener('DOMContentLoaded', loadPets); 
  
console.log('Pets loaded successfully.'); 