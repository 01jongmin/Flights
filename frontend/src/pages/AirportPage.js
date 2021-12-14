import React from "react";
import { Table, Select, Slider } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirports, getCountryFromCountryCode, getLandmarks, getAirportFromHourLimit, getAirportFromId } from "../fetcher";
import ReactCountryFlag from "react-country-flag"
import { withScriptjs, withGoogleMap, GoogleMap, Circle } from "react-google-maps";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const airportColumns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "City",
		dataIndex: "city",
		key: "city",
	},
	{
		title: "Country",
		dataIndex: "country",
		key: "country",
	},
	{
		title: "IATA",
		dataIndex: "iata",
		key: "iata",
	},
	{
		title: "ICAO",
		dataIndex: "icao",
		key: "icao",
	}
];

const landmarkColumns = [
	{
		title: "Landmark Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Image URL",
		dataIndex: "imageUrl",
		key: "imageUrl",
		render: theImageURL => <img alt={theImageURL} height="100" src={theImageURL} />
	}
];

const Map = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat:20, lng:20}}
			center = {props.marks[0]}
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


class AirportPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			airports:[],
			airportCodes: [],
			landmarks: [],
			countryName: [],
			latLng: [],
            selectedAirportName: window.location.href.split('=')[1].split('&')[0],
			selectedAirportIATA: window.location.href.split('=')[2].split('&')[0],
			selectedAirportCountry: window.location.href.split('=')[3].split('&')[0],
			selectedAirportId: window.location.href.split('=')[4],
			hourLimit: 20,
			isLoaded: false
		};
        //this.goToAirline = this.goToAirline.bind(this);
		this.handleDistanceChange = this.handleDistanceChange.bind(this)
		this.filterByDistance = this.filterByDistance.bind(this)
	}

    //goToAirline(allianceId) {
		//window.location = `/airline?id=${allianceId}`;
    //}

	handleDistanceChange(value) {
        this.setState({ hourLimit: value })
    }

	async componentDidMount() {
		var isDone = false;
		getCountryFromCountryCode(this.state.selectedAirportCountry).then((res) => {
			this.setState({ countryName: res[0].name });
		});
		getLandmarks(this.state.selectedAirportCountry).then((res) => {
			//console.log(this.state.selectedAirportCountry)
			this.setState({ landmarks: res });
		});
		getAirports(1, 1000000).then((res) => {
			for (var i = 0; i < res.length; i++){
				if (res[i].iata == this.state.selectedAirportIATA) {
                	this.setState({ latLng: [...this.state.latLng, {lat: res[i].lat, lng: res[i].lon}] });
				}
              }
			  //console.log(this.state.latLng)
		})
		
		
		await getAirportFromHourLimit(this.state.selectedAirportId, this.state.hourLimit).then((res) => {
			this.setState({ airportCodes: res });
			console.log(isDone);
			console.log(this.state.airportCodes);
			console.log(isDone);
			isDone = true;
			console.log(isDone);
		});
		
		if (isDone == true) {
			console.log(isDone);
			var temp = [];
			for (var i = 0; i < this.state.airportCodes.length; i++) {
				await getAirportFromId(this.state.airportCodes[i].target_id).then((res) => {
					temp[i] = res[0];
					console.log(temp);

				});
			}
			console.log("done looping");
			this.setState({ airportCodes: temp });
			console.log(this.state.airportCodes);
		}

		this.setState({isLoaded: true})
		
	}

	async filterByDistance() {
		this.setState({isLoaded: false})
		var isDone = false;
		console.log("filterbydistance");
		// FILL THIS IN ONLY AFTER CONFIRMING GETAIRPORTFROMHOURLIMIT WORKS CORRECTLY IN COMPONENTDIDMOUNT
		await getAirportFromHourLimit(this.state.selectedAirportId, this.state.hourLimit).then((res) => {
			this.setState({ airportCodes: res });
			console.log(isDone);
			console.log(this.state.airportCodes);
			console.log(isDone);
			isDone = true;
			console.log(isDone);
		});
		
		if (isDone == true) {
			console.log(isDone);
			var temp = [];
			for (var i = 0; i < this.state.airportCodes.length; i++) {
				await getAirportFromId(this.state.airportCodes[i].target_id).then((res) => {
					temp[i] = res[0];
					console.log(temp);

				});
			}
			console.log("done looping");
			this.setState({ airportCodes: temp });
			console.log(this.state.airportCodes);
		}
		this.setState({isLoaded: true})
	}

	render() {
		return (
			<div>
				<MenuBar />
				
				{ this.state.isLoaded ? null : <label class="d-flex justify-content-center">Loading</label> }

				<div class="d-flex justify-content-center">
                    <br></br>
                	<h1> {this.state.selectedAirportName.replaceAll(/%../ig, ' ')}</h1>
                </div>

				<div class="d-flex justify-content-center">
                	<br></br>
					<h3> {this.state.selectedAirportIATA }</h3>
                </div>

				<div class="d-flex justify-content-center">
                	<br></br>
					<h5> {this.state.countryName} </h5>
					<div><ReactCountryFlag countryCode={this.state.selectedAirportCountry}/></div> 
                </div>

				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Airports Reachable</h3>
					<Table
						dataSource={this.state.airportCodes}
						columns={airportColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>

				<div>
					<br></br>
					<label class="d-flex justify-content-center">Select Maximum Time Willing to Travel (Hours)</label>
                    <Slider defaultValue={30} onChange={this.handleDistanceChange} style={{ width: '50vw', margin: '0 auto' }} min={0} max={30}/>
					<br></br>
					<div class ='text-center' >
					<button onClick={this.filterByDistance}>Apply</button>
					</div>
				</div>

				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Landmarks</h3>
					<Table
						//onRow={(record, rowIndex) => {
							//return {
								//onClick: (event) => {
									//this.goToAirline(record.name);
								//}, 
							//};
						//}}
						dataSource={this.state.landmarks}
						columns={landmarkColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>
				<div>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK9NIuGRc17jZyiPZUtJOhdjaY4qB9lqs"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    marks={this.state.latLng}
                />;
            </div>
            </div>
		);
	}
}

export default AirportPage;
