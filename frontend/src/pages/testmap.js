import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Circle } from "react-google-maps";
import { getAirportsFromAlliance } from "../fetcher";

const Map = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={5}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {props.marks.map((mark, index) => (
                <Circle
                    key={index}
                    center={mark}
                    radius={1000}
                    options={{
                        strokeColor: "#66009a",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: `#66009a`,
                        fillOpacity: 0.35,
                        zIndex: 1
                    }}
                />
            ))}
        </GoogleMap>
    ))
);

class ReportsPage extends Component {
    state = {
        marks: []
    };

    componentDidMount() { 
        getAirportsFromAlliance('OneWorld').then((res) => {
            for (var i = 0; i < res.length; i++){
                this.setState({ marks: [...this.state.marks, {lat: res[i].lat, lng: res[i].lon}] });
              }
            console.log(this.state.marks)
		});
    }


    render() {
        const { marks } = this.state;
        return (
            <div>
                <Map
                    googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyAK9NIuGRc17jZyiPZUtJOhdjaY4qB9lqs"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    marks={marks}
                />;
            </div>
        );
    }
}

export default ReportsPage;