/*React and Redux Stuff */
import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
/*material-ui stuff */
import TextField from 'material-ui/TextField';


class AddHouse extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        andress:  '',
        category: '',
        id: '',
    }
   this.handleChangeTitle=this.handleChangeTitle.bind(this);
   this.handleChangeDescription=this.handleChangeDescription.bind(this);
   this.handleSubmit=this.handleSubmit.bind(this)

  };

/* eventi Handle */
handleChangeTitle(event) {
this.setState({title: event.target.value});
};
handleChangeDescription(event) {
this.setState({description: event.target.value});
};
handleSubmit(event) {
    const title = this.state.title;
    const description = this.state.description;
    this.props.addhouse(title, description)
    event.preventDefault()
    this.setState({name: ''});
    this.setState({phone: ''})
}


  render() {
    console.log(this.state)
    return (
      <div>
          <TextField
          hintText="Nome"
          errorText="Questo campo è richiesto"
          value={this.state.title}
          onChange={this.handleChangeTitle}
        />
        <br/>
        <TextField
          hintText="Descrizione "
          errorText="Questo campo è richiesto"
          value={this.state.description}
          onChange={this.handleChangeDescription}

        />
        <br/>
        <TextField
          hintText="Categoria"
          errorText="Questo campo è richiesto"
        />
      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addhouse: (id,title,andress,photo,category,location) => {
      dispatch(Actions.addHouse(id,title,andress,photo,category,location))
    },
  }
}

export default connect(null,mapDispatchToProps)(AddHouse)
