import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';


const OrderOptionIcons = ({currentValue, required, values,  setOptionValue}) => (
  
  <div > {    
    required ? '' : (
      <div 
        className={styles.icon}
        onClick={() => setOptionValue('')}
      >
        <Icon name='times-circle'/>
        none
      </div> 
    )
  }
    
  {
    values.map(value => {
      const classes = currentValue === value.id 
        ? `${styles.icon} ${styles.iconActive}`
        : `${styles.icon}`;
      return (
        <div 
          key={value.id} 
          className={classes}
          onClick={() => setOptionValue(value.id)}
        >
          <Icon name={value.icon}/>
          {value.name} ({formatPrice(value.price)})
        </div> );
    })} 
  </div>);


OrderOptionIcons.propTypes = {
  currentValue: PropTypes.string,
  required: PropTypes.bool,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
};
export default OrderOptionIcons;
  