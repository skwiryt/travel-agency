import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate link to right address', () => {
    const id = 'abc';
    const element = shallow(<TripSummary id={id} tags={[]}  cost='1' name='asd' image='asd' days={2}/>);
    const renderedUrl = element.find('Link').prop('to');
    expect(renderedUrl).toEqual('/trip/' + id);    
  });
  it('should generate img with right src', () => {
    const expectedSrc = 'Qwerty';
    const element = shallow(<TripSummary image={expectedSrc} tags={[]} cost='1' name='asd' id='asd' days={2}/>);
    const renderedSrc = element.find('img').prop('src');
    expect(renderedSrc).toEqual(expectedSrc);
  });
  it('should generate img with right alt', () => {
    const expectedAlt = 'Qwerty';
    const element = shallow(<TripSummary name={expectedAlt} tags={[]} cost='1' id='asd' image='asd' days={2}/>);
    const renderedAlt = element.find('img').prop('alt');
    expect(renderedAlt).toEqual(expectedAlt);
  });
  it('should properly render name prop', () => {
    const expectedName = 'Qwerty';
    const element = shallow(<TripSummary name={expectedName} tags={[]} cost='1' id='asd' image='asd' days={2}/>);
    const renderedName = element.find('.title').text();
    expect(renderedName).toEqual(expectedName);
  });
  it('should properly render cost prop', () => {
    const cost = '200';
    const element = shallow(<TripSummary name='asd' tags={[]} cost={cost} id='asd' image='asd' days={2}/>);
    const renderedCost = element.find('.details').childAt(1).text();
    expect(renderedCost).toEqual('from ' + cost);
  });
  it('should properly render days prop', () => {
    const days = 3;
    const element = shallow(<TripSummary name='asd' tags={[]} cost='200' id='asd' image='asd' days={days}/>);
    const renderedCost = element.find('.details').childAt(0).text();
    expect(renderedCost).toEqual(days + ' days');
  });
  it('should properly render tags', () => {
    const tags = ['sun', 'pool', 'golf'];
    const element = shallow(<TripSummary name='asd' tags={tags} cost='200' id='asd' image='asd' days={2}/>);
    const firstTag = element.find('.tag').at(0).text();
    const secondTag = element.find('.tag').at(1).text();
    const thirdTag = element.find('.tag').at(2).text();
    expect(firstTag).toEqual('sun');
    expect(secondTag).toEqual('pool');
    expect(thirdTag).toEqual('golf');
  });
  it('should not render tags div if tags array is empty', () => {
    const tags = [];
    const element = shallow(<TripSummary tags={tags} name='asd' cost='200' id='asd' image='asd' days={2}/>);
    const isTagsDiv = element.exists('.tags');
    expect(isTagsDiv).toBe(false);
  });

  it('should not render tags div if no tags prop', () => {
    
    const element = shallow(<TripSummary name='asd' cost='200' id='asd' image='asd' days={2}/>);
    const isTagsDiv = element.exists('.tags');
    expect(isTagsDiv).toBe(false);
  });

  it('should throw error if required prop is missing', () => {
    expect(() => 
      shallow(<TripSummary tags={[]} cost='1' id='asd' image='asd' days={2}/>))
      .toThrow();
    expect(() => 
      shallow(<TripSummary name='asd' tags={[]} id='asd' image='asd' days={2}/>))
      .toThrow();
    expect(() => 
      shallow(<TripSummary name='asd' tags={[]} cost='1' image='asd' days={2}/>))
      .toThrow();
    expect(() => 
      shallow(<TripSummary name='asd' tags={[]} cost='1' id='asd' days={2}/>))
      .toThrow();
    expect(() => 
      shallow(<TripSummary name='asd' tags={[]} cost='1' id='asd' image='asd'/>))
      .toThrow();
  });
});