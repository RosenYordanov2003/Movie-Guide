const searchButtonElement = document.querySelector('.search-btn');
const inputElement = document.querySelector('.search-container input')
const key = "5db0b93d";
const sectionContainer = document.querySelector('.movies')
searchButtonElement.addEventListener('click', loadMovies);

function loadMovies(){
    let baseURL =  `http://www.omdbapi.com/?s=${inputElement.value}&apikey=${key}`;
    sectionContainer.innerHTML = '';
    fetch(baseURL)
    .then((res)=>res.json())
    .then((data)=>data.Search.forEach(element => {
     let moviePrice = Math.floor(Math.random() * 10) + 1
     let articleContainer = createHTMLElement('article','','movie-card','',sectionContainer);
     let imgContainer = createHTMLElement('div','','img-container','' ,articleContainer);
     createHTMLElement('img','','movie-img',{src:element.Poster},imgContainer);
     const infoContainer = createHTMLElement('div','','movie-info','',articleContainer);
     createHTMLElement('p',element.Title,'movie-title','',infoContainer);
     createHTMLElement('p',element.Year,'movie-year','',infoContainer);
     createHTMLElement('p',` Price: $${(moviePrice * 2.20).toFixed(2)}`,'movie-price','',infoContainer);
     const btnContainer = createHTMLElement('div','','btn-container','',infoContainer);
     let cartButton =  createHTMLElement('button','add to cart','cart-btn','',btnContainer);
     cartButton.innerHTML += '<i class="fas fa-shopping-cart"></i>';
     let favoriteBtn = createHTMLElement('button','add favorite','favorite-btn','',btnContainer);
     favoriteBtn.innerHTML += '<i class="fas fa-heart"></i>';
     articleContainer.addEventListener('mouseover',()=>{
      articleContainer.classList.add('movie-hover');
      imgContainer.classList.add('img-hover');
     });
     articleContainer.addEventListener('mouseout',()=>{
      articleContainer.classList.remove('movie-hover');
      imgContainer.classList.remove('img-hover');
     });

     inputElement.value = '';
    }))
    .catch((error)=>console.error(error));
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
