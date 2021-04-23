import React from 'react';
import PropTypes from 'prop-types';
import styles from './TripListOptions.scss';

import {Row, Col} from 'react-flexbox-grid';

class TripListOptions extends React.Component {
  handleTags(tag, checked){
    if(checked) {
      console.log('Adding tag', tag);
      // TODO - use action dispatcher from props
      this.props.addTagFilter(tag);
    } else {
      console.log('Removing tag', tag);
      // TODO - use action dispatcher from props
      this.props.removeTagFilter(tag);
    }
  }

  handleRegions(region, checked){
    if(checked) {
      console.log('Adding region', region);
      // TODO - use action dispatcher from props
      this.props.addRegionFilter(region);
    } else {
      console.log('Removing region', region);
      // TODO - use action dispatcher from props
      this.props.removeRegionFilter(region);
    }
  }

  handleDuration(type, value){
    console.log('Changing duration', type, value);
    // TODO - use action dispatcher from props
    switch (type) {
      case 'to' :
        this.props.changeDurationTo(parseInt(value));
        break;
      case 'from' :
        this.props.changeDurationFrom(parseInt(value));
        break;
    }
  }

  handleSearch(phrase){
    this.props.changeSearchPhrase(phrase);
  }

  render(){
    const {tags, filters, regions} = this.props;
    return (
      <div className={styles.component}>
        <Row around="lg">
          <Col lg={3}>
            <div className={styles.filter}>
              <label>
                <input className={`${styles.input} ${styles.search}`} type='text' placeholder='Search...' value={filters.phrase} onChange={event => this.handleSearch(event.currentTarget.value)} />
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.filter}>
              <label>
                Duration from:
                <input className={`${styles.input} ${styles.number}`} type='number' value={filters.duration.from} min='1' max='14' onChange={event => this.handleDuration('from', event.currentTarget.value)} />
              </label>
              <label>
                to:
                <input className={`${styles.input} ${styles.number}`} type='number' value={filters.duration.to} min='1' max='14' onChange={event => this.handleDuration('to', event.currentTarget.value)} />
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.filter}>
              <details>
                <summary className={styles.toggle}>Filter by tags</summary>
                <div className={styles.dropdown}>
                  {Object.keys(tags).map(tag => (
                    <label key={tag} className={styles.option}>
                      <input type='checkbox' checked={filters.tags.indexOf(tag) > -1} onChange={event => this.handleTags(tag, event.currentTarget.checked)} />
                      {tag}
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </Col>
          <Col lg={3}>
            <div className={styles.filter}>
              <details>
                <summary className={styles.toggle}>Choose region</summary>
                <div className={styles.dropdown}>
                  {Object.keys(regions).map(region => (
                    <label key={region} className={styles.option}>
                      <input type='checkbox' checked={filters.regions.indexOf(region) > -1} onChange={event => this.handleRegions(region, event.currentTarget.checked)} />
                      {region}
                    </label>
                  ))}
                </div>
              </details>
            </div>
          </Col>
        </Row>
        
      </div>
    );
  }
}

TripListOptions.propTypes = {
  tags: PropTypes.object,
  regions: PropTypes.object,
  filters: PropTypes.object,
  changeSearchPhrase: PropTypes.func,
  changeDurationFrom: PropTypes.func,
  changeDurationTo: PropTypes.func,
  addTagFilter: PropTypes.func,
  removeTagFilter: PropTypes.func,
  addRegionFilter: PropTypes.func,
  removeRegionFilter: PropTypes.func,
};

export default TripListOptions;
