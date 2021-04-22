import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderOption.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({currentValue, setOptionValue}) => {  
  return ( 
    <DatePicker 
      
      
      selected={currentValue}      
      onChange={(date) => setOptionValue(date)}
    />
  );
};
OrderOptionDate.propTypes = {
  currentValue: PropTypes.instanceOf(Date),
  setOptionValue: PropTypes.func,  
};
export default OrderOptionDate;