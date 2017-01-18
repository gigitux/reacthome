import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddHouse from '../components/addhouse';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import TextField from 'material-ui/TextField';
import CryptoJS from 'crypto-js';

export class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
}

handleSubmit (event) {
  const password_crypted = CryptoJS.SHA256(this.state.password)
  const email = this.state.email;;
  const password = password_crypted.toString(CryptoJS.enc.Base64);
  this.props.login(email,password)

}


handleChangeEmail(event) {
  this.setState({email: event.target.value});
};

handleChangePassword(event){
  this.setState({password: event.target.value})
}

  render() {
    return (
      <div>
        <Dialog
          title="Login"
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
    <TextField
        hintText="Email"
        errorText="Questo campo è richiesto"
        type="email"
        value={this.state.email}
        onChange={this.handleChangeEmail}
        />
      <br/>
        <TextField
        hintText="Password"
        errorText="Questo campo è richiesto"
        type="password"
        value={this.state.password}
        onChange={this.handleChangePassword}
        />
      <br/>
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
    login: (email,password) => {
      dispatch(Actions.registration(email,password))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
