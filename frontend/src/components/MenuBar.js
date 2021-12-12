import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "shards-react";


class MenuBar extends React.Component {
  render() {
    return (
      <Navbar type="dark" bg="dark" theme="primary" expand="md">
        <NavbarBrand href="/Flights#/"><svg id="FlightIcon" enable-background="new 0 0 512 512" height="30" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg"><g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
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
FlightFinder</NavbarBrand>
        <Nav navbar  className="container-fluid">
          {/* <NavItem>
            <NavLink active href="/Flights/#/">
              Home
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink active href="/Flights/#/alliances">
              Alliances
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/Flights/#/matches">
              Matches
            </NavLink>
          </NavItem>
          <NavItem className="ml-auto">
      <NavLink active href="#">CIS 550 Project</NavLink>
    </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MenuBar;
