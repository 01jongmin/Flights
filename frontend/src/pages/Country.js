import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getDestinationsFromCountry } from "../fetcher";
import ReactCountryFlag from "react-country-flag"
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const allianceColumns = [
	{
		
		dataIndex: "image",
		key: "Image",
		render: theImageURL => <img alt={theImageURL} height="100" src={theImageURL} />
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "Name",
	},
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
	}
,
];

class AlliancesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alliances: [],
		};
		
		this.goToAlliance = this.goToAlliance.bind(this);
	}

	goToAlliance(allianceId) {
		window.location = `#/alliance?id=${allianceId}`;
	}

	leagueOnChange(value) {
		// TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
		// then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
		getAlliances().then((res) => {
			this.setState({ alliances: res });
		});
	}

	componentDidMount() {
		getAlliances().then((res) => {
			this.setState({ alliances: res });
		});
	}

	render() {
		return (
			<div>
				<MenuBar />
				
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Alliances</h3>
					<Table
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									this.goToAlliance(record.name);
								}, 
							};
						}}
						dataSource={this.state.alliances}
						columns={allianceColumns}
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

export default AlliancesPage;
