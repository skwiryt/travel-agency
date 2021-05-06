import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

describe('DaysToSummer component', () => {
  it('should render wigthout crash', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });
  it('should render .summerInfo element', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.find('.summerInfo').length).toEqual(1);
  });

});
const mockProps = {
  description: 'to summer',
};
const mockDate = (customDate) => class extends Date {
  constructor(...args) {    
    if(args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now() {
    return new Date(customDate).getTime();
  }

};
const realDate = global.Date;
const checkDaysToSummer = (dateString, daysNb) => {
  it(`should show correct on ${dateString}`, () => {
    global.Date = mockDate(dateString);

    const component = shallow(<DaysToSummer description={mockProps.description} />);
    expect(component.find('.summerInfo').text())
      .toEqual(`${daysNb} ${mockProps.description}`);

    global.Date = realDate;
  });
};
const checkDaysInSummer = (dateString) => {
  it(`should show empty string on ${dateString}`, () => {
    global.Date = mockDate(dateString);

    const component = shallow(<DaysToSummer description={mockProps.description} />);
    expect(component.find('.summerInfo').text())
      .toEqual('');

    global.Date = realDate;
  });
};

describe('DaysToSummer component with modified Date', () => {
  checkDaysToSummer('2020-06-20', '1 day');
  checkDaysToSummer('2020-05-20', '32 days');
  checkDaysToSummer('2020-09-24', '270 days');
  
  checkDaysInSummer('2020-06-21');
  checkDaysInSummer('2020-06-22');
  checkDaysInSummer('2020-09-23');
  checkDaysInSummer('2020-09-22');
});