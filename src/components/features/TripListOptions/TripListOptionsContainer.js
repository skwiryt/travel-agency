import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllRegions} from '../../../redux/regionsRedux';
import {getAllFilters, 
  changeSearchPhrase,
  changeDurationFrom,
  changeDurationTo,
  addTagFilter,
  removeTagFilter,
  addRegionFilter,
  removeRegionFilter,
} from '../../../redux/filtersRedux';



const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
  regions: getAllRegions(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeDurationFrom: from => dispatch(changeDurationFrom(from)),
  changeDurationTo: to => dispatch(changeDurationTo(to)),
  addTagFilter: tag => dispatch(addTagFilter(tag)),
  removeTagFilter: tag => dispatch(removeTagFilter(tag)),
  addRegionFilter: tag => dispatch(addRegionFilter(tag)),
  removeRegionFilter: tag => dispatch(removeRegionFilter(tag)), 

});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
