import React from "react";
import { Table, Select } from "antd";

import MenuBar from "../components/MenuBar";
import { getAlliances } from "../fetcher";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const allianceColumns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "Name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "Image",
  },
];

class HomePage extends React.Component {
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
				<div class="d-flex justify-content-center">
				<div class="d-flex-column">

				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
				<svg id="FlightIcon" enable-background="new 0 0 512 512" height="200" viewBox="0 0 512 512" width="200" xmlns="http://www.w3.org/2000/svg"><g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#FF8A65" stroke="#FF5722">
<path d="M2230 5104 c-996 -127 -1833 -835 -2123 -1794 -78 -256 -107 -462
-107 -750 0 -491 116 -914 363 -1325 404 -672 1099 -1123 1877 -1220 162 -20
478 -20 640 0 1001 124 1842 831 2133 1795 78 256 107 462 107 750 0 491 -116
914 -363 1325 -404 672 -1099 1123 -1877 1220 -153 19 -501 18 -650 -1z m388
-996 c17 -40 39 -103 50 -139 44 -142 82 -456 82 -668 l0 -96 193 -182 192
-181 26 24 c68 65 182 46 224 -37 9 -16 19 -78 24 -140 6 -70 14 -116 23 -124
7 -6 137 -127 289 -268 l276 -257 7 -106 c4 -58 6 -108 3 -110 -2 -2 -286 134
-631 302 -346 168 -629 304 -631 302 -1 -2 -19 -223 -39 -493 -20 -269 -38
-501 -40 -515 -4 -22 20 -45 200 -189 140 -114 203 -170 200 -180 -3 -9 -8
-37 -12 -64 -3 -26 -7 -47 -8 -47 -1 0 -96 32 -211 70 -275 92 -273 92 -556 4
-117 -36 -219 -69 -227 -71 -11 -5 -12 6 -6 58 3 35 10 71 15 79 4 8 95 80
203 160 156 116 194 149 191 165 -2 11 -17 240 -32 508 -27 478 -28 488 -48
484 -11 -3 -296 -127 -634 -276 -338 -149 -616 -270 -618 -267 -2 2 2 46 9 97
l13 94 280 264 280 264 -3 116 c-4 108 -2 118 20 151 15 21 41 42 70 54 41 17
53 18 87 8 21 -7 52 -26 69 -43 l31 -31 199 186 199 186 6 159 c12 300 64 548
159 753 17 37 34 68 39 68 4 0 21 -33 37 -72z"/>
</g>
</g></svg>
			</div>
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
					<h3>Welcome to FlightFinder</h3>
					
					There are XX flights, XX planes, XX alliances, XX landmarks available for perusal. 

				</div>

				
				<div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
				<a href="https://api.flights-550.net/api/index.html" target="_blank" class="btn btn-primary btn-lg" role="button" aria-pressed="true">See Auto-Generated API Documentation</a>

				</div>
			</div>
			</div>
			</div>
		);
	}
}

export default HomePage;