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

  // isDayBlocked() {
  //   return "2017-01-25T17"
  // }


  render() {
    console.log(moment())
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
          isDayBlocked={() => moment()}
          keepOpenOnDateSelect
        />
      </div>
    );
  }
}


export default Calendar;
