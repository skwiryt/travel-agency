import React from 'react';
import HappyHourAd from './HappyHourAd';
import {shallow} from 'enzyme';

const select = {
  title: '.title',
  description: '.promoDescription',
};
const mockProps = {
  title: 'testTitle',
  description: 'testDescription',
};

describe('Component HappyHourAd', () => {
  
  it('should render without crash', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });
  it('should contain title and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.description)).toEqual(true);    
  });
  it('should render proper title', () => {
    const component = shallow(<HappyHourAd title={mockProps.title}/>);
    expect(component.find(select.title).text()).toBe(mockProps.title);
  });

});


const trueDate = Date;
const mockDate = (customDate) => class extends Date {
  constructor(...args) {
    if (args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};
const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.description).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {  
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});
const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mockProps} />);
    
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);

    const renderedTime = component.find(select.description).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});



describe('Component HappyHourAd with mocked Date', () => {  
  checkDescriptionAtTime('12:00:00', mockProps.description);
  checkDescriptionAtTime('12:39:59', mockProps.description);
  checkDescriptionAtTime('12:59:59', mockProps.description);
});

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('11:59:58', 2, mockProps.description);
  checkDescriptionAfterTime('11:59:58', 2 * 60 * 60 + 2, 22 * 60 * 60 + '');
});


