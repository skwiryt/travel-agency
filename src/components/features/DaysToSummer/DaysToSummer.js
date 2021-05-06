import React from 'react';
import styles from './DaysToSummer.scss';
import PropTypes from 'prop-types';

class DaysToSummer extends React.Component {
  static propTypes = {
    description: PropTypes.string,
  }
  countDays() {    
    const currentLocalTime = new Date();
    const nowUTC = Date.UTC(
      currentLocalTime.getUTCFullYear(),
      currentLocalTime.getUTCMonth(),
      currentLocalTime.getUTCDate(),
      0, 0, 0, 0);
    let startUTC = Date.UTC(currentLocalTime.getUTCFullYear(), 5, 21, 0, 0, 0, 0);
    const endUTC = Date.UTC(currentLocalTime.getUTCFullYear(), 8, 23, 0, 0, 0, 0);
    const isSummer = nowUTC >= startUTC && nowUTC <= endUTC;
    if (isSummer) {
      return 0;
    }
    const isAfterSummer = nowUTC > startUTC;
    if (isAfterSummer) {
      startUTC = Date.UTC(currentLocalTime.getUTCFullYear() + 1, 5, 21, 0, 0, 0, 0);
    }    
    const toSummer = startUTC - nowUTC;    
    return toSummer/(1000 * 24 * 60 * 60);

  }
  render = () => {
    const {description} = this.props;
    const days = this.countDays();
    const message = days > 0 ? 
      (days > 1 ? `${days} days ${description}` : `${days} day ${description}`)
      : '';
    return (
      <div className={styles.component}>
        <p className={styles.summerInfo}>
          {message}
        </p>
      </div>
    );
  }
}


export default DaysToSummer;