/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';


class ListHouse extends Component {
  constructor(props){
    super(props);
  };
  componentWillMount() {
    this.props.fetchHouse()
  }
  render() {
    const list=this.props.list.map((list) =>
    <div key={list.id}>
      <Card style={{width:600}}>
        <CardMedia
           overlay={<CardTitle title={list.title} />}
         >
           <img src={list.photo}/>
         </CardMedia>
         <CardTitle title={list.title} />
        <CardText>{list.description}</CardText>
        <CardActions>
          <FlatButton label="Prenota" onClick= { () => this.props.fetchoneHouse(list.id) } />
          <FlatButton label="Modifica" />
          </CardActions>
      </Card>
      <br/>
    </div>
  );
    return (
  <div>
  {list}
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


export default connect(mapStateToProps,mapDispatchToProps)(ListHouse)
