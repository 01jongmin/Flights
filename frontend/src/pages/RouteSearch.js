import React from "react";
import { Table } from "antd";
import MenuBar from "../components/MenuBar";
import { getNumRoutes, getRoutes, getCountriesQuery, getAirportsFromCountry} from "../fetcher";
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
      countrySrc: "",
	  countryTgt: "",
	  citySrc: "",
	  cityTgt: "",
	  numRoutes: "",
	  routeOne: {},
	  routeTwo: {}
    };

	this.searchForRoute = this.searchForRoute.bind(this);
  }

  async searchForRoute() {
	await getNumRoutes(this.state.citySrc, this.state.cityTgt).then((res) => {
		console.log(res)
		if (res == null) {
			this.setState({numRoutes : 0})
		} else {
			this.setState({numRoutes : res[0].distance})
			console.log(this.state.numRoutes)
		}
	})
	if (this.state.numRoutes === 0) {
		return
	}
	if (this.state.numRoutes <= 2) {
		console.log('starting')
		await getRoutes(this.state.citySrc, this.state.numRoutes).then((res) => {
			if (this.state.numRoutes === 1) {
				this.setState({routeOne : {src: res[1].parent_airport_id, tgt: res[1].airport_id, rid: res[1].route_id}})
			} else {
				for (var i = 0; i < res.length; i++){
					if (res[i].airport_id == this.state.cityTgt) {
						this.setState({routeTwo: {src: res[i].parent_airport_id, tgt: res[i].airport_id, rid: res[i].route_id}})
					}
				  }
				  for (var j = 0; j < res.length; j++){
					if (res[j].airport_id == this.state.routeTwo.src && res[j].parent_airport_id == this.state.citySrc) {
						this.setState({routeOne: {src: res[j].parent_airport_id, tgt: res[j].airport_id, rid: res[j].route_id}})
					}
				  }
			}
			console.log('done')
		})
	}
  }

  componentDidMount() {
  }


  render() {

	const renderRoutes = () => {
		if (this.state.numRoutes >= 3) {
			return <h1>The shortest itinerary is {this.state.numRoutes} flights, and will not be displayed.</h1>
		} else if (this.state.numRoutes === 2) {
			return (
				<div class = 'container'>	
				<div class = 'row'>
					<div class = 'col'>
						<h3>From: {this.state.routeOne.src} </h3>
					</div>
					<div class = 'col'>
						<h3>Using: {this.state.routeOne.rid} </h3>
					</div>
					<div class = 'col'>
						<h3>To: {this.state.routeOne.tgt} </h3>
					</div>
				</div>
				<div class = 'row'>
					<div class = 'col'>
						<h3>From: {this.state.routeTwo.src} </h3>
					</div>
					<div class = 'col'>
						<h3>Using: {this.state.routeTwo.rid} </h3>
					</div>
					<div class = 'col'>
						<h3>To: {this.state.routeTwo.tgt} </h3>
					</div>
				</div>
				</div>
			)
		} else if (this.state.numRoutes === 1) {
			return (
				<div class = 'row'>
					<div class = 'col'>
						<h3>From: {this.state.routeOne.src} </h3>
					</div>
					<div class = 'col'>
						<h3>Using: {this.state.routeOne.rid} </h3>
					</div>
					<div class = 'col'>
						<h3>To: {this.state.routeOne.tgt} </h3>
					</div>
				</div>
			)
		} else if (this.state.numRoutes === 0) {
			return <h1> No routes! </h1>
		} else {
			return 
		}
	}
    return (
      <div>
        <MenuBar />

        <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
          <h3>Search for Itinerary</h3>
<div class = 'container'>
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
            loadOptions={(inputValue) => getCountriesQuery(inputValue)}
            onChange={(value, option) => this.setState({countryTgt: value.value})}
            placeholder="Target Country"
          />
		  </div>
		  </div>
		  <div class = 'row'> 
		  <div class = 'col'>
		  <AsyncSelect
            className="select-search"
            loadOptions={(inputValue) => getAirportsFromCountry(this.state.countrySrc, inputValue)}
            onChange={(value, option) => this.setState({citySrc: value.value})}
            placeholder="Source Airport"
          />
		  </div>
		  <div class = 'col'>
          <AsyncSelect
            className="select-search"
            loadOptions={(inputValue) => getAirportsFromCountry(this.state.countryTgt, inputValue)}
            onChange={(value, option) => this.setState({cityTgt: value.value})}
            placeholder="Target Airport"
          />
		  </div>
		</div>
		{/* <div class = 'row'> */}
			<div class ='text-center' >
			<button onClick={this.searchForRoute}>Search</button>
			</div>
		{/* </div> */}
		</div>
		{renderRoutes()}
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
