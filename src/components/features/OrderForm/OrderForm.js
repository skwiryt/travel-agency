import OrderSummary from '../OrderSummary/OrderSummary';
import React from 'react';
import PropTypes from 'prop-types';
// import styles from './OrderForm.scss';
import {Col, Row} from 'react-flexbox-grid';

const OrderForm = props => (
  <Row>
    <Col xs={12} >
      <OrderSummary tripCost={props.tripCost} options={props.options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;
