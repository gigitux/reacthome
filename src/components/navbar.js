import React, {Component} from 'react';
/* import material-ui stuff */
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Registration from '../components/registration';
import Login from '../components/login';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent_registration: false,
      showComponent_login: false
    }
    this.showComponent_registration = this.showComponent_registration.bind(this);
    this.showComponent_login = this.showComponent_login.bind(this);
  };

showComponent_registration() {
    this.setState({showComponent_registration: true});
}
showComponent_login() {
    this.setState({showComponent_login: true});
}
  render() {
    console.log(this.state.showComponent)
    return(
      <div>
      <AppBar title="React Home"
       iconElementRight={<FlatButton label="Registrazione" onClick= { () => {this.showComponent_registration(), console.log(this.state)}}/>}
       iconElementLeft={<FlatButton label="Login" onClick= { () => {this.showComponent_login(), console.log(this.state)}}/>}
       />
     {this.state.showComponent_registration ?  <Registration/> : null }
     {this.state.showComponent_login ?  <Login/> : null }
       </div>
    )
  };
}


export default NavBar
