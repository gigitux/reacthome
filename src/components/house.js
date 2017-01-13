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
  render() {
    return (
  <div>
gdgfgf
</div>
  )};
}

function mapStateToProps(state) {
  return { list: state.list_house.house}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHouse: () => {
      dispatch(Actions.fetchHouse())
    },
    fetchoneHouse: (id) => {
    console.log(id)
      dispatch(Actions.fetchoneHouse(id))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(House)
