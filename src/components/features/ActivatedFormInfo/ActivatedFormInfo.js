import React from 'react';
import PropTypes from 'prop-types';


const ActivatedFormInfo = (props) => {
  const {contactValid, nameValid} = props;
  
  if (contactValid && nameValid) {
    return (
      <div>
        <p>This order has been sent.</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Both, contact and your name must be given. {props.contactValid} {props.nameValid}</p>
      </div>
    );
  }


};

ActivatedFormInfo.propTypes = {
  contactValid: PropTypes.bool,

};

export default ActivatedFormInfo;


