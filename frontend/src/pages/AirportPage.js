import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirportsFromAlliance, getAirlinesFromAlliance, getCountryFromCountryCode, getLandmarks } from "../fetcher";
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
	}
];


class AirportPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			landmarks: [],
			countryName: [],
            selectedAirportName: window.location.href.split('=')[1].split('&')[0],
			selectedAirportIATA: window.location.href.split('=')[2].split('&')[0],
			selectedAirportCountry: window.location.href.split('=')[3].split('&')[0],
			selectedAirportIso: window.location.href.split('=')[4]
		};
        //this.goToAirline = this.goToAirline.bind(this);
	}

    //goToAirline(allianceId) {
		//window.location = `/airline?id=${allianceId}`;
    //}

	componentDidMount() {

		getCountryFromCountryCode(this.state.selectedAirportCountry).then((res) => {
			this.setState({ countryName: res[0].name });
		});
		getLandmarks(this.state.selectedAirportCountry).then((res) => {
			console.log(this.state.selectedAirportCountry)
			this.setState({ landmarks: res });
		});

		// console.log(this.state.landmarks);
	}

	render() {
		return (
			<div>
				<MenuBar />
				
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

export default AirportPage;
