import './css/styles.css';
import "normalize.css";
import fetchCountries from './fetchCountries.js';
const debounce = require('lodash.debounce');
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.4.min.css";

const options = {
  method: 'GET',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
