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
loadMoreBtn.addEventListener('click' , handleLoadMoreBtnClick);

function clearMarkup() {
    listGallery.innerHTML = '';
   }


function handleSearchFormSubmit(event) {
    event.preventDefault();

     query = event.currentTarget.elements.searchQuery.value.trim();

    clearMarkup();

    if (!query) {
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
    

    if(data.totalHits < perPage) {
    return;
    }

    loadMoreBtn.classList.remove('is-hidden');
 })
.catch(error => console.log(error))
.finally(() => {
  searchFormEl.reset();
});
}

function handleLoadMoreBtnClick() {
    page +=1;

    fetchImage(query, page, perPage)
    .then(data => {
        createMarkup(data.hits);
        
    const totalPage = Math.ceil(data.totalHits/perPage)
    
    if(page > totalPage) {
        Notify.failure("We're sorry, but you've reached the end of search results.")
           loadMoreBtn.classList.add('is-hidden');
        }   
        })
    .catch(error => console.log(error));
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
    <div class="photo-card_image">
     <a class="image "href="${largeImageURL}">
     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
     </a>
     </div>
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
