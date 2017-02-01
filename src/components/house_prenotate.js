/* Import React Stuff */
import React, {Component} from 'react';
/*Import Material Stuff */
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import Error404 from '../components/error404';
import cookie from 'react-cookie';

class House_prenotate extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    };
  };

  componentWillMount() {
    this.state.user = JSON.parse(sessionStorage.getItem('user'))
    this.props.house_prenotate(this.state.user.email)
  }
  render() {
    if (this.props.list == null) {
      console.log("inattesa")
      return (
    <div>
      caricamento
    </div>
  )}
    else {
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
        </Card>
      <br/>
    </div>
  );
    return (
  <div>
    {list}
  </div>
)}
  };
}

function mapStateToProps(state) {
  return {
    list: state.list_house.prenotate_house,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    house_prenotate: (user) => {
      dispatch(Actions.house_prenotate(user))
    },
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(House_prenotate)
