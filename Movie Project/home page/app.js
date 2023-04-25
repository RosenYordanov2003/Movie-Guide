
let object = JSON.parse(localStorage.getItem('count'));
const bestMoviesSectionElement =  document.querySelector('.best-movies-section');
if (object.notificationCount !== 0) {
  document.querySelector(".notification").textContent += object.notificationCount
  document.querySelector(".notification").style.display = "block";
} else {
  document.querySelector(".notification").style.display = "none";
}
document.querySelectorAll(".left-btn").forEach((btn) => btn.addEventListener('click', moveBack));

document.querySelectorAll('.right-btn').forEach((btn) => btn.addEventListener('click', moveForward));

function moveBack(event){
  let index =  Array.from(bestMoviesSectionElement.children).indexOf(event.target.parentElement.parentElement);
  let newIndex = index - 1;
  event.target.parentElement.parentElement.classList.add("visible");
  if(newIndex  === 0){
    newIndex = document.querySelector('.best-movies-section').children.length - 1;
  }
  bestMoviesSectionElement.children[newIndex].classList.remove("visible");
}

function moveForward(event){
  let index =  Array.from(bestMoviesSectionElement.children).indexOf(event.target.parentElement.parentElement);
  let newIndex = index + 1;
  event.target.parentElement.parentElement.classList.add("visible");
  if(newIndex >= bestMoviesSectionElement.children .length){
    newIndex = 1;
  }
  bestMoviesSectionElement.children[newIndex].classList.remove("visible");
}