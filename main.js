//////////////////////////////////////////////////////////
//                Star Wars characters                 //
////////////////////////////////////////////////////////

const STARWARS_API = "http://swapi.dev/api/people/?page=";
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


//Fetch character data from api, then createing dom elements 
async function fetchCharacters() {
  do {
    const response = await fetch(STARWARS_API + page);
    const data = await response.json();
    console.log(data.results);
    page++;
    characterData.push(data.results);
    allCharactersArray = [].concat.apply([], characterData);
  } while (page <= 8);
  console.log(allCharactersArray);

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


//Search for specific star wars characters
function searchCharacter(searchTerm) {
  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results)
      let array = [];

      for (let i = 0; i < data.results.length; i++) {
        array.push(data.results[i]);
      }
      console.log(array);
      list.innerHTML = "";

      for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        li.classList.add("name");
        let moreInfo =  document.createElement("p");
        moreInfo.classList.add("more-info");
        li.textContent = array[i].name;
        list.appendChild(li);
        moreInfo.textContent =   "height: " + array[i].height + " cm, sex: "  + array[i].gender;
        li.appendChild(moreInfo)
      }
    });
}


// Search input, button and header eventlisteners
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

list.addEventListener("click", function() {
  let x = document.getElementsByClassName('more-info');
  for (let i=0;i<x.length;i+=1){
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


