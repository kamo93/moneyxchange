import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Currencies from './currencies';
import CurrencyChange from '../../components/currency-change/currency-change';

describe('<Currencies/>', () => {
  it('When calculate btn click, it should convert 1 euro in 3 dollars if dollar rate is 3', () => {
    //const wrapper = shallow(<Currencies />);
    // const mocksCall = jest.fn();
    // const wrapper = shallow(<CurrencyChange onCalculateMoney={mocksCall} loading={false} changedMoney={10} />);
    const wrapperCur = shallow(<Currencies />);
    const instance = wrapperCur.instance();
    instance.changeMoneyHandler(10, 'USD');
    /*const btnCalculate = wrapper.find('button');
    btnCalculate.simulate('click');*/
    expect(wrapperCur.state('newCurrency').value).toEqual(10);
  });
});
