let globalArray = [];

let counter = 0;
const searchButtonElement = document.querySelector('.search-btn');
const inputElement = document.querySelector('.search-container input')
const key = "5db0b93d";
const sectionContainer = document.querySelector('.movies')
searchButtonElement.addEventListener('click', loadMovies);

let object = JSON.parse(localStorage.getItem('count'));

if(object.notificationCount!==0){
  document.querySelector('.notification').style.display = 'block';
}
else{
  document.querySelector('.notification').style.display = 'none';
}
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
     let imgDescription =  createHTMLElement('p','Get Now','img-description','',imgContainer);
     const infoContainer = createHTMLElement('div','','movie-info','',articleContainer);
     createHTMLElement('p',element.Title,'movie-title','',infoContainer);
     createHTMLElement('p',element.Year,'movie-year','',infoContainer);
     createHTMLElement('p',` Price: $${(moviePrice * 2.20).toFixed(2)}`,'movie-price','',infoContainer);
     const btnContainer = createHTMLElement('div','','btn-container','',infoContainer);
     let cartButton =  createHTMLElement('button','add to cart','cart-btn','',btnContainer);
     cartButton.addEventListener('click',addProduct);
     cartButton.innerHTML += '<i class="fas fa-shopping-cart"></i>';
     let favoriteBtn = createHTMLElement('button','add favorite','favorite-btn','',btnContainer);
     favoriteBtn.addEventListener('click',addToFavorite);
     favoriteBtn.innerHTML += '<i class="fas fa-heart"></i>';

     articleContainer.addEventListener('mouseover',()=>{
      articleContainer.classList.add('movie-hover');
      imgDescription.style.opacity = 1;
      imgDescription.style.transform = 'translateY(0)';
     });
     articleContainer.addEventListener('mouseout',()=>{
      articleContainer.classList.remove('movie-hover');
      imgDescription.style.opacity = 0;
     });
     inputElement.value = '';
    }))
    .catch((error)=>console.error(error));
}

function addProduct(event){
   
   let spanNotification = document.querySelector('.notification');
   spanNotification.style.display = 'block'
   localStorage.setItem('count',JSON.stringify({notificationCount:counter}));
   const movieTitle = event.target.parentElement.parentElement.children[0].textContent;
   const moviePrice = event.target.parentElement.parentElement.children[2].textContent;
   const url = event.target.parentElement.parentElement.parentElement.children[0].children[0].src;
   const year = event.target.parentElement.parentElement.children[1].textContent;
   let currentObject = {
   name:movieTitle,
   year:year,
   price:moviePrice,
   url:url
  };
  
  let array = JSON.parse(localStorage.getItem('globalArray')) || [];
  if(!array.find((movie) => movie.name === currentObject.name)){
    spanNotification.textContent = `+${++counter}`;
    array.push(currentObject);
   }
  localStorage.setItem('globalArray', JSON.stringify(array));
  
}

function addToFavorite(event){
  const movieTitle = event.target.parentElement.parentElement.children[0].textContent;
  const moviePrice = event.target.parentElement.parentElement.children[2].textContent;
  const url = event.target.parentElement.parentElement.parentElement.children[0].children[0].src;
  const year = event.target.parentElement.parentElement.children[1].textContent;

  let currentObject = {
    name:movieTitle,
    year:year,
    price:moviePrice,
    url:url
   };

   let array = JSON.parse(localStorage.getItem('favorite-movies')) || [];
   if(!array.find((movie) => movie.name === currentObject.name)){
    array.push(currentObject);
   }
   localStorage.setItem('favorite-movies',JSON.stringify(array));
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
