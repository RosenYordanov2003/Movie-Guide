let movies =  JSON.parse(localStorage.getItem('globalArray'));
let moviesArray = [];
let counter = JSON.parse(localStorage.getItem('count'));
counter = 0;
localStorage.setItem('count',JSON.stringify({notificationCount:counter}));
if(movies.length===0){
    document.querySelector('.order-info').style.display ='none';
}
const moviesSectionElement = document.querySelector('.added-movies');
const orderMoviesUl = document.querySelector('.bought-movies');
const totalPriceParagraphElement = document.querySelector('.total-price');
const buyButton = document.querySelector('.buy-button');

buyButton.addEventListener('click',()=>{
  if(price===0){
    return;
  }
  moviesSectionElement.innerHTML = '';
  document.querySelector('.order-info').innerHTML = '';
  document.querySelector('.order-info').style.padding = 0;
  localStorage.setItem('boughtMovies',JSON.stringify(moviesArray));
  const messageContainer = createHTMLElement('div','','message-container','',moviesSectionElement);
  createHTMLElement('p','successful completion of the order','message1','',messageContainer);
  createHTMLElement('p','enjoy your movies :)','message2','',messageContainer);
  const htmlElement = document.documentElement;
  htmlElement.backgroundImage = "none";
  htmlElement.style.backgroundColor = "white";
  document.querySelector('main').children[2].remove();
  movies.splice(0);
  localStorage.setItem('globalArray',JSON.stringify(movies));
});
let price = 0;
loadMovies();

function loadMovies(){
 for (let index = 0; index < movies.length; index++) {
    const currentObject = movies[index];
    moviesArray.push(currentObject);
    let dollarIndex = currentObject.price.indexOf('$');
    let moviePrice = currentObject.price.substring(dollarIndex + 1);
    price += Number(moviePrice);
    let movieCard = createHTMLElement('article','','movie-card','',moviesSectionElement)
    let imgContainer = createHTMLElement('div','','img-container','',movieCard);
    createHTMLElement('img','','',{src:currentObject.url},imgContainer);
    let infoContainer = createHTMLElement('div','','info','',movieCard);
    createHTMLElement('p',`${currentObject.name}`,'movie-title','',infoContainer);
    createHTMLElement('p',`${currentObject.year}`,'movie-year','',infoContainer);
    createHTMLElement('p',`${currentObject.price}`,'movie-price','',infoContainer);
    let removeButton = createHTMLElement('button','Remove Movie','remove-button', '',infoContainer );
    removeButton.innerHTML+='<i class="fa-regular fa-trash-can"></i>';
    removeButton.addEventListener('click', removeMovie);
    // aside element
    createHTMLElement('li',`${currentObject.name}: ${currentObject.price}`,'movie-order','',orderMoviesUl);
 }
 totalPriceParagraphElement.textContent =`$${price.toFixed(2)}`;
}

function removeMovie(event){
    let movieTitle = event.target.parentElement.children[0].textContent;
    const movieIndex = movies.findIndex((movie)=>movie.name===movieTitle);
    movies.splice(movieIndex, 1);
    localStorage.setItem('globalArray',JSON.stringify(movies));
    event.target.parentElement.parentElement.remove();
    let priceString = event.target.parentElement.children[2].textContent;
    price-= Number(priceString.substring(priceString.indexOf('$') + 1));
    totalPriceParagraphElement.textContent = `$${price.toFixed(2)}`;
    removeLiElement(movieTitle);
}

function removeLiElement(movieTitle){
   let childrenArray = Array.from(document.querySelector('.bought-movies').children);
   let liElement = childrenArray.find((element)=>element.textContent.includes(movieTitle));
   liElement.remove();
}

function createHTMLElement(typeOfElement, content, className, attributes, parentElement){
    const element = document.createElement(typeOfElement);
    if(content){
        element.textContent = content;
    }
    if(className){
        element.classList.add(className);
    }
    if(attributes){
        for (const key in attributes) {
           element.setAttribute(key,attributes[key]);
        }
    }
    if(parentElement){
        parentElement.appendChild(element);
    }
    return element;
}