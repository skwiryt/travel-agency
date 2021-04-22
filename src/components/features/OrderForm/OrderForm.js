import OrderSummary from '../OrderSummary/OrderSummary';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Col, Row} from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({tripCost, options, setOrderOption}) => (
  <div className={styles.component}>
    <div className={styles.orderOptions}>
      <Row>
        {
          pricing.map(option => (
            <Col key={option.id} md={4} >
              <OrderOption 
                {...option} 
                currentValue={options[option.id]}
                setOrderOption={setOrderOption}
              />
            </Col>
          ))
        }
      </Row>
    </div>
    <Row>
      <Col xs={12} >
        <OrderSummary tripCost={tripCost} options={options}/>
      </Col>
    </Row>
  </div>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
