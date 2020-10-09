const api_url = "http://swapi.dev/api/people/?page=";
let page = 1;
let characterData = [];
let allCharactersArray;

const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
var list = document.createElement("ul");

var characters = document.querySelector("#characters");
characters.appendChild(list);

async function getData() {
  do {
    const response = await fetch(api_url + page);
    const data = await response.json();
    console.log(data.results);
    page++;
    characterData.push(data.results);
    allCharactersArray = [].concat.apply([], characterData);
  } while (page <= 8);
  console.log(allCharactersArray);

  for (let i = 0; i < allCharactersArray.length; i++) {
    var li = document.createElement("li");
    li.textContent = allCharactersArray[i].name;
    list.appendChild(li);

    console.log(allCharactersArray[i].name);
  }
}

getData();

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

function searchCharacter(searchTerm) {
  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let array = [];
      for (var i = 0; i < data.results.length; i++) {
        array.push(data.results[i].name);
      }
      console.log(array);
      list.innerHTML = "";
      array.forEach(function (name) {
        var li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
      });
    });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  if (searchTerm == "") {
    showMessage("Please add a search term", "alert-danger");
  }
  searchInput.value = "";
  searchCharacter(searchTerm).then((results) => {
    console.log(results);
  });
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;
  if (searchTerm == "") {
    showMessage("Please add a search term", "alert-danger");
  }
  searchInput.value = "";

  searchCharacter(searchTerm).then((results) => {
    console.log(results);
  });
});

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
