export default (state, action) => {
  //ensure we don't dispatch outdated/slower responses
  const time = action.time;
  if (time < state.time) {
    return state;
  }

  switch (action.type) {
    case 'EMPTY_SEARCH':
      return { state: 'NOT_ASKED', time };
    case 'LOADING':
      return { state: 'LOADING', time };
    case 'SUCCESS':
      return { state: 'SUCCESS', data: action.data, time };
    case 'ERROR':
      return { state: 'ERROR', error: action.error, time };
    default:
      return state;
  }
};
