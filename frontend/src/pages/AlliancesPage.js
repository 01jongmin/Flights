import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAlliances } from "../fetcher";
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
						dataSource={this.state.alliances}
						columns={allianceColumns}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					/>
				</div>
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
					<h3>Matches</h3>
					<Select
						defaultValue="D1"
						style={{ width: 120 }}
						onChange={this.leagueOnChange}
					>
						{/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
						<Option value="D1">Bundesliga</Option>
						<Option value="SP1">La Liga</Option>
						<Option value="F1">Ligue 1</Option>
						<Option value="I1">Serie A</Option>
						<Option value="E0">Premier League</Option>
					</Select>

					<Table
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									this.goToMatch(record.MatchId);
								}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
							};
						}}
						dataSource={this.state.matchesResults}
						pagination={{
							pageSizeOptions: [5, 10],
							defaultPageSize: 5,
							showQuickJumper: true,
						}}
					>
						<ColumnGroup title="Teams">
							{/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
							<Column
								title="Home"
								dataIndex="Home"
								key="Home"
								sorter={(a, b) => a.Home.localeCompare(b.Home)}
							/>
							<Column
								title="Away"
								dataIndex="Away"
								key="Away"
								sorter={(a, b) => a.Away.localeCompare(b.Away)}
							/>
						</ColumnGroup>
						<ColumnGroup title="Goal">
							{/* TASK 5: add columns for home and away goals in this ColumnGroup, with the ability to sort values in these columns numerically */}
							<Column
								title="Home Goals"
								dataIndex="HomeGoals"
								key="HomeGoals"
								sorter={(a, b) => a.HomeGoals - b.HomeGoals}
							/>
							<Column
								title="Away Goals"
								dataIndex="AwayGoals"
								key="AwayGoals"
								sorter={(a, b) => a.AwayGoals - b.AwayGoals}
							/>
						</ColumnGroup>
						{/* TASK 6: create two columns (independent - not in a column group) for the date and time. Do not add a sorting functionality */}
						<Column title="Date" dataIndex="Date" key="Date" />
						<Column title="Time" dataIndex="Time" key="Time" />
					</Table>
				</div>
			</div>
		);
	}
}

export default AlliancesPage;
