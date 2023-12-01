import axios from 'axios';

const apiKey = '41002139-ab30ad0ff8976a28ff14eed97';

async function fetchImages(query, page = 1, perPage = 40) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { fetchImages };
