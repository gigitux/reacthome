/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import EditHouse from '../components/listhouse';

class ListHouse extends Component {
  constructor(props){
    super(props);
  };
  componentWillMount() {
    this.props.fetchHouse()
  }

  render() {
    console.log(this.props)
    const list=this.props.list.map((list) =>
    <div key={list.id}>
      <Card style={{width:600}}>
        <CardMedia
           overlay={<CardTitle title={list.title} onClick={ () => location.href='house/'+list.id} style={{cursor:'pointer'}} />}
         >
           <img src={list.photo}/>
         </CardMedia>
         <CardTitle title={list.title} />
        <CardText>{list.description}</CardText>
        <CardActions>
          <FlatButton label="Prenota" onClick= { () => console.log("gg") } />
          <FlatButton label="Modifica" onClick= { () => console.log("bla")} />
          <FlatButton label="Elimina" onClick= { () => {this.props.deletehouse(list.id); location.reload()} } />

          </CardActions>
      </Card>
      <br/>
    </div>
  );
    return (
  <div>
  {list}
  </div>
  )
 }
};

function mapStateToProps(state) {
  return { list: state.list_house.house}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHouse: () => {
      dispatch(Actions.fetchHouse())
    },
    deletehouse: (id) => {
      dispatch(Actions.deletehouse(id))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ListHouse)
