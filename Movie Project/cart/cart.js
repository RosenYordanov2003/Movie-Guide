let movies =  JSON.parse(localStorage.getItem('globalArray'));
let moviesArray = [];
const moviesSectionElement = document.querySelector('.added-movies');
const orderMoviesUl = document.querySelector('.bought-movies');
const totalPriceParagraphElement = document.querySelector('.total-price');
const buyButton = document.querySelector('.buy-button');

buyButton.addEventListener('click',()=>{
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
    createHTMLElement('p',`${currentObject.price}`,'movie-price','',infoContainer);
    createHTMLElement('li',`${currentObject.name}: ${currentObject.price}`,'movie-order','',orderMoviesUl);
 }
 totalPriceParagraphElement.textContent+=`$${price.toFixed(2)}`;
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