import React from "react";
import { Table, Select, Slider } from "antd";
import MenuBar from "../components/MenuBar";
import { getCountries } from "../fetcher";
import ReactCountryFlag from "react-country-flag"


const { Column, ColumnGroup } = Table;
const { Option } = Select;

const countryColumns = [
	{
		title: "Country",
		dataIndex: "name",
		key: "name",
		sorter: (a,b) => a.country.localeCompare(b.country)
	},
	{
		title: "Flag",
		dataIndex: "iso_code",
		key: "iso_code",
		render: iso_code =>  <div><ReactCountryFlag countryCode={iso_code} /> {iso_code}</div>, 
	}
];


class CountriesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			countries: [],
			airportsFiltered: [],
			matchesResults: [],
			matchesPageNumber: 1,
			matchesPageSize: 10,
			playersResults: [],
			pagination: null,
		};

		this.goToCountry = this.goToCountry.bind(this);
	}

	goToCountry(iso) {
		window.location = `#/country?id=${iso}`;
	}

	componentDidMount() {
		getCountries().then((res) => {
			this.setState({ countries: res });
		});
	}

	render() {
		return (
			<div>
				<MenuBar />
				
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Countries</h3>
					Click on an Country row to learn more
					<Table
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									this.goToCountry(record.iso_code);
								}, 
							};
						}}
						dataSource={this.state.countries}
						columns={countryColumns}
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
  
export default CountriesPage;
