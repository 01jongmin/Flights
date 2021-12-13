import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirportsFromCountryStandard, getCountryFromCountryCode, getLandmarks, getDestinationsFromCountry, getPlanespotting } from "../fetcher";
import ReactCountryFlag from "react-country-flag"
const { Column, ColumnGroup } = Table;
const { Option } = Select;

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

const airportColumns = [
	{
		title: "Airport name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "City",
		dataIndex: "city",
		key: "city",
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
		title: "Latitude",
		dataIndex: "lat",
		key: "lat",
	},
    {
		title: "Longitude",
		dataIndex: "lon",
		key: "lon",
	},
    {
		title: "ALT",
		dataIndex: "alt",
		key: "alt",
	},
];

const destinationColumns = [
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

const planespottingColumns = [
	{
		title: "Manufacturer",
		dataIndex: "mft",
		key: "mft",
	},
	{
		title: "Total number of planes",
		dataIndex: "total",
		key: "total",
        sorter: {
            compare: (a, b) => a.total - b.total,
          },
	},
	{
		title: "Name of airport",
		dataIndex: "name",
		key: "name",
	},
];

class CountryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			landmarks: [],
			countryName: [],
			latLng: [],
            planespotting: [],
            airports: [],
            destinations: [],
			selectedAirportCountry: window.location.href.split('=')[1].split('&')[0],
		};
        //this.goToAirline = this.goToAirline.bind(this);
	}

    //goToAirline(allianceId) {
		//window.location = `/airline?id=${allianceId}`;
    //}

	componentDidMount() {
        getDestinationsFromCountry(this.state.selectedAirportCountry).then((res) => {
            this.setState({destinations: res})
        })
        getPlanespotting(this.state.selectedAirportCountry).then((res) => {
            this.setState({planespotting: res})
        })
        getAirportsFromCountryStandard(this.state.selectedAirportCountry, "").then((res) => {
            this.setState({airports: res})
        })
		getCountryFromCountryCode(this.state.selectedAirportCountry).then((res) => {
			this.setState({ countryName: res[0].name });
		});
		getLandmarks(this.state.selectedAirportCountry).then((res) => {
			console.log(this.state.selectedAirportCountry)
			this.setState({ landmarks: res });
		});
		// console.log(this.state.landmarks);
        console.log(this.state.airports)
	}

	render() {
		return (
			<div>
				<MenuBar />
				
				<div class="d-flex justify-content-center">
                    <br></br>
                	<h1> {this.state.countryName}</h1>
                </div>

				<div class="d-flex justify-content-center">
                	<br></br>
					{/* <h5> {this.state.countryName} </h5> */}
					<div><ReactCountryFlag countryCode={this.state.selectedAirportCountry} style={{
                    fontSize: '5em',
                    // lineHeight: '3em',
                }}/></div> 
                </div>
                <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Airports</h3>
					<Table
						//onRow={(record, rowIndex) => {
							//return {
								//onClick: (event) => {
									//this.goToAirline(record.name);
								//}, 
							//};
						//}}
						dataSource={this.state.airports}
						columns={airportColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>
                <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Destinations</h3>
					<Table
						//onRow={(record, rowIndex) => {
							//return {
								//onClick: (event) => {
									//this.goToAirline(record.name);
								//}, 
							//};
						//}}
						dataSource={this.state.destinations}
						columns={destinationColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>
                <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Planespotting Areas</h3>
					<Table
						//onRow={(record, rowIndex) => {
							//return {
								//onClick: (event) => {
									//this.goToAirline(record.name);
								//}, 
							//};
						//}}
						dataSource={this.state.planespotting}
						columns={planespottingColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
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
            </div>
		);
	}
}

export default CountryPage;
