import React from "react";
import { Table } from "antd";
import MenuBar from "../components/MenuBar";
import { getAlliances, getCountriesQuery, getAirportsFromCountry} from "../fetcher";
import Select from "react-select";
import "./Dropdown.css";
import AsyncSelect from "react-select/async";

const { Column, ColumnGroup } = Table;
// const { Option } = Select;

const allianceColumns = [
  {
    dataIndex: "image",
    key: "Image",
    render: (theImageURL) => (
      <img alt={theImageURL} height="100" src={theImageURL} />
    ),
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
  },
];

class RouteSearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryOptions: [],
      alliances: [],
      countrySrc: "",
	  countryTgt: "",
	  citySrc: "",
	  cityTgt: ""
    };

    this.goToAlliance = this.goToAlliance.bind(this);
  }

  goToAlliance(allianceId) {
    window.location = `#/alliance?id=${allianceId}`;
  }

  getCountryA(countryA) {
    this.countryA = countryA;
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
    // getCountriesQuery("").then((res) => {
    //   for (var i = 0; i < res.length; i++) {
    //     this.setState({
    //       countryOptions: [
    //         ...this.state.countryOptions,
    //         { value: res[i].value, label: res[i].name },
    //       ],
    //     });
    //   }
    //   console.log(this.state.countryOptions);
    // });
  }


  render() {
    return (
      <div>
        <MenuBar />

        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
          <h3>Search for Itinerary</h3>

		<div class = 'row'>
			<div class = 'col'>
          <AsyncSelect
            className="select-search"
            loadOptions={(inputValue) => getCountriesQuery(inputValue)}
            onChange={(value, option) => this.setState({countrySrc: value.value})}
            placeholder="Source Country"
          />
		  </div>
		  <div class = 'col'>
          <AsyncSelect
            className="select-search"
            loadOptions={(inputValue) => getAirportsFromCountry(this.state.countrySrc, inputValue)}
            onChange={(value, option) => this.setState({citySrc: value.value})}
            placeholder="Source Country"
          />
		  </div>
		  <div class = 'col'>
          <AsyncSelect
            className="select-search"
            loadOptions={(inputValue) => getCountriesQuery(inputValue)}
            onChange={(value, option) => this.setState({countryTgt: value.value})}
            placeholder="Target Country"
          />
		  </div>
		  <div class = 'col'>
          <AsyncSelect
            className="select-search"
            loadOptions={(inputValue) => getAirportsFromCountry(this.state.countryTgt, inputValue)}
            onChange={(value, option) => this.setState({cityTgt: value.value})}
            placeholder="Source Country"
          />
		  </div>
		</div>
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
