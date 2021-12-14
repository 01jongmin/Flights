import React from "react";
import { Table, Select, Slider } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirports, getAirportFromWeather } from "../fetcher";
import ReactCountryFlag from "react-country-flag"


const { Column, ColumnGroup } = Table;
const { Option } = Select;

const airportColumns = [
	{
		title: "Country",
		dataIndex: "country",
		key: "country",
		render: isoCode =>  <div><ReactCountryFlag countryCode={isoCode} /> {isoCode}</div>, 
		sorter: (a,b) => a.country.localeCompare(b.country)
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
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		sorter: (a, b) => a.name.localeCompare(b.name),
	},
	{
		title: "City",
		dataIndex: "city",
		key: "city",
	},
,
];


class AirportsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			airports: [],
			airportsFiltered: [],
			matchesResults: [],
			matchesPageNumber: 1,
			matchesPageSize: 10,
			playersResults: [],
			pagination: null,
			tempLowQuery: -20,
            tempHighQuery: 45,
		};

		this.goToAirport = this.goToAirport.bind(this);
		this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
		this.filterByTemperature = this.filterByTemperature.bind(this)
	}

	goToAirport(airportId, airportIata, airportCountry, airportIso) {
		window.location = `#/airport?id=${airportId}&iata=${airportIata}&country=${airportCountry}&iso=${airportIso}`;
	}

	handleTemperatureChange(value) {
        this.setState({ tempLowQuery: value[0] })
        this.setState({ tempHighQuery: value[1] })
    }

	componentDidMount() {
		getAirports(1, 100000).then((res) => {
			this.setState({ airports: res });
		});
	}

	async filterByTemperature() {
		getAirports(1, 100000).then((res) => {
			this.setState({ airports: res });
		});
		await getAirportFromWeather(this.state.tempLowQuery, this.state.tempHighQuery).then((res2) => {
			this.setState({ airportsFiltered: res2 });
			console.log(this.state.airportsFiltered);
		});

		

		var temp = [];
		var index = 0;
		for (var i = 0; i < this.state.airports.length; i++) {
			for (var j = 0; j < this.state.airportsFiltered.length; j++) {
				if (this.state.airports[i].id === this.state.airportsFiltered[j].airport_id) {
					temp[index] = this.state.airports[i];
					index++;
				}
			}
		}

		// this.state.airports.forEach((airport) => {
		// 	this.state.airportsFiltered.forEach((fairport) => {
		// 		if (airport.id === fairport.airport_id) {
		// 			temp[index] = airport;
		// 			index++;
		// 			console.log(index);
		// 		}
		// 	})
		// })
		this.setState({airports: temp});
		//console.log(this.state.tempLowQuery);
		//console.log(this.state.tempHighQuery);
	  }

	render() {
		return (
			<div>
				<MenuBar />
				
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Airports</h3>
					Click on an Airport row to learn more
					<Table
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									this.goToAirport(record.name, record.iata, record.country, record.iso);
								}, 
							};
						}}
						dataSource={this.state.airports}
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
					<label class="d-flex justify-content-center">Temperature (°C)</label>
                    <Slider range defaultValue={[-20, 45]} onChange={this.handleTemperatureChange} style={{ width: '50vw', margin: '0 auto' }} min={-20} max={45}/>
					<br></br>
					<div class ='text-center' >
					<button onClick={this.filterByTemperature}>Apply</button>
					</div>
				</div>
			</div>
		);
	}
}
  
export default AirportsPage;
