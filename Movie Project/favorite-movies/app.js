let object = JSON.parse(localStorage.getItem("count"));
if (object.notificationCount !== 0) {
  document.querySelector(".notification").textContent += object.notificationCount
  document.querySelector(".notification").style.display = "block";
} else {
  document.querySelector(".notification").style.display = "none";
}
let favoriteArray = JSON.parse(localStorage.getItem('favorite-movies'));

const movieSection = document.getElementById('movies');
loadMovies();

function loadMovies(){
  movieSection.innerHTML = '';
  for (let index = 0; index < favoriteArray.length; index++) {
    const currentObject = favoriteArray[index];
    let articleContainer = createHTMLElement('article','','movie-card','',movieSection);
    let imgContainer = createHTMLElement('div','','img-container','',articleContainer);
    createHTMLElement('img','','',{src:currentObject.url},imgContainer);
    let imgDescription =  createHTMLElement('p','Watch now','img-description','',imgContainer);
    let movieInfoContainer = createHTMLElement('div','','movie-info','',articleContainer);
    createHTMLElement('p','Name','movie-title-label','',movieInfoContainer);
    createHTMLElement('p',currentObject.name,'movie-title','',movieInfoContainer);
    createHTMLElement('p','Year','movie-year-label','',movieInfoContainer);
    createHTMLElement('p',currentObject.year,'movie-year','',movieInfoContainer);
    const unfavoriteButton =  createHTMLElement('button','unfavorite', 'remove-btn' ,'' ,movieInfoContainer);
    unfavoriteButton.innerHTML += '<i class="fa-solid fa-heart"></i>';
    unfavoriteButton.addEventListener('click',removeFromFavorite);

    articleContainer.addEventListener('mouseover',()=>{
      articleContainer.classList.add('movie-hover');
      imgDescription.style.opacity = 1;
        imgDescription.style.transform = 'translateY(0)';
       });
       articleContainer.addEventListener('mouseout',()=>{
        articleContainer.classList.remove('movie-hover');
        imgDescription.style.opacity = 0;
    });
}
}
function removeFromFavorite(event){
  let movieName = event.target.parentElement.children[1].textContent;
  let index = favoriteArray.findIndex((movie) => movie.name === movieName);
  favoriteArray.splice(index, 1);
  loadMovies();
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
        element.setAttribute(key, attributes[key]);
      }
  }
  if(parentElement){
      parentElement.appendChild(element);
  }
  return element;
}
