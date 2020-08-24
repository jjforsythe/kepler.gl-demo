import React, { Component } from 'react';
import KeplerGl from 'kepler.gl';

import { connect } from 'react-redux'

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import {addDataToMap} from 'kepler.gl/actions';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
    componentDidMount() {
        fetch('http://localhost:8081/api/data')
            .then(response => response.json())
            .then(data =>
                this.props.dispatch(
                    addDataToMap(data)
                )
            );

        // Load empty object to avoid UI pop-up while async API call is made
        this.props.dispatch(
            addDataToMap({})
        );
    }

    render () {
        return (
            <div style={{position: "absolute", width: "100vw", height: "100vh"}}>
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
