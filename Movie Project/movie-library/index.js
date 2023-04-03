const libraryElement = document.getElementById("library");
const movies = JSON.parse(localStorage.getItem("boughtMovies"));
let library = JSON.parse(localStorage.getItem("library")) || [];
let object = JSON.parse(localStorage.getItem('count'));

if(object.notificationCount!==0){
  document.querySelector('.notification').style.display = 'block';
}
else{
  document.querySelector('.notification').style.display = 'none';
}
 getMovies();
 console.log(library);
 loadLibrary();

function getMovies() {
  movies.forEach((object) => {
    if (library.findIndex((movie) => movie.name === object.name) === -1) {
      library.push(object);
    }
  });
  localStorage.setItem("library", JSON.stringify(library));
}
function loadLibrary(){
    libraryElement.innerHTML = '';
    for (let index = 0; index < library.length; index++) {
        const currentObject = library[index];
        let articleContainer = createHTMLElement('article','','movie-card','',libraryElement);
        let imgContainer = createHTMLElement('div','','img-container','',articleContainer);
        createHTMLElement('img','','',{src:currentObject.url},imgContainer);
        let imgDescription =  createHTMLElement('p','Watch now','img-description','',imgContainer);
        let movieInfoContainer = createHTMLElement('div','','movie-info','',articleContainer);
        createHTMLElement('p','Name','movie-title-label','',movieInfoContainer);
        createHTMLElement('p',currentObject.name,'movie-title','',movieInfoContainer);
        createHTMLElement('p','Year','movie-year-label','',movieInfoContainer);
        createHTMLElement('p',currentObject.year,'movie-year','',movieInfoContainer);

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
