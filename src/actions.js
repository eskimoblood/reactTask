import 'whatwg-fetch';

export const startSearch = term => dispatch => {
  const time = Date.now();
  if (term === '') {
    dispatch({ type: 'EMPTY_SEARCH', time });
    return;
  }
  dispatch({ type: 'LOADING', time });
  return fetch(`https://api.github.com/users/${term}/repos`)
    .then(data => parseResult(data, term))
    .then(data => dispatch(parseData(data, term, time)))
    .catch(error => {
      dispatch({ error, type: 'ERROR', time })
    })
};

function parseResult(result, user) {
  if (result.status >= 200 && result.status < 300) {
    return result.json()
  }
  if (result.status === 404) {
    throw `Could not find ${user} on GitHub`
  }
  throw  'GitHub does not respond';
}

function parseData(data, user, time) {
  if (data.length === 0) {
    throw `User ${user} has no repos on GitHub`
  } else {
    return { type: 'SUCCESS', data: normalizeData(data), time }
  }
}

function normalizeData(data) {
  return data.map(({ name, url, id }) => ({ name, url, id }))
}
