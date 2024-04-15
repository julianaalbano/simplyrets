import { FAVORITES_KEY } from './const';

/**
 * a wrapper for fetch that will throw an error for http status codes above 400
 * @param {object} params - function parameters
 * @param {string} params.url - the absolute url of the request
 * @param {object} params.options - fetch options object
 * @returns {object} json response
 */
const betterFetch = async ({ url, options }) => {
  const res = await fetch(url, { ...options, mode: 'cors' });
  const jsonResponse = await res.json();
  if (res.status >= 400) {
    const err = new Error(jsonResponse.message);
    err.response = res;
    err.body = jsonResponse;
    throw err;
  }
  return jsonResponse;
};

/**
 * retrieves all the properties cached in local storage.
 * if there aren't any properties in local storage, this function makes the API request and caches them.
 * @returns {Array} list of properties
 */
export const getProperties = async () => {
  // API Documentation: https://docs.simplyrets.com/api/index.html#/Listings/get_properties
  const url = 'https://api.simplyrets.com/properties';
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Basic ${btoa('simplyrets:simplyrets')}`
    }
  };
  // use the API url as the key in local storage
  const cache = localStorage.getItem(url);
  if (cache) {
    return JSON.parse(cache);
  }
  return betterFetch({ url, options })
    .then(res => {
      localStorage.setItem(url, JSON.stringify(res));
      return res;
    });
};

/**
 * retrieves all favorite listings from local storage
 * @returns {Array} list of favorite listings
 */
const getFavorites = () => {
  return localStorage.getItem(FAVORITES_KEY);
}

/**
 * identifies if the given `mlsId` is included in the 'favorites' key in local storage
 * @param {object} params - function parameters
 * @param {string} params.mlsId - MLS ID
 * @returns {boolean} whether or not the provided `mlsId` is a 'favorite' listing
 */
export const isFavorite = ({ mlsId }) => {
  const favorites = getFavorites();
  if (favorites) {
    const parsed = JSON.parse(favorites);
    if (parsed.indexOf(mlsId) >= 0) {
      return true;
    }
    return false;
  }
};

/**
 * adds a given `mlsId` to the list of 'favorites' in local storage
 * @param {object} params - function parameters
 * @param {string} params.mlsId - MLS ID to add
 */
export const addFavorite = ({ mlsId }) => {
  const favorites = getFavorites()
  if (favorites) {
    const parsed = JSON.parse(favorites);
    if (parsed.indexOf(mlsId) === -1) {
      parsed.push(mlsId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(parsed));
    }
  } else {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([mlsId]));
  }
}

/**
 * removes a given `mlsId` from the list of 'favorites' in local storage
 * @param {object} params - function parameters
 * @param {string} params.mlsId - MLS ID to remove
 */
export const removeFavorite = ({ mlsId }) => {
  const favorites = getFavorites()
  if (favorites) {
    const parsed = JSON.parse(favorites);
    const index = parsed.indexOf(mlsId);
    if (index > -1) {
      parsed.splice(index, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(parsed));
    }
  }
}

/**
 * @param {object} params - function params
 * @param {string} params.date - date & time string in this format: "1991-12-12T00:45:02.01603Z"
 * @returns {string} date string in this type of format: 12/12/1991
 */
export const formattedDate = ({ date }) => {
  if (date) {
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const year = date.slice(0, 4);
    if (month && day && year) {
      return `${month}/${day}/${year}`;
    }
  }
  return '';
};

/**
 * @param {object} params - function params
 * @param {number} params.numPrice - price as a number (negative numbers not supported)
 * @returns {string} price as a string (in USD)
 */
export const convertNumberPriceToStringPrice = ({ numPrice }) => {
  if (numPrice >= 0) {
    return (numPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
  return '$0.00';
};