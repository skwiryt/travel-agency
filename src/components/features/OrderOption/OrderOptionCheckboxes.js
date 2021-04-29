import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = ({currentValue, values,  setOptionValue}) => (
  
  <div className={styles.checkboxes} > {
    values.map(value => {
      
      return (
        <label 
          key={value.id} 
                
        >
          <input 
            type='checkbox' 
            checked={currentValue.includes(value.id)}
            name={value.icon}
            value={value.id}
            onChange={
              event => setOptionValue(newValueSet(currentValue,value.id, event.currentTarget.checked))
            }
          />
          {value.name} ({formatPrice(value.price)})
        </label> );
    })} 
  </div>);


OrderOptionCheckboxes.propTypes = {
  currentValue: PropTypes.array,
  required: PropTypes.bool,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
};
export default OrderOptionCheckboxes;
  
  