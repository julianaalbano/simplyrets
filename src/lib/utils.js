/**
 * a wrapper for fetch that will throw an error for http status codes above 400
 * @param {object} params - function parameters
 * @param {string} params.url - the absolute url of the request
 * @param {object} params.options - fetch options object
 * @returns {object} jsonResponse
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

export const getProperties = async () => {
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
  // use the api url as the key
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

export const isFavorite = mlsId => {
  const cache = localStorage.getItem('favorites');
  if (cache) {
    const parsed = JSON.parse(cache);
    if (parsed.indexOf(mlsId) >= 0) {
      return true;
    }
    return false;
  }
};

export const addFavorite = mlsId => {
  const currentCache = localStorage.getItem('favorites');
  if (currentCache) {
    const parsed = JSON.parse(currentCache);
    if (parsed.indexOf(mlsId) === -1) {
      parsed.push(mlsId);
      localStorage.setItem('favorites', JSON.stringify(parsed));
    }
  } else {
    localStorage.setItem('favorites', JSON.stringify([mlsId]));
  }
}

export const removeFavorite = mlsId => {
  const currentCache = localStorage.getItem('favorites');
  if (currentCache) {
    const parsed = JSON.parse(currentCache);
    const index = parsed.indexOf(mlsId);
    if (index > -1) {
      parsed.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(parsed));
    }
  }
}

/**
 * @param {object} params - function params
 * @param {string} params.date - date & time string in this format: "1991-12-12T00:45:02.01603Z"
 * @returns {string} date string in this type of format: 12/12/1991
 */
export const formattedDate = ({ date }) => {
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);
  return `${month}/${day}/${year}`;
};

/**
 * @param {object} params - function params
 * @param {number} params.numPrice - price as a number
 * @returns {string} price as a string (in USD)
 */
export const convertNumberPriceToStringPrice = ({ numPrice }) => {
  return (numPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};