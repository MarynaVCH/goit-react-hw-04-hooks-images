import axios from 'axios';

const KEY = '24356647-347894b37411f301011a02fc0';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchGallery = async (value, page) => {
  const { data } = await axios.get(
    `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};
