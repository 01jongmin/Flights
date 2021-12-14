import React from "react";
import { Table } from "antd";
import MenuBar from "../components/MenuBar";
import { getNumRoutes, getRoutes, getCountriesQuery, getAirportsFromCountry, getAirportsFromId, getRouteFromId, getAirlineFromId, getPlanes} from "../fetcher";
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
	  routeTwo: {},
	  intermediate: {}
    };

	this.searchForRoute = this.searchForRoute.bind(this);
	this.cleanRoutes = this.cleanRoutes.bind(this);
  }

  async searchForRoute() {
	await getNumRoutes(this.state.citySrc, this.state.cityTgt).then((res) => {
		if (res == null) {
			this.setState({numRoutes : 0})
		} else {
			this.setState({numRoutes : res[0].distance})
		}
	})
	if (this.state.numRoutes === 0) {
		return
	}
	if (this.state.numRoutes <= 2) {
		console.log('starting')
		await getRoutes(this.state.citySrc, this.state.numRoutes).then(async (res) => {
			if (this.state.numRoutes === 1) {
				for (var j = 0; j < res.length; j++){
				  if (res[j].airport_id == this.state.cityTgt && res[j].parent_airport_id == this.state.citySrc) {
					  this.setState({routeOne: {src: res[j].parent_airport_id, tgt: res[j].airport_id, rid: res[j].route_id}})
					  var json = {}
					  console.log(this.state.routeOne)
					  await this.cleanRoutes(this.state.routeOne).then((res) => {
						  json = res
					  })
					  this.setState({routeOne: json})
				  }
				}
			} else {
				for (var i = 0; i < res.length; i++){
					if (res[i].airport_id == this.state.cityTgt) {
						this.setState({routeTwo: {src: res[i].parent_airport_id, tgt: res[i].airport_id, rid: res[i].route_id}})
						this.setState({intermediate: {src: res[i].parent_airport_id, tgt: res[i].airport_id, rid: res[i].route_id}})
						var json = {}
						await this.cleanRoutes(this.state.routeTwo).then((res) => {
							json = res
						})
						this.setState({routeTwo: json})
						break
					}
				  }
				  for (var j = 0; j < res.length; j++){
					  console.log(this.state.intermediate)
					if (res[j].airport_id == this.state.intermediate.src && res[j].parent_airport_id == this.state.citySrc) {
						this.setState({routeOne: {src: res[j].parent_airport_id, tgt: res[j].airport_id, rid: res[j].route_id}})
						var json = {}
						console.log(this.state.routeOne)
						await this.cleanRoutes(this.state.routeOne).then((res) => {
							json = res
						})
						this.setState({routeOne: json})
					}
				  }
			}
		})
	}
  }

  async cleanRoutes(input) {
	var ret = {}
	var pid = 0
	var plane = 0
	await getAirportsFromId(input.src).then((res) => {
		ret.src = res[0].name
	})
	await getAirportsFromId(input.tgt).then((res) => {
		ret.tgt = res[0].name
	})
	await getRouteFromId(input.rid).then((res) => {
		pid = res[0].airline_id
		plane = res[0].plane_id
	})
	await getAirlineFromId(pid).then((res) => {
		ret.airline = res[0].name
	})
	await getPlanes().then((res) => {
		if (plane === null) {
			ret.plane = 'Unavailable'
			return
		}
		for (var i = 0; i < res.length; i++){
			if (res[i].iata == plane) {
				ret.plane = res[i].name
			}
		  }
	})
	return ret
  }

  componentDidMount() {
  }


  render() {

	const renderRoutes = () => {
		console.log(this.state.routeOne)
		if (this.state.numRoutes >= 3) {
			return <h1>The shortest itinerary is {this.state.numRoutes} flights, and will not be displayed.</h1>
		} else if (this.state.numRoutes === 2) {
			return (
				<div class = 'container'>	
				<div class = 'row'>
					<div class = 'col'>
						<h3>1. From: {this.state.routeOne.src} </h3>
					</div>
					<div class = 'col'>
						<h5>Using: {this.state.routeOne.airline} </h5>
						<h1 class = 'text-center'>✈️</h1>
						<h5>Plane: {this.state.routeOne.plane} </h5>
					</div>
					<div class = 'col'>
						<h3>To: {this.state.routeOne.tgt} </h3>
					</div>
				</div>
				<div class = 'row'>
					<div class = 'col'>
						<h3>2. From: {this.state.routeTwo.src} </h3>
					</div>
					<div class = 'col'>
						<h5>Using: {this.state.routeTwo.airline} </h5>
						<h1 class = 'text-center'>✈️</h1>
						<h5>Plane: {this.state.routeTwo.plane} </h5>
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
						<h5>Using: {this.state.routeOne.airline} </h5>
						<h1 class = 'text-center'>✈️</h1>
						<h5>Plane: {this.state.routeOne.plane} </h5>
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
