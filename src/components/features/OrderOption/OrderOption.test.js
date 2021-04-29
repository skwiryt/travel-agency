import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render properly', () => {
    const component = shallow(<OrderOption name='asd' type='icons' />);
    // console.log('OrderOption element', component);
    // console.log(component.debug());
    // to poniżej nie działa, nawet po wykomentowaniu komponentu ShallowWrapper jest truthy. 
    // expect(component).toBeTruthy();
    // poniższe nie działa, nawet przy wykomentowanym komponencie pokazuje, że on istnieje
    // expect(component.exists()).toBe(true);
    // poniższe działa
    // expect(component.is('.component')).toBe(true);    
    // poniższe działa
    expect(component.get(0)).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('should render name prop', () => {
    const expectedName = 'Acd fgh';
    const component = shallow(<OrderOption name={expectedName} type='icons' />);
    const renderedName = component.find('.title').text();
    expect(renderedName).toBe(expectedName);
  });

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };
  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };  
  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };  
  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;
  const testTextValue = 'Mar Bab';

  for(let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
        
      });
      /* common tests */
      it('passes dummy test', () => {
        expect(1).toBe(1);
        // console.log(renderedSubcomponent.debug());
      });
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });
  
      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          /* tests for dropdown */
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);
          
            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);
          
            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
          it('should run setOrderOption function on change of dropdown', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'icons': {
          it('should render icons', () => {
            const emptyIcon = renderedSubcomponent.find('Icon[name="times-circle"]');
            expect(emptyIcon.length).toBe(1);
            const otherIcons = renderedSubcomponent.find('Icon').not('[name="times-circle"]');
            expect(otherIcons.length).toBe(2);
            expect(otherIcons.at(0).prop('name')).toBe('h-square');
          });
          it('should run setOrderOption function on click on icon', () => {
            renderedSubcomponent.find('.icon').at(2).simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        
        case 'checkboxes': {
          it('should render checkboxes', () => {
            const checkboxes = renderedSubcomponent.find('[type="checkbox"]');
            expect(checkboxes.length).toBe(2);
          });
          
          it('should run setOrderOption function on changee of checkbox', () => {
            renderedSubcomponent
              .find(`[value="${testValue}"]`)
              .simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
          });
          break;
        }
        case 'number': {
          it('should render number inputs', () => {
            const numberInput = renderedSubcomponent.find('[type="number"]');
            expect(numberInput.length).toBe(1);
          });
          it('should run setOrderOption function on change of number', () => {
            renderedSubcomponent
              .find('[type="number"]')
              .simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValueNumber});
          });
          break;
        }
        case 'text': {
          it('should render text input', () => {
            console.log(renderedSubcomponent.debug());
            const textInput = renderedSubcomponent.find('[type="text"]');
            expect(textInput.length).toBe(1);
          });
          it('should run setOrderOption function on change of text', () => {
            renderedSubcomponent.simulate('change', {currentTarget: {value: testTextValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id] : testTextValue});
          });
          break;
        }
        case 'date': {
          it('should render date input', () => {
            console.log(renderedSubcomponent.debug());
            const dateInput = renderedSubcomponent.find(DatePicker);
            expect(dateInput.length).toBe(1);
          });
          
          it('should run setOrderOption function on change of date', () => {
            renderedSubcomponent.find(DatePicker).simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id] : testValue});
          });
          
          break;
        }
        
      }

    });
  }
}); 