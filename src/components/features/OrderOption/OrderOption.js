import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OderOptionDate';


const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  
  if (!OptionComponent) {
    return null;
  } else {
    return   (
      <div className={styles.component} >
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent 
          {...otherProps} 
          setOptionValue={value => setOrderOption({[id]: value})}
        />
      </div>);
  }
  
  // return null;
};

OrderOption.propTypes = {
  name: PropTypes.string,
};

export default OrderOption;