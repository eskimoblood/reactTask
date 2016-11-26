import { startSearch } from '../actions';

describe('startSearch', () => {
  beforeAll(() => {
    Date.now = () => 1234;
  });

  it('for empty string dispatch `EMPTY_SEARCH`', () => {
    const dispatch = jest.fn();
    global.fetch = jest.fn();

    startSearch('')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'EMPTY_SEARCH', time: 1234 });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  describe('with valid search term ', () => {

    it('makes a request to correct url', async() => {
      const dispatch = jest.fn();
      global.fetch = jest.fn(() => Promise.resolve());
      await startSearch('test')(dispatch);
      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/users/test/repos');
    });

    it('triggers a LOADING event', async() => {
      const dispatch = jest.fn();
      global.fetch = jest.fn(() => Promise.resolve());
      await startSearch('test')(dispatch);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOADING', time: 1234 });
    });
  });

  it('with result of 404 dispatch error', async() => {
    const dispatch = jest.fn();
    const result = Promise.resolve({ status: 404 });
    global.fetch = jest.fn(() => result);

    await startSearch('test')(dispatch);

    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'ERROR', error: 'Could not find test on GitHub', time: 1234 });

  });

  it('startSearch with other server error dispatch error', async() => {
    const dispatch = jest.fn();
    const result = Promise.resolve({ status: 500 });
    global.fetch = jest.fn(() => result);

    await  startSearch('test')(dispatch);
    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'ERROR', error: 'GitHub does not respond', time: 1234 });
  });

  it('startSearch with an empty result dispatch error', async() => {
    const dispatch = jest.fn();

    const result = Promise.resolve({ status: 200, json: () => Promise.resolve([]) });
    global.fetch = jest.fn(() => result);

    await startSearch('test')(dispatch);
    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'ERROR', error: 'User test has no repos on GitHub', time: 1234 });
  });

  it('startSearch with  result dispatch success', async() => {
    const dispatch = jest.fn();

    const resultData = [
      { id: 1, url: 'someurl1', name: 'someName1', otherValue: 'someotherValue1' },
      { id: 2, url: 'someurl2', name: 'someName2', otherValue: 'someotherValue2' }
    ];
    const result = Promise.resolve({ status: 200, json: () => Promise.resolve(resultData) });
    global.fetch = jest.fn(() => result);

    await startSearch('test')(dispatch);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'SUCCESS',
      data: [
        { id: 1, url: 'someurl1', name: 'someName1' },
        { id: 2, url: 'someurl2', name: 'someName2' }
      ],
      time: 1234

    });
  });

})
;

