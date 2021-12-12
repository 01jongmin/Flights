import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirports } from "../fetcher";
import ReactCountryFlag from "react-country-flag"


const { Column, ColumnGroup } = Table;
const { Option } = Select;

const airportColumns = [
	{
		dataIndex: "country",
		key: "country",
		render: isoCode =>  <ReactCountryFlag countryCode={isoCode} />

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
	{
		title: "Country",
		dataIndex: "country",
		key: "country",
	}
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
		};

		this.leagueOnChange = this.leagueOnChange.bind(this);
		this.goToMatch = this.goToMatch.bind(this);
	}

	goToMatch(matchId) {
		window.location = `/matches?id=${matchId}`;
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
						dataSource={this.state.airports}
						columns={airportColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>
	
			</div>
		);
	}
}

export default AirportsPage;
