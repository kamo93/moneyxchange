import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

import Currencies from './currencies';
import { PATH_LATEST } from '../../constants';
import { act } from '@testing-library/react';
import axiosInstance from '../../custom-axios';

configure({ adapter: new Adapter() });
const mock = new MockAdapter(axiosInstance);

mock.onGet(PATH_LATEST).reply(() => [
  200,
  {
    success: true,
    timestamp: 1582832982,
    base: 'EUR',
    date: '2020-02-27',
    rates: {
      USD: 2
    }
  }
]);

mock.onAny().reply(() => [
  200,
  {
    success: true,
    timestamp: 1581983999,
    historical: true,
    base: 'EUR',
    date: '2020-02-17',
    rates: {
      USD: 1.083779,
      COP: 3680.902182,
      BRL: 4.690573,
      MXN: 20.120396,
      JPY: 119.03683,
      CNY: 7.565209
    }
  }
]);

const actions = async (wrapper, _actions) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    _actions();
    wrapper.update();
  });
};

describe('<Currencies/>', () => {
  it('When calculate btn click, it should convert 10 euro in 20 dollars if dollar rate is 2', async () => {
    const wrapperCur = mount(<Currencies />);
    await actions(wrapperCur, () => {
      jest.useFakeTimers();
      const inputConverterWrapper = wrapperCur.find('input#converter');
      inputConverterWrapper.simulate('change', { target: { value: '€ 10' } });
      wrapperCur.find('button').simulate('click');
      jest.runAllTimers();
    });
    wrapperCur.update();
    expect(wrapperCur.find('input#changed-money').prop('value')).toEqual('$ 20');
  });
});
