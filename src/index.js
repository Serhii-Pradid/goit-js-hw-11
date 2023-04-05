import { Notify } from 'notiflix';
import fetchImage from './getphoto';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");
const listGallery = document.querySelector(".gallery");

const lightbox = new SimpleLightbox('.gallery a', {});


let query = '';
let page = 1;
const perPage = 40;

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function clearMarkup() {
    listGallery.innerHTML = '';
   }


function handleSearchFormSubmit(event) {
    event.preventDefault();

     query = event.currentTarget.elements.searchQuery.value.trim();

    clearMarkup();

    if (!query) {
        //loadMoreBtn.classList.add('is-hidden');
        return Notify.failure('Please enter a title!');
        }

    fetchImage(query, page, perPage)
    .then(data => {
    console.log(data);
    if(data.totalHits === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again."
    );
    return;
    }   

    Notify.success(`"Hooray! We found ${data.totalHits} images."`);
    createMarkup(data.hits);
 })
.catch(error => console.log(error))
.finally(() => {
  searchFormEl.reset();
});
}

function createMarkup(data){
    const markupList = createImageMarkup(data);
    listGallery.insertAdjacentHTML('beforeend' , markupList );
    lightbox.refresh();
}

function createImageMarkup(images) {
    return images.map(
    ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `
    <div class="photo-card">
     <a href="${largeImageURL}">
     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
     </a>
    <div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p>
    <p class="info-item"><b>Views</b>${views}</p>
    <p class="info-item"><b>Comments</b>${comments}</p>
    <p class="info-item"><b>Downloads</b>${downloads}</p>
  </div>
</div>`
    })
    .join("")
}
