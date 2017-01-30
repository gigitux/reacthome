import React from 'react';
import moment from 'moment'
import {DateRangePicker}  from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };
  }

  render() {
    var find_house = this.props.list.find(house => house.id === this.props.id_house);
    if (find_house.reserved.length > 0){
      find_house.reserved.map(function (house) {
        house.startDate_moment = moment(house.startDate);
        house.endDate_moment = moment(house.endDate)
      })
      console.log(find_house.reserved)
      var BAD_DATES = [];
      for ( var i in find_house.reserved ){
        BAD_DATES.push(find_house.reserved[i].startDate_moment );
        BAD_DATES.push(find_house.reserved[i].endDate_moment );
      }
      const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;
      const { focusedInput, startDate, endDate } = this.state;
      return (
        <div>
          <DateRangePicker
            onDatesChange={this.props.setdate}
            onFocusChange={this.props.setfocus}
            focusedInput={this.props.focusedInput}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            startDatePlaceholderText="Primo giorno"
            endDatePlaceholderText="Ultimo giorno"
            minimumNights={0}
            isDayBlocked={isDayBlocked}
            keepOpenOnDateSelect
          />
        </div>
      );
    }
    else {
      return (
        <div>
          <DateRangePicker
            onDatesChange={this.props.setdate}
            onFocusChange={this.props.setfocus}
            focusedInput={this.props.focusedInput}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            startDatePlaceholderText="Primo giorno"
            endDatePlaceholderText="Ultimo giorno"
            minimumNights={0}
            keepOpenOnDateSelect
          />
        </div>
      )
    }
  }
}


export default Calendar;
