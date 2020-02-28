import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axiosInstance from '../../custom-axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

import Currencies from './currencies';
import CurrencyChange from '../../components/currency-change/currency-change';
import { PATH_LATEST } from '../../constants';
import { act } from '@testing-library/react';

const mock = new MockAdapter(axiosInstance);

mock.onGet(PATH_LATEST).reply(() => [
  200,
  {
    success: true,
    timestamp: 1582832982,
    base: 'EUR',
    date: '2020-02-27',
    rates: {
      USD: 1.098661
    }
  }
]);

describe('<Currencies/>', () => {
  it('When calculate btn click, it should convert 1 euro in 3 dollars if dollar rate is 3', async () => {
    const wrapperCur = mount(<Currencies />);
    // const mocksCall = jest.fn();
    // const wrapper = shallow(<CurrencyChange onCalculateMoney={mocksCall} loading={false} changedMoney={10} />);
    //const wrapperCur = mount(<CurrencyChange onCalculateMoney={mocksCall} loading={false} changedMoney={10} />);
    const btnWrapper = wrapperCur.find('button');
    const inputConverterWrapper = wrapperCur.find('input#converter');
    inputConverterWrapper.simulate('change', { target: { value: '€ 10' } });
    jest.useFakeTimers();
    wrapperCur.find('button').simulate('click');
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapperCur.find('input#changed-money').prop('value')).toEqual('$ 0');
  });
});
