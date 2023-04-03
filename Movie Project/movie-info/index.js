const inputElement = document.getElementById("search");
const buttonElement = document.getElementById("search-button");
const sectionElement = document.getElementById("movie-section");
const container = document.querySelector('.container');
buttonElement.addEventListener("click", loadMovie);
const key = "5db0b93d";

async function loadMovie() {
  reset();
  let movieName = inputElement.value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  if(sectionElement.childElementCount> 0){
    sectionElement.children[0].remove();
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    inputElement.value = "";
    if (data.Error === "Movie not found!") {
      throw new Error();
    }
  
    createMovieCard(data);
  } catch (error) {
    console.error(error);
    createHTMLElement(
      "p",
      "Please enter existing movie",
      "error-message",
      '',
      sectionElement
    );
  }
}
function createMovieCard(object){
 const articleContainer = createHTMLElement('article','','article-container','',sectionElement);
 const movieImgContainer = createHTMLElement('section','', 'movie-img-container','',articleContainer);
 createHTMLElement('img','', 'movie-img', {src:object.Poster}, movieImgContainer);
 const movieRatingsContainer = createHTMLElement('section','','movie-ratings','',articleContainer);
 createHTMLElement('h3',object.Title,'movie-title','',movieRatingsContainer);
 const paragraphElement =  createHTMLElement('p',object.imdbRating,'rating','',movieRatingsContainer);
 paragraphElement.innerHTML += '<i class="fa-solid fa-star"></i>';
 const ulElement = createHTMLElement('ul','','about','',movieRatingsContainer);
 createHTMLElement('li',object.Rated,'','',ulElement);
 createHTMLElement('li',object.Language,'','',ulElement);
 createHTMLElement('li',object.Released,'','',ulElement);
 const ulGenre = createHTMLElement('ul','','genres','',movieRatingsContainer);
 object.Genre.split(', ').forEach(genre => {
  createHTMLElement('li',genre,'','',ulGenre);
 });
 
 const plotSection = createHTMLElement('section','','plot','',container);
 createHTMLElement('p','Plot:','plot-title','',plotSection);
 createHTMLElement('p',object.Plot,'plot-content','',plotSection);
 const actorsSection = createHTMLElement('section','','actors-section','',container);
 createHTMLElement('p','Actors:','actors-title','',actorsSection);
 createHTMLElement('p',object.Actors,'actors','',actorsSection);
}

function reset(){
  const plotElement = document.querySelector('.plot');
  const actorsElement = document.querySelector('.actors-section');
  if(plotElement){
   plotElement.remove();
  }
  if(actorsElement){
    actorsElement.remove();
  }
}

function createHTMLElement(typeOfElement, content, className, attributes, parentElement) {
  const element = document.createElement(typeOfElement);
  if (content) {
    element.textContent = content;
  }
  if (className) {
    element.classList.add(className);
  }
  if(attributes){
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  if (parentElement) {
    parentElement.appendChild(element);
  }
  return element;
}
