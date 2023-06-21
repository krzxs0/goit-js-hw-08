import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

function renderGallery(arrayOfImages) {
  const imagesArr = arrayOfImages.map(({ preview, original, description }) => {
    return `<a class="gallery__item" href="${original}">
              <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>`;
  });
  galleryRef.insertAdjacentHTML('beforeend', imagesArr.join(''));
}

renderGallery(galleryItems);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});