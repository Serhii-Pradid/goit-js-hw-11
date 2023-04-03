import { Notify } from 'notiflix';
import fetchImage from './getphoto';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const listGallery = document.querySelector('.gallery');

let query = '';
let page = 1;
const perPage = 40;

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
    event.preventDefault();

    
    const searchQuery = formData.get('searchQuery').trim();

    if(searchQuery === '') {
        loadMoreBtn.classList.toggle('is-hidden');
        return Notify.failure('Please enter a title!')
    }


}

function createImageMarkup(image) {

    return image.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    
    `<a href="${largeImageURL}"></a>
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p>
    <p class="info-item"><b>Views</b>${views}</p>
    <p class="info-item"><b>Comments</b>${comments}</p>
    <p class="info-item"><b>Downloads</b>${downloads}</p>
  </div>
</div>
</a>`
)

}
