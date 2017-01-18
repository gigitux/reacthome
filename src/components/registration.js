import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddHouse from '../components/addhouse';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import TextField from 'material-ui/TextField';
import CryptoJS from 'crypto-js';

export class Registration extends React.Component {
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
  const password_crypted = CryptoJS.SHA256(this.state.password)
  const name = this.state.name;
  const surname = this.state.surname;
  const password = password_crypted.toString(CryptoJS.enc.Base64);
  this.props.registration(name,surname,password)

}

handleChangeName(event) {
  this.setState({name: event.target.value});
};

handleChangeSurname(event) {
  this.setState({surname: event.target.value});
};

handleChangePassword(event){
  this.setState({password: event.target.value})
}

  render() {
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
        value={this.state.surname}
        onChange={this.handleChangeSurname}
        />
      <br/>
        <TextField
        hintText="Password"
        errorText="Questo campo è richiesto"
        type="password"
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


function mapDispatchToProps(dispatch) {
  return {
    registration: (name,surname,password) => {
      dispatch(Actions.registration(name,surname,password))
    }
  }
}

export default connect(null, mapDispatchToProps)(Registration)
