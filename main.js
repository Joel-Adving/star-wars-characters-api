const api_url = "http://swapi.dev/api/people/?page=";
const searchForm = document.getElementById("search-form");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const logo = document.getElementById("logo");
const list = document.createElement("ul");
const infoList = document.createElement("p");
const characters = document.querySelector("#characters");
let page = 1;
let characterData = [];
let allCharactersArray;

characters.appendChild(list);
list.appendChild(infoList);

async function fetchCharacters() {
  do {
    const response = await fetch(api_url + page);
    const data = await response.json();
    // console.log(data.results);
    page++;
    characterData.push(data.results);
    allCharactersArray = [].concat.apply([], characterData);
  } while (page <= 8);
  // console.log(allCharactersArray);

  for (let i = 0; i < allCharactersArray.length; i++) {
    let li = document.createElement("li");
    li.classList.add("name");
    let moreInfo =  document.createElement("p");
    moreInfo.classList.add("more-info");

    li.textContent = allCharactersArray[i].name;
    list.appendChild(li);

    moreInfo.textContent =   "height: " + allCharactersArray[i].height + " cm, sex: "  + allCharactersArray[i].gender;
    li.appendChild(moreInfo)
  }
}
fetchCharacters();

function searchCharacter(searchTerm) {
  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results)
      let array = [];
      for (var i = 0; i < data.results.length; i++) {
        array.push(data.results[i].name);
      }
      console.log(array);
      list.innerHTML = "";
      array.forEach(function (name) {

        let li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
        
      });
    });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  searchInput.value = "";
  if (searchTerm == "") {;
    return false;
} else {
  searchCharacter(searchTerm)
}
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  searchInput.value = "";
  if (searchTerm == "") {;
    return false;
} else {
  searchCharacter(searchTerm)
}
});

const li = document.querySelectorAll("li")

list.addEventListener("click", function() {

  var x = document.getElementsByClassName('more-info');

  for (var i=0;i<x.length;i+=1){
	  if(x[i].style.display === 'none'){
      x[i].style.display = 'block';
	        }
	         else {
	        x[i].style.display = 'none';
	    }
	}
});

logo.addEventListener("click", function(){
  location.reload();
});


