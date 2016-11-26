import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { App } from '../App';

jest.mock('../Content', () => 'Content');
jest.useFakeTimers();

describe('App', () => {

  it('renders correct', () => {
    const app = shallow(<App onChange={jest.fn()} />);
    expect(shallowToJson(app)).toMatchSnapshot();
  });

  it('triggers the search', () => {
    const onChange = jest.fn();
    const app = shallow(<App startSearch={onChange} />);
    app.find('input').first().prop('onInput')({ target: { value: 'test123' } });
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledWith('test123');
  });
});
