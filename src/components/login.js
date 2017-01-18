import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddHouse from '../components/addhouse';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import TextField from 'material-ui/TextField';

export class EditHouse extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        name: '',
        surname: '',
        password: '',
    }
    this.handleChangeName=this.handleChangeName.bind(this);
    this.handleChangeSurname=this.handleChangeSurname.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
}

handleSubmit (event) {
  const name = this.state.name;
  const surname = this.state.surname;
  const password = this.state.password;
  this.props.editHouse(name,surname,password);
  console.log("blabla")
}

handleChangeName(event) {
  this.setState({name: event.target.value});
};

handleChangeDescription(event) {
  this.setState({surname: event.target.value});
};


  render() {
    console.log(this.state.id)
    return (
      <div>
        <Dialog
          title="Registrati"
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
        <TextField
        hintText="Nome"
        errorText="Questo campo è richiesto"
        value={this.state.name}
        onChange={this.handleChangeName}
        />
      <br/>
        <TextField
        hintText="Cognome"
        errorText="Questo campo è richiesto"
        value={this.state.lastname}
        onChange={this.handleChangeLastname}
        />
      <br/>
        <TextField
        hintText="Password"
        errorText="Questo campo è richiesto"
        value={this.state.password}
        onChange={this.handleChangePassword}
        />
        <FlatButton
          label="Invia"
          primary={true}
          keyboardFocused={true}
          onClick={() => { this.handleSubmit(); location.reload() }}
          />
      </Dialog>
      </div>
    )};
  }


function mapStateToProps(state) {
  return { house: state.list_house.fetchHouse}
}

function mapDispatchToProps(dispatch) {
  return {
    editHouse: (id,title,description) => {
      dispatch(Actions.editHouse(id,title,description))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHouse)
