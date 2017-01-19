/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import EditHouse from '../components/edithouse';
import Error404 from '../components/error404';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Credit_Card from 'material-ui/svg-icons/action/credit-card';
import cookie from 'react-cookie';


class ListHouse extends Component {
  constructor(props){
    super(props);
    this.state = {
      showComponent: false,
      id_house : ""
    };

    this.showComponent = this.showComponent.bind(this);
  };
  componentWillMount() {
    this.props.fetchHouse()
    this.state =  { userId: cookie.load('user.connect') };
    console.log(this.state)

  }

  showComponent(id,title,description) {
    this.setState({
      showComponent: true,
      id_house: id,
      title: title,
      description: description
    });
  }

  render() {
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
          <FlatButton label="Prenota" icon={<Credit_Card />}  onClick= { () => console.log("gg") } />
          <FlatButton label="Modifica" icon={<Edit />}  onClick= { () => {this.showComponent(list.id, list.title, list.description)}} />
          <FlatButton label="Elimina" icon={<Delete />} onClick= { () => {this.props.deletehouse(list.id); location.reload()} } />

          </CardActions>
      </Card>
      <br/>
    </div>
  );
    return (
  <div>
  {list}
  {this.state.showComponent ?  <EditHouse {...this.state} /> : null }
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
