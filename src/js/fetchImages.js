import axios from 'axios';

const KEY = '39759324-a98081d45e1653f503d47aa2f';


axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page, perPage=40) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}
