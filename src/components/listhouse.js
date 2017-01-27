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
import Dialog from 'material-ui/Dialog';
import Calendar from '../components/calendar.js';


class ListHouse extends Component {
  constructor(props){
    super(props);
    this.state = {
      showComponent: false,
      id_house : "",
      open: false,
      focusedInput: null,
      startDate: null,
      endDate: null
    };
    this.showComponent = this.showComponent.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.prenotation = this.prenotation.bind(this);

  };

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  };

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  };

  componentWillMount() {
    this.props.fetchHouse()
    this.state.user = JSON.parse(sessionStorage.getItem('user'))

  }
  prenotation() {
    console.log("prenotazione")
    this.props.prenotation(this.state.id_house,this.state.startDate,this.state.endDate)
  }
  handleOpen(id) {
    this.setState({
      open:true,
      id_house: id
    })
    console.log(this.state.id_house)
  };
  handleClose() {
    this.setState({open:false})
  };

  showComponent(id,title,description) {
    this.setState({
      showComponent: true,
      id_house: id,
      title: title,
      description: description
    });
  }

  render() {
    if (this.state.startDate) {
    console.log(this.state.startDate._d)
    }
    const actions = [
      <FlatButton
        label="Cancella"
        primary={true}
        onClick={this.handleClose}
      />,
    <FlatButton
      label="Prenota"
      primary={true}
      keyboardFocused={true}
      onClick={this.prenotation}
    />,
    ];

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

  const list_user=this.props.list.map((list) =>
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
        <FlatButton label="Prenota" icon={<Credit_Card />}  onClick= { () => this.handleOpen(list.id) } />
      </CardActions>
    </Card>
    <br/>
  </div>
);

  const list_admin=this.props.list.map((list) =>
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
        <FlatButton label="Modifica" icon={<Edit />}  onClick= { () => {this.showComponent(list.id, list.title, list.description)}} />
        <FlatButton label="Elimina" icon={<Delete />} onClick= { () => {this.props.deletehouse(list.id); location.reload()} } />

      </CardActions>
    </Card>
    <br/>
  </div>
);

    if ( this.state.user && this.state.user.role === "admin") {
      return(
        <div>
          {list_admin}
        </div>
      )
    }
    if ( this.state.user && this.state.user.role === "user") {
      return(
        <div>
          {list_user}
          <Dialog
            title="Prenota"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <div style={{height: '500px'}}>
              <Calendar setdate={this.onDatesChange} setfocus={this.onFocusChange} {...this.state} {...this.props} />
            </div>
          </Dialog>
        </div>
      )
    }
    return (
  <div>
    {list}
    {this.state.showComponent ?  <EditHouse {...this.state} /> : null }
  </div>
  )
 }
};

function mapStateToProps(state) {
  return {
    list: state.list_house.house,
    user: state.list_house.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHouse: () => {
      dispatch(Actions.fetchHouse())
    },
    deletehouse: (id) => {
      dispatch(Actions.deletehouse(id))
    },
    prenotation: (id,startDate,endDate) => {
      dispatch(Actions.prenotation(id,startDate,endDate))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ListHouse)
