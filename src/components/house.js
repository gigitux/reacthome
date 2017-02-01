/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';


class House extends Component {
  constructor(props){
    super(props);
  };
  componentWillMount() {
    this.props.fetchoneHouse(this.props.params.id)
  }
  render() {
    return (
  <div>
    {this.props.house ? this.props.house[0].title : ""}
    <br/>
    {this.props.house ? this.props.house[0].description : ""}
  </div>
  )};
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
