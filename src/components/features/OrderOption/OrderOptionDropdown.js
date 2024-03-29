import PropTypes from 'prop-types';
import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';


const OrderOptionDropdown = ({currentValue, required, values,  setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
  >    
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    
    {values.map(value => (
      <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
    ))}
  </select>
);
OrderOptionDropdown.propTypes = {
  currentValue: PropTypes.string,
  required: PropTypes.bool,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
};
export default OrderOptionDropdown;
  