/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import AddComment from '../components/addcomment';
import Fetchcomments from '../components/fetchcomments'
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";



class House extends Component {
  constructor(props){
    super(props);
    this.state={}
  };
  componentWillMount() {
    this.props.fetchoneHouse(this.props.params.id)
    this.setState({user:JSON.parse(sessionStorage.getItem('user'))})
  };
  render() {
    console.log(this.props)
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={6}
      defaultCenter={{ lat: 41.87194, lng: 12.567379999999957 }}
      >
      <Marker
      defaultPosition={{ lat: this.props.house[0].location.lat, lng: this.props.house[0].location.long }}
      title="Click to zoom"
      onClick={props.onMarkerClick}
      />
      </GoogleMap>
    ));
    if (this.state.user == null) {
      return (
        <div>
          {this.props.house ? this.props.house[0].title : ""}
          <br/>
          {this.props.house ? this.props.house[0].description : ""}
        </div>
    )
  }
    else {
      console.log(this.props.params)
      return (
        <div>
          {this.props.house ? this.props.house[0].title : ""}
          <br/>
          {this.props.house ? this.props.house[0].description : ""}
          <br/>
            <GettingStartedGoogleMap
              containerElement={
            <div style={{ height: `300px` }} />
            }
            mapElement={
            <div style={{ height: `300px` }} />
            }
            />
          <br/>

          <AddComment idhouse={this.props.params.id} {...this.state.user}  />
          <Fetchcomments idhouse={this.props.params.id} {...this.state.user}  />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { house: state.list_house.fetchHouse}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchoneHouse: (id) => {
      dispatch(Actions.fetchoneHouse(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)
