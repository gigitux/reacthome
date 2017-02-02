import React from 'react';
import * as Table from 'reactabular-table';
import style from 'reactabular-table'
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    salary: {
      type: 'integer'
    }
  },
  required: ['id', 'name', 'position', 'salary']
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchoneHouse(this.props.params.id)
  }

  render() {
    console.log("sto nel pannello")
    if (this.props.house == null) {
      return null
    }
    else {
      console.log(this.props.house[0].reserved)
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
          header: {
            label: 'Gestione case',
            transforms: [
              label => ({
                onClick: () => alert(`clicked ${label}`)
              })
            ]
          }
        },
      ]
      const rows = this.props.house[0].reserved

      return (
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
          >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id" />
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Panel)
