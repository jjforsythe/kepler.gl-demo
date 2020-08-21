import React, { Component } from 'react';
import KeplerGl from 'kepler.gl';

import { connect } from 'react-redux'

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import {addDataToMap} from 'kepler.gl/actions';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const sampleTripData = {
 fields: [
   {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
   {name: 'pickup_longitude', format: '', type: 'real'},
   {name: 'pickup_latitude', format: '', type: 'real'}
 ],
 rows: [
   ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
   ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
   ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576],
 ]
};


const sampleConfig = {
  visState: {
    filters: [
      {
        id: 'me',
        dataId: 'test_trip_data',
        name: 'tpep_pickup_datetime',
        type: 'timeRange',
        enlarged: true
      }
    ]
  }
}

class App extends Component {
    componentDidMount() {
        // call fetch API to get data here
        this.props.dispatch(
            addDataToMap({
                datasets: {
                    info: {
                        label: 'Sample Taxi Trips in New York City',
                        id: 'test_trip_data'
                    },
                    data: sampleTripData
                },
                option: {
                    centerMap: true,
                    readOnly: false,
                    keepExistingConfig: false
                },
                info: {
                    title: 'Taro and Blue',
                    description: 'This is my map'
                },
                config: sampleConfig
            })
        );
    }

    render () {
        return (
            <div style={{position: "absolute", width: "100%", height: "100%"}}>
              <AutoSizer>
                {({height, width}) => (
                    <KeplerGl
                      mapboxApiAccessToken={MAPBOX_TOKEN}
                      id="map"
                      width={width}
                      height={height}
                    />
                )}
              </AutoSizer>
            </div>
        );
    }
}

// export default App;

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
