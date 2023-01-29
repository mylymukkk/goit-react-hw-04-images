import axios from 'axios';

const key = '30103926-bc1271f834f2572d4e26830c5';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPhoto = async (searchQuery, page) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return response.data;
};
