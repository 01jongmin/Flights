import React from "react";
import { Table, Select } from "antd";
import MenuBar from "../components/MenuBar";
import { getAlliances, getCountriesQuery } from "../fetcher";
import SelectSearch from 'react-select-search';
import './Dropdown.css'; 


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

class RouteSearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alliances: [],
            countryA: ""
		};
		
		this.goToAlliance = this.goToAlliance.bind(this);

	}

	goToAlliance(allianceId) {
		window.location = `#/alliance?id=${allianceId}`;
	}

    getCountryA(countryA) {
        this.countryA = countryA
    }
    
	// leagueOnChange(value) {
	// 	// TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
	// 	// then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
	// 	getAlliances().then((res) => {
	// 		this.setState({ alliances: res });
	// 	});
	// }

    countryAOnChange(value) {
		// TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
		// then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
		// console.log()
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
					<h3>Search for Itinerary</h3>
                   
                    <SelectSearch className="select-search"
        options={[]}
        value="15997"
        getOptions={(query) => {
            console.log(query)
            return getCountriesQuery(query)
        }}
        // onFocus = {(query) => {
        //     console.log(query)
        // }}
        onChange={(value, option) => console.log(value)}
        search
        placeholder="Source Country"
        // onChange={this.countryAOnChange}
    />

					{/* <Table
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
					/> */}
				</div>
			</div>
		);
	}
}

export default RouteSearchPage;
