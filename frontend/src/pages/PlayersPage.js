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

import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Divider,
  Slider,
  Rate,
} from "antd";
import { RadarChart } from "react-vis";
import { format } from "d3-format";

import MenuBar from "../components/MenuBar";
import { getPlayerSearch, getPlayer } from "../fetcher";
const wideFormat = format(".3r");

class PlayersPage extends React.Component {
  render() {
    return (
      <div>
        <h1> Player </h1>
      </div>
    );
  }
}

export default PlayersPage;
