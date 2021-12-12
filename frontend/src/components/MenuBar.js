import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "shards-react";

class MenuBar extends React.Component {
  render() {
    return (
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/Flights/#/">CIS 550 FIFA</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/Flights/#/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/Flights/#/players">
              Players
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/Flights/#/matches">
              Matches
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MenuBar;
