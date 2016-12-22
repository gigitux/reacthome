/*React and Redux Stuff */
import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
/*material-ui stuff */
import TextField from 'material-ui/TextField';
/* google-maps stuff */
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: 42.8333, lng: 12.8333 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
  ));
class AddHouse extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        andress:  '',
        category: '',
        id: '',
        markers: {
            lat: "22",
            lng: "",
          },
        }
    }
   this.handleChangeTitle=this.handleChangeTitle.bind(this);
   this.handleChangeDescription=this.handleChangeDescription.bind(this);
  //  this.handleSubmit=this.handleSubmit.bind(this);
   this.handleMapLoad = this.handleMapLoad.bind(this);
   this.handleMapClick = this.handleMapClick.bind(this);
  };

/* eventi Handle */
handleChangeTitle(event) {
  this.setState({title: event.target.value});
  this.setState({name: ''});
  this.setState({phone: ''})
};

handleChangeDescription(event) {
  this.setState({title: event.target.value});
  this.setState({name: ''});
  this.setState({phone: ''})
};
handleMapLoad(map) {
  this._mapComponent = map;
  if (map) {
    console.log(map.getZoom());
  }
};
handleMapClick(event) {
  const nextMarkers = [
    ...this.state.markers,
    {
      position: event.latLng,
      defaultAnimation: 2,
      key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    },
  ];
  this.setState({
    markers: nextMarkers,
  });
};
  render() {
    console.log(this.state)
    return (
      <div>
          <TextField
          hintText="Nome"
          errorText="Questo campo è richiesto"
          value={this.state.title}
          onChange={this.handleChangeTitle}
        />
        <br/>
        <TextField
          hintText="Descrizione "
          errorText="Questo campo è richiesto"
          value={this.state.description}
          onChange={this.handleChangeDescription}

        />
        <br/>
        <TextField
          hintText="Categoria"
          errorText="Questo campo è richiesto"
          />
          <TextField
            hintText="Longitutine"
            errorText="Questo campo è richiesto"
            value={this.state.markers.position.lat}
            />
            <GettingStartedGoogleMap
              containerElement={
            <div style={{ height: `100px` }} />
            }
            mapElement={
            <div style={{ height: `100px` }} />
            }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            markers={this.state.markers}
            />

      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addhouse: (id,title,andress,photo,category,location) => {
      dispatch(Actions.addHouse(id,title,andress,photo,category,location))
    },
  }
}

export default connect(null,mapDispatchToProps)(AddHouse)
