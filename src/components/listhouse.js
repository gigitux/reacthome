import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';



class ListHouse extends Component {
  constructor(props){
    super(props);
  };
  render() {
    const list=this.props.list.map((list) =>
    <div key={list.id}>
      <Card style={{width:600}}>
        <CardMedia
           overlay={<CardTitle title={list.title} />}
         >
           <img src={list.photo}/>
         </CardMedia>
         <CardTitle title={list.tile} />
        <CardText>{list.description}</CardText>
        <CardActions>
          <FlatButton label="Prenota" />
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


export default connect(mapStateToProps)(ListHouse)
