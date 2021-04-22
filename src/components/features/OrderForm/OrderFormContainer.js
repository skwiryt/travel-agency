import OrderForm from './OrderForm';
import {connect} from 'react-redux';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';

const mapStateToProps = (state) => (
  {
    options: getOrderOptions(state),
  });

const mapDispatcherToProps = (dispatcher) => (
  {
    setOrderOption: payload => dispatcher(setOrderOption(payload)),
  }
);

export default connect(mapStateToProps, mapDispatcherToProps)(OrderForm);