import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddHouse from '../components/addhouse';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import TextField from 'material-ui/TextField';
import CryptoJS from 'crypto-js';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        open: true
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
}

handleSubmit (event) {
  const password_crypted = CryptoJS.SHA256(this.state.password)
  const username_crypted = CryptoJS.SHA256(this.state.email.trim());
  const username = this.state.email.trim();
  const password = password_crypted.toString(CryptoJS.enc.Base64);
  console.log(username)
  this.props.login(username,password);
}


handleChangeEmail(event) {
  this.setState({email: event.target.value});
};

handleChangePassword(event){
  this.setState({password: event.target.value})
}

handleClose(event) {
  this.setState({open : false})
}

  render() {
    return (
      <div>
        <Dialog
          title="Login"
          modal={false}
          open={this.state.open}
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
          onClick={() => {this.handleSubmit()}}
          />
        <FlatButton
          label="Chiudi"
          primary={true}
          keyboardFocused={false}
          onClick={() => {this.handleClose()}}
          />
      </Dialog>
      </div>
    )};
  }


function mapDispatchToProps(dispatch) {
  return {
    login: (username,password) => {
      dispatch(Actions.login(username,password))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
