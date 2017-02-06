/*React and Redux Stuff */
import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
/*material-ui stuff */
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
/* google-maps stuff */
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";

class AddHouse extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        andress:  '',
        category: '',
        id: '',
        lat: '',
        long: '',
    }
   this.handleChangeTitle=this.handleChangeTitle.bind(this);
   this.handleChangeDescription=this.handleChangeDescription.bind(this);
  //  this.handleSubmit=this.handleSubmit.bind(this);
   this.handleMapLoad = this.handleMapLoad.bind(this);
   this.handleMapClick = this.handleMapClick.bind(this);
  };

/* eventi Handle */
handleSubmit (event) {
  console.log(this.state.description)
  const title = this.state.title;
  const description = this.state.description;
    this.props.postHouse(title,description)
}

handleChangeTitle(event) {
  this.setState({title: event.target.value});
};

handleChangeDescription(event) {
  this.setState({description: event.target.value});
  console.log(this.state.title, this.state.description)
};

handleChangeCategory(event) {
  this.setState({categoria: event.target.value});
};


handleMapLoad(map) {
  this._mapComponent = map;
};
handleMapClick(event) {
  var lat = event.latLng.lat();
  var lng = event.latLng.lng();
  console.log(this.state)
  this.setState({
    lat: lat,
    long: lng,
  });
};
  render() {
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={6}
      defaultCenter={{ lat: 41.87194, lng: 12.567379999999957 }}
      onClick={props.onMapClick}
      >
      <Marker
      defaultPosition={{ lat: this.state.lat, lng: this.state.long }}
      title="Click to zoom"
      onClick={props.onMarkerClick}
      />
      </GoogleMap>
    ));
    return (
      <div>
          <TextField
          hintText="Nome"
          errorText="Questo campo è richiesto"
          value={this.state.title}
          onChange={this.handleChangeTitle}
        />
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
          value={this.state.lat}
          />
          <TextField
            hintText="Longitutine"
            errorText="Questo campo è richiesto"
            value={this.state.long}
            />
            <FlatButton
              label="Invia"
              primary={true}
              keyboardFocused={true}
              onClick={() => { this.handleSubmit(); location.reload() }}
            />
            <GettingStartedGoogleMap
              containerElement={
            <div style={{ height: `10000px` }} />
            }
            mapElement={
            <div style={{ height: `300px` }} />
            }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            />

      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postHouse: (title,description) => {
      dispatch(Actions.postHouse(title,description))
    },
  }
}

export default connect(null,mapDispatchToProps)(AddHouse)
