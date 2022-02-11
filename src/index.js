import './css/styles.css';
import "normalize.css";
import renderSearchResults from "./renderSearchResults"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";
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


async function onSearchButtonClick (e) {
  e.preventDefault();
  gallery.innerHTML = '';
  querySearch = e.currentTarget.searchQuery.value.split(' ').join('+');
  let searchResults ={};

  try {
    const { data } = await axios.get(getURL(querySearch));
    searchResults = data;
    console.log(searchResults);
  } catch(error) {
    console.error(error);
  }

  if (!searchResults.hits.length){
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else {
    Notify.success(`We've found ${searchResults.total} matches`);
    renderSearchResults(searchResults, gallery);
    buttonLoadMore.classList.remove('is-hidden');
    createLightBox();
  }

  e.target.reset();
}


async function onButtonLoadMoreClick (e){
  e.preventDefault();
  currentPage +=1;
  let searchResults ={};

  try {
    const { data } = await axios.get(getURL(querySearch, currentPage));
    searchResults = data;
  } catch(error) {
    console.error(error);
  }

  if ((currentPage * 40) > searchResults.totalHits.length || (currentPage * 40) > searchResults.total ){
    Notify.warning("Sorry, we've reached the limit of our search");
  }

  renderSearchResults(searchResults, gallery);
  gallerySLB.refresh();
}

function getURL(query, page = 1) {
  const pesonalKey = "25600695-4ceee91aa58c1079792de0ba1";
  return `https://pixabay.com/api/?key=${pesonalKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
}


function createLightBox() {
  gallerySLB = new SimpleLightbox('.gallery a');
}