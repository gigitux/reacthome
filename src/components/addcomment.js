import React, {Component} from 'react';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


class AddComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: null
    }
    this.handleChangeComment=this.handleChangeComment.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit (event) {
    this.props.addcomment(this.props.idhouse,this.state.comment);
  }

  handleChangeComment(event) {
    this.setState({comment: event.target.value});
  };

  render() {
    return(
      <div>
        <TextField
          hintText=""
          multiLine={true}
          rows={2}
          rowsMax={4}
          value={this.state.comment}
          onChange={this.handleChangeComment}
        /><br />
      <FlatButton label="Aggiunti commento" primary={true} onClick={this.handleSubmit} />
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addcomment: (id,comment) => {
      dispatch(Actions.addcomment(id,comment))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddComment)
