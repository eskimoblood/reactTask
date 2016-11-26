import reducers from '../reducers';

describe('reducer', () => {

  it('dont change state for outdated action', () => {
    const newState = reducers(
      { state: 'SUCCESS', data: 'someData', time: 10 },
      { type: 'SUCCESS', data: 'someOldData', time: 5 });

    expect(newState).toEqual({ state: 'SUCCESS', data: 'someData', time: 10 })
  });

  it('for emtpy search', () => {
    const newState = reducers(
      { state: 'SUCCESS', data: 'someData', time: 10 },
      { type: 'EMPTY_SEARCH', time: 15 });

    expect(newState).toEqual({ state: 'NOT_ASKED', time: 15 });
  });

  it('for loading', () => {
    const newState = reducers(
      { state: 'SUCCESS', data: 'someData', time: 10 },
      { type: 'LOADING', time: 15 });

    expect(newState).toEqual({ state: 'LOADING', time: 15 });
  });

  it('for success', () => {
    const newState = reducers(
      { state: 'SUCCESS', data: 'someData', time: 10 },
      { type: 'SUCCESS', time: 15, data: 'someNewData' });

    expect(newState).toEqual({ state: 'SUCCESS', time: 15, data: 'someNewData' });
  });

  it('for error', () => {
    const newState = reducers(
      { state: 'SUCCESS', data: 'someData', time: 10 },
      { type: 'ERROR', time: 15, error: 'someError' });

    expect(newState).toEqual({ state: 'ERROR', time: 15, error: 'someError' });
  });

  it('for unkown state', () => {
    const newState = reducers(
      { state: 'SUCCESS', data: 'someData', time: 10 },
      { type: 'SOME_UNKNOWN_STATE', time: 15 });

    expect(newState).toEqual({ state: 'SUCCESS', data: 'someData', time: 10 });
  });

});
