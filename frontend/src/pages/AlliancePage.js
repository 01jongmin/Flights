import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirportsFromAlliance, getAirlinesFromAlliance, getAlliances } from "../fetcher";
import { MapContainer } from "../components/GoogleMaps";
import { Map } from "google-maps-react";
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

class AlliancePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			airlines: [],
            airports: [],
            selectedAllianceName: window.location.href.split('=')[1],
            image: 'https://www.gannett-cdn.com/presto/2019/06/23/USAT/c3a9f051-bd6c-4b39-b5b9-38244deec783-GettyImages-932651818.jpg?width=660&height=517&fit=crop&format=pjpg&auto=webp',
		};
	}


	componentDidMount() {
		getAirlinesFromAlliance(this.state.selectedAllianceName, 100000, 1).then((res) => {
			this.setState({ airlines: res });
		});
        getAirportsFromAlliance(this.state.selectedAllianceName).then((res) => {
			this.setState({ airports: res });
		});
        getAlliances().then((res) => {
            for (var i = 0; i < res.length; i++){
                if (res[i].name === this.state.selectedAllianceName.replace('%20', ' ')){
                    this.setState ({image: res[i].image})
                }
              }
        });
	}

	render() {
		return (
			<div>
				<MenuBar />

                <div class="d-flex justify-content-center">
                    <br></br>
                <h1> {this.state.selectedAllianceName.replace('%20', ' ')}</h1>
                <br></br>
                </div>
				<div class = "d-flex justify-content-center"><img alt={this.state.image} height="100" src={this.state.image} /></div>
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Airlines</h3>
					<Table
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

export default AlliancePage;
