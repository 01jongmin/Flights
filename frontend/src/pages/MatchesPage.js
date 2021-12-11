import React from "react";
import {
	Form,
	FormInput,
	FormGroup,
	Button,
	Card,
	CardBody,
	CardTitle,
	Progress,
} from "shards-react";

import { Table, Row, Col, Divider } from "antd";

import { getMatchSearch, getMatch } from "../fetcher";

import MenuBar from "../components/MenuBar";

const { Column, ColumnGroup } = Table;

class MatchesPage extends React.Component {
	render() {
		return (
			<div>
        <h1> Match </h1>
			</div>
		);
	}
}

export default MatchesPage;
