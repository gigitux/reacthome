import React, {Component} from 'react';
import * as Table from 'reactabular-table';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import Done from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';
import Loading from 'react-loading';




class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
    this.handleChangeOption = this.handleChangeOption.bind(this);
  };

  componentWillMount() {
    this.props.fetchoneHouse(this.props.params.id)
  };

  handleChangeOption(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value)
    debugger
  };




  render() {
    if (this.props.house == null) {
      return (
        <Loading type='balls' color='#00bcd4' />
       )
    }
    else {
      const columns = [
        {
          property: 'startDate',
          header: {
            label: 'Data di inizio',
          }
        },
        {
          property: 'endDate',
          header: {
            label: 'Data di fine',
          }
        },
        {
          property: 'user',
          header: {
            label: 'Utente'
          }
        },
        {
          property: 'flag',
          header: {
            label: 'Disponibilità'
          }
        },
        {
          cell: {
            property: 'flag',
            formatters: [
              (value, { rowData }) => (
                <div>
                  <Done onClick={() => this.props.accept(this.props.house[0].id, rowData.user, rowData.startDate)} style={{cursor:'pointer'}} />
                  <Delete onClick={() => this.props.refuse(this.props.house[0].id, rowData.user, rowData.startDate)} style={{cursor:'pointer'}} />
                </div>
              )
            ]
          }
        }
      ]
      const rows = this.props.house[0].reserved

      return (
        <div>
          <Table.Provider
            className="pure-table pure-table-striped"
            columns={columns}
            >
            <Table.Header />

            <Table.Body rows={rows} rowKey="_id" />
          </Table.Provider>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { house: state.list_house.fetchHouse}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchoneHouse: (id) => {
      dispatch(Actions.fetchoneHouse(id))
    },
    accept: (id, user, startDate ) => {
      dispatch(Actions.accept(id, user, startDate))
    },
    refuse: (id, user, startDate ) => {
      dispatch(Actions.refuse(id, user, startDate))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Panel)
