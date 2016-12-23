import React, {Component} from 'react';
/* import material-ui stuff */
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class NavBar extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return(
      <AppBar title="React Home"
       iconElementRight={<FlatButton label="Login"/>}
       />
    )
  };
}

export default NavBar
