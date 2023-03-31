const searchButtonElement = document.querySelector('.search-btn');
const inputElement = document.querySelector('.search-container input')
const key = "5db0b93d";
const sectionContainer = document.querySelector('.movies')
searchButtonElement.addEventListener('click', loadMovies);
console.log(sectionContainer);

function loadMovies(){
    const baseURL =  `http://www.omdbapi.com/?s=${inputElement.value}&apikey=${key}`;
    fetch(baseURL)
    .then((res)=>res.json())
    .then((data)=>data.Search.forEach(element => {
     
     let articleElement = createHTMLElement('article','','movie-card','',sectionContainer);
     let imgContainer = createHTMLElement('div','','img-container','' ,articleElement);
     createHTMLElement('img','','movie-img',{src:element.Poster},imgContainer);
     const infoContainer = createHTMLElement('div','','movie-info','',articleElement);
     createHTMLElement('p',element.Title,'movie-title','',infoContainer);
     createHTMLElement('p',element.Year,'movie-year','',infoContainer);
     createHTMLElement('p',` Price: $${Math.floor(Math.random() * 20)}`,'movie-price','',infoContainer);
     const btnContainer = createHTMLElement('div','','btn-container','',infoContainer);
     let cartButton =  createHTMLElement('button','add to cart','cart-btn','',btnContainer);
     cartButton.innerHTML += '<i class="fas fa-shopping-cart"></i>';
     let favoriteBtn = createHTMLElement('button','add favorite','favorite-btn','',btnContainer);
     favoriteBtn.innerHTML += '<i class="fas fa-heart"></i>';
    }));
}
function createHTMLElement(typeOfElement, content, className, attributes , parent ){
  const element = document.createElement(typeOfElement);
  if(content){
    element.textContent = content
  }
  if(className){
    element.classList.add(className)
  }
  if(parent){
    parent.appendChild(element);
  }
  if(attributes){
    for (const key in attributes) {
      element.setAttribute(key,attributes[key]);
    }
  }
  return element;
}