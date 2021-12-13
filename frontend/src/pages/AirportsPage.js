import React from "react";
import { Table, Select, Slider } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirports } from "../fetcher";
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
			matchesResults: [],
			matchesPageNumber: 1,
			matchesPageSize: 10,
			playersResults: [],
			pagination: null,
			ratingHighQuery: 100,
            ratingLowQuery: 0,
		};

		this.leagueOnChange = this.leagueOnChange.bind(this);
		this.goToAirport = this.goToAirport.bind(this);
		this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
	}

	goToAirport(airportId, airportIata, airportCountry, airportIso) {
		window.location = `#/airport?id=${airportId}&iata=${airportIata}&country=${airportCountry}&iso=${airportIso}`;
	}


	handleTemperatureChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

	leagueOnChange(value) {
		// TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
		// then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
		getAirports().then((res) => {
			this.setState({ airports: res });
		});
	}

	componentDidMount() {
		getAirports(1, 100000).then((res) => {
			this.setState({ airports: res });
		});
	}

	render() {
		return (
			<div>
				<MenuBar />
				
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Airports</h3>
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
					<label class="d-flex justify-content-center">Temperature</label>
                    <Slider range defaultValue={[50, 100]} onChange={this.handleTemperatureChange} style={{ width: '50vw', margin: '0 auto' }}/>
				</div>
			</div>
		);
	}
}

export default AirportsPage;
