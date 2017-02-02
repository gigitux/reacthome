/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import AddComment from '../components/addcomment';
import Fetchcomments from '../components/fetchcomments'


class House extends Component {
  constructor(props){
    super(props);
    this.state={}
  };
  componentWillMount() {
    this.props.fetchoneHouse(this.props.params.id)
    this.state.user = JSON.parse(sessionStorage.getItem('user'))
  };
  render() {
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
