import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = Calendar.momentLocalizer(moment);
const state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };
const Detail = props => {
    return (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={state.events}
          style={{ height: "100vh" }}
        />
    );
}

export default Detail;