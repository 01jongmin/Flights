import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAirportsFromAlliance, getAirlinesFromAlliance } from "../fetcher";
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
		};
        this.goToAirline = this.goToAirline.bind(this);
	}

    goToAirline(allianceId) {
		window.location = `/airline?id=${allianceId}`;
    }

	componentDidMount() {
		getAirlinesFromAlliance(this.state.selectedAllianceName, 100000, 1).then((res) => {
			this.setState({ airlines: res });
		});
        getAirportsFromAlliance(this.state.selectedAllianceName).then((res) => {
			this.setState({ airports: res });
		});
	}

	render() {
		return (
			<div>
				<MenuBar />
				
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

export default AlliancePage;
