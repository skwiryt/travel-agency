import React from 'react';
import PropTypes from 'prop-types';

const ActivatedFormInfo = ({contactValid, nameValid}) => {
  if (contactValid && nameValid) {
    return (
      <div>
        <p>This order has been sent.</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Both, contact and your name must be given.</p>
      </div>
    );
  }


};

ActivatedFormInfo.propTypes = {
  contactValid: PropTypes.bool,

};

export default ActivatedFormInfo;


