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
import ActivatedFormInfo from '../ActivatedFormInfo/ActivatedFormInfo';



class OrderForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formActivated: false,
      contactValid: false,
      nameValid: false,
    };
  }
  validateForm = () => {
    const {contact, name} = this.props.options;
    const contactValid = contact.length > 5 ? true : false;
    const nameValid = name.length > 5 ? true : false;
    this.setState({
      formActivated: true,
      contactValid,
      nameValid,
    });
    return contactValid && nameValid;    
  }

  sendOrder = () => {
    const {options, tripCost, tripId, tripName} = this.props;
    if (this.validateForm()) {
      const totalCost = formatPrice(calculateTotal(tripCost, options));  
      const payload = {
        ...options,
        tripId,
        tripName,
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
    }
  };

  render() {
    const {tripCost, options, setOrderOption} = this.props;
    
    const message = this.state.formActivated ? (
      <Col xs={8} >
        <ActivatedFormInfo 
          contactValid={this.state.contactValid}
          nameValid={this.state.nameValid} />
      </Col>
    ) : '';
    return (
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
          <Col xs={4} >
            <Button onClick={() => this.sendOrder(options, tripCost)}>Order now!</Button>
          </Col>
          {message}
        </Row>
      </div>
    );
  }
  


}
  


OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
};

export default OrderForm;
