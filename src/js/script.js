import { fetchImages } from './api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let totalHits = 0;
let totalPages = 0;
const perPage = 40;
const gallery = document.querySelector('.gallery');
let lightbox;

document
  .getElementById('search-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    clearGallery();
    currentPage = 1;
    const searchQuery = event.target.elements.searchQuery.value.trim();
    if (!searchQuery) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query.',
        position: 'topRight',
      });
      return;
    }
    await performSearch(searchQuery);
  });

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadMoreImages();
  }
});

async function loadMoreImages() {
  const searchQuery = document
    .getElementById('search-form')
    .elements.searchQuery.value.trim();
  if (!searchQuery || currentPage >= totalPages) return;

  currentPage++;
  await performSearch(searchQuery);
}

async function performSearch(query) {
  query = query.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  try {
    const data = await fetchImages(query, currentPage, perPage);
    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / perPage);
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    } else {
      displayImages(data.hits);
      if (currentPage === 1) {
        iziToast.success({
          title: 'Hooray!',
          message: `We found ${totalHits} images.`,
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Error fetching images',
      position: 'topRight',
    });
  }
}

function displayImages(images) {
  images.forEach(image => {
    const cardHTML = `
      <div class="photo-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${image.likes}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${image.views}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${image.comments}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${image.downloads}</span>
          </div>
        </div>
      </div>`;
    gallery.insertAdjacentHTML('beforeend', cardHTML);
  });

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {});
  }

  if (currentPage >= totalPages) {
    iziToast.error({
      title: 'End of Results',
      message:
        'Sorry, there are no more images matching your search query. Please try again.',
      position: 'topRight',
    });
  }

  if (currentPage > 1) {
    smoothScroll();
  }
}

function clearGallery() {
  gallery.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
