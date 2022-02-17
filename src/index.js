import './css/styles.css';
import "normalize.css";
import renderSearchResults from "./renderSearchResults"
import getURL from "./getUrl"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.4.min.css";



const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');
let gallerySLB = {};
let currentPage = 1;
let querySearch = '';



form.addEventListener('submit', onSearchButtonClick);
buttonLoadMore.addEventListener('click', onButtonLoadMoreClick);


async function onSearchButtonClick(e) {
  e.preventDefault();
  querySearch = e.currentTarget.searchQuery.value.trim().split(' ').join('+');
  if (querySearch === '') {
    e.target.reset();
    return;
  }
  gallery.innerHTML = '';
  let searchResults = {};

  try {
    const { data } = await axios.get(getURL(querySearch));
    searchResults = data;
  } catch (error) {
    console.error(error);
  }

  if (!searchResults.hits.length) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    buttonLoadMore.classList.add('is-hidden');
  } else {
    Notify.success(`We've found ${searchResults.total} matches`);
    renderSearchResults(searchResults, gallery);
    buttonLoadMore.classList.remove('is-hidden');
    createLightBox();
  }

  //e.target.reset();
}


async function onButtonLoadMoreClick(e) {
  e.preventDefault();
  currentPage += 1;
  let searchResults = {};

  try {
    const { data } = await axios.get(getURL(querySearch, currentPage));
    searchResults = data;
  } catch (error) {
    console.error(error);
  }

  if ((currentPage * 40) > searchResults.totalHits.length || (currentPage * 40) > searchResults.total) {
    Notify.warning("Sorry, we've reached the limit of our search");
  }

  renderSearchResults(searchResults, gallery);
  gallerySLB.refresh();
}



function createLightBox() {
  gallerySLB = new SimpleLightbox('.gallery a');
}