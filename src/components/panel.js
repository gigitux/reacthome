import React from 'react';
import * as Table from 'reactabular-table';
import style from 'reactabular-table'
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import Done from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';



class Panel extends React.Component {
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
    console.log("sto nel pannello")
    if (this.props.house == null) {
      return null
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
            transforms: [
              label => ({
                onClick: () => alert(`clicked ${label}`)
              })
            ]
          }
        },
        {
          property: 'user',
          header: {
            label: 'Utente',
            transforms: [
              label => ({
                onClick: () => alert(`clicked ${label}`)
              })
            ]
          }
        },
        {
          property: 'flag',
          header: {
            label: 'Disponibilità',
            transforms: [
              label => ({
                onClick: () => alert(`clicked ${label}`)
              })
            ]
          }
        },
        {
          cell: {
            property: 'flag',
            formatters: [
              (value, { rowData }) => (
                <div>
                  <Done onClick={() => this.props.accept(this.props.house[0].id, rowData.user, rowData.startDate)} />
                  <Delete onClick={() => this.props.refuse(this.props.house[0].id, rowData.user, rowData.startDate)}/>
                </div>
              )
            ]
          }
        }
      ]
      const rows = this.props.house[0].reserved

      return (
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          >
          <Table.Header />

          <Table.Body rows={rows} />
        </Table.Provider>
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
