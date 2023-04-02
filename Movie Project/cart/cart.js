let movies =  JSON.parse(localStorage.getItem('array'));
const moviesSectionElement = document.querySelector('.added-movies');
loadMovies();

function loadMovies(){
 for (let index = 0; index < movies.length; index++) {
    const currentObject = movies[index];
    let movieCard = createHTMLElement('article','','movie-card','',moviesSectionElement)
    let imgContainer = createHTMLElement('div','','img-container','',movieCard);
    createHTMLElement('img','','',{src:currentObject.url},imgContainer);
    let infoContainer = createHTMLElement('div','','info','',movieCard);
    createHTMLElement('p',`${currentObject.name}`,'movie-title','',infoContainer);
    createHTMLElement('p',`${currentObject.price}`,'movie-price','',infoContainer);
 }
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