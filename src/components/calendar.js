import React from 'react';
import moment from 'moment'
import {DateRangePicker}  from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

var clonedate = function(mydate) {
  return moment(Object.assign({}, mydate))
};

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
    console.log(this.props.startDate)
    var find_house = this.props.list.find(house => house.id === this.props.id_house);
    if (find_house.reserved.length > 0){
      find_house.reserved.map(function (house) {
        house.startDate_moment = moment(house.startDate);
        house.endDate_moment = moment(house.endDate)
      })
      console.log(find_house.reserved)
      var BAD_DATES = [];
      var current_day;
      for ( var i in find_house.reserved ){
        current_day = clonedate(find_house.reserved[i].startDate_moment)
        while (current_day.isBetween(find_house.reserved[i].startDate_moment, find_house.reserved[i].endDate_moment, null, '[]')) {
          BAD_DATES.push(find_house.reserved[i].startDate_moment);
          BAD_DATES.push(current_day);
          current_day = clonedate(current_day.add(1, 'd'));
        }
        BAD_DATES.pop();
      }
      const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;
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
