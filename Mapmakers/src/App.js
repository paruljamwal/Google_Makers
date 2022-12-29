import "./App.css";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polyline,
} from "google-maps-react";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      initLoc: {},
    };
  }

  componentDidMount() {
    fetch(`https://comfortable-newt-shift.cyclic.app/map`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          locations: json.randomVal,
          initLoc: json.randomVal[0],
        });
      });
  }

  render() {
    return (
      <>
        <Map
          google={this.props.google}
          zoom={3}
          center={{
            lat: this?.state?.initLoc?.lat,
            lng: this?.state?.initLoc?.lng,
          }}
          onClick={this.onMapClicked}
        >
          <Polyline
            path={this?.state?.locations}
            strokeColor="red"
            strokeOpacity={0.8}
            strokeWeight={4}
          />

          <Marker name={"Current location"} />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Home</h1>
            </div>
          </InfoWindow>
          {this?.state?.locations?.map((location) => (
            <Marker
              title={"marker"}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCqFay6qqmew8KKgujKBlhSNzA7RAr4yqQ",
})(App);
