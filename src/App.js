import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter,  Route} from 'react-router-dom';
import {AnimatedSwitch} from 'react-router-transition';
//import {AnimatedRoute} from 'react-router-transition';

import PropTypes from 'prop-types';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
// TODO - import other views
import Countries from './components/views/Countries/CountriesContainer';
import Regions from './components/views/Regions/RegionsContainer';
import Info from './components/views/Info/Info';
import NotFound from './components/views/NotFound/NotFound';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';
import Country from './components/views/Country/CountryContainer';
import Trip from './components/views/Trip/TripContainer';
import styles from './styles/App.scss';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  render(){
    const pageTransition = {
      atEnter: {
        opacity: 0,
        offset: 200,
      },
      atLeave: {
        opacity: 0,
        offset: -200,
      },
      atActive: {
        opacity: 1,
        offset: 0,
      },
    };
    return (
      <BrowserRouter>
        <MainLayout>              
          <AnimatedSwitch 
            // location={location}
            atEnter={pageTransition.atEnter}
            atLeave={pageTransition.atLeave}
            atActive={pageTransition.atActive}
            mapStyles={(styles) => ({
              opacity: styles.opacity,
              transform: `translateY(${styles.offset}px)`,
            })}
            className={styles.switchWrapper}
          >           
            <Route exact path='/' component={Home} />   
            <Route exact path='/countries' component={Countries} />
            <Route exact path='/regions' component={Regions} />
            <Route exact path='/country/:id' component={Country} />  
            <Route exact path='/trip/:id' component={Trip} />
            <Route exact path='/trips' component={Trips} />
            <Route exact path='/info' component={Info} />            
            <Route path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
