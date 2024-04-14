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
    .then(json => {
      // set the json result in localStorage
      localStorage.setItem(url, JSON.stringify(json));
      return json;
    });
};
