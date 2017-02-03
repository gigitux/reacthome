import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import TextField from 'material-ui/TextField';

export class EditHouse extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.title,
        description: this.props.description,
        andress:  '',
        category: '',
        id: this.props.id_house,
        lat: '',
        long: '',
    }
    this.handleChangeTitle=this.handleChangeTitle.bind(this);
    this.handleChangeDescription=this.handleChangeDescription.bind(this);
}

handleSubmit (event) {
  const id = this.state.id;
  const title = this.state.title;
  const description = this.state.description;
  this.props.editHouse(id,title,description);
}

handleChangeTitle(event) {
  this.setState({title: event.target.value});
};

handleChangeDescription(event) {
  this.setState({description: event.target.value});
};


  render() {
    return (
      <div>
        <Dialog
          title="Modifica Casa"
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
        <TextField
        hintText="Nome"
        errorText="Questo campo è richiesto"
        value={this.state.title}
        onChange={this.handleChangeTitle}
        />
      <br/>
        <TextField
        multiLine={true}
        rows={2}
        rowsMax={4}
        hintText="Descrizione"
        errorText="Questo campo è richiesto"
        value={this.state.description}
        onChange={this.handleChangeDescription}
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
