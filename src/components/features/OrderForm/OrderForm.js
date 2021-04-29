import OrderSummary from '../OrderSummary/OrderSummary';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Col, Row} from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
// import ActivatedFormInfo from '../ActivatedFormInfo/ActivatedFormInfo';

const sendOrder = (options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

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
    <Row>
      <Col xs={12} >
        <Button onClick={() => sendOrder(options, tripCost)}>Order now!</Button>
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
