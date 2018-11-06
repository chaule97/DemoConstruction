import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = Calendar.momentLocalizer(moment);
const state = {
    events: [
      // {
      //   start: new Date(),
      //   end: new Date(moment().add(1, "days")),
      //   title: "Some title"
      // },
      {
        start: new Date(),
        end: new Date(moment().add(2, "days")),
        title: "TEst"
      },
    ]
  };
const Detail = props => {
    return (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          // events={state.events}
          style={{ height: "100vh" }}
          onSelectEvent={event => props.openModal(event)}
          // onSelectSlot={(slotInfo) => props.openModal(slotInfo)}
        />
    );
}

export default Detail;