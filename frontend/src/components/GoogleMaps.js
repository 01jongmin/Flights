import {GoogleApiWrapper} from 'google-maps-react';
import React from "react";
// ...
 
export class MapContainer extends React.Component {}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAK9NIuGRc17jZyiPZUtJOhdjaY4qB9lqs')
})(MapContainer)