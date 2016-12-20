import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';



class ListHouse extends Component {
  constructor(props){
    super(props);
  };
  render() {
    const list = this.props.list.map((list) =>
    <div key = {list.id}>
      <Card>
        <CardMedia
           overlay={<CardTitle title={list.title} />}
         >
           <img src={list.photo}  height="600" width="337" />
         </CardMedia>
         <CardTitle title={list.tile} />
        <CardText>{list.description}</CardText>
          <Divider/>
      </Card>
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
