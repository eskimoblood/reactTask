import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Content from '../Content';

describe('Content render correct for state', () => {

  it('NOT_ASKED', () => {
    const content = shallow(<Content state="NOT_ASKED" />);
    expect(shallowToJson(content)).toMatchSnapshot();
  });

  it('LOADING', () => {
    const content = shallow(<Content state="LOADING" />);
    expect(shallowToJson(content)).toMatchSnapshot();
  });

  it('ERROR', () => {
    const content = shallow(<Content state="ERROR" error="Some strange things happen" />);
    expect(shallowToJson(content)).toMatchSnapshot();
  });

  it('SUCCESS', () => {
    const data = [
      { id: 1, url: 'http://test.de/1', name: 'repo1' },
      { id: 2, url: 'http://test.de/2', name: 'repo2' },
      { id: 3, url: 'http://test.de/3', name: 'repo3' }
    ];
    const content = shallow(<Content state="SUCCESS" data={data} />);
    expect(shallowToJson(content)).toMatchSnapshot();
  });

});
