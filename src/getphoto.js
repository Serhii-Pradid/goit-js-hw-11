import axios from "axios";

const API_KEY = '35017010-22ff9d91446ce045b1621b769';
const URL = 'https://pixabay.com/api/';

async function fetchImage(query, page, perPage) {
    const response = await axios.get(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
}

export default fetchImage;