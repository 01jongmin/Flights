import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirportsFromAlliance, getAirlinesFromAlliance, getCountryFromCountryCode } from "../fetcher";
import ReactCountryFlag from "react-country-flag"
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const airlineColumns = [
	{
		title: "Airline Name",
		dataIndex: "",
		key: "name",
	},
];

const airportColumns = [
	{
		title: "Airport Name",
		dataIndex: "",
		key: "name",
	},
];

class AirportPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			airlines: [],
            airports: [],
			countryName: [],
            selectedAirportName: window.location.href.split('=')[1].split('&')[0],
			selectedAirportIATA: window.location.href.split('=')[2].split('&')[0],
			selectedAirportCountry: window.location.href.split('=')[3].split('&')[0],
			selectedAirportIso: window.location.href.split('=')[4]
		};
        this.goToAirline = this.goToAirline.bind(this);
	}

    goToAirline(allianceId) {
		window.location = `/airline?id=${allianceId}`;
    }

	componentDidMount() {
		getCountryFromCountryCode(this.state.selectedAirportCountry).then((res) => {
			this.setState({ countryName: res[0].name });
		});

		console.log(this.state.countryName);
	}

	render() {
		return (
			<div>
				<MenuBar />
				
				<div class="d-flex justify-content-center">
                    <br></br>
                	<h1> {this.state.selectedAirportName.replaceAll('%20', ' ')}</h1>
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
					<h3>Airlines</h3>
					<Table
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									this.goToAirline(record.name);
								}, 
							};
						}}
						dataSource={this.state.airlines}
						columns={airlineColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>

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

export default AirportPage;
