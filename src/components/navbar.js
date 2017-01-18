import React, {Component} from 'react';
/* import material-ui stuff */
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Registration from '../components/registration';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    }
    this.showComponent = this.showComponent.bind(this);
  };

  showComponent() {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    console.log(this.state.showComponent)
    return(
      <div>
      <AppBar title="React Home"
       iconElementRight={<FlatButton label="Login" onClick= { () => {this.showComponent(), console.log(this.state)}}/>}
       />
       {this.state.showComponent ?  <Registration/> : null }
       </div>
    )
  };
}


export default NavBar
