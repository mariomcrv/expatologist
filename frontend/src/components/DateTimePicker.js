import React from "react";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import "./DateTimePicker.module.css";

export const DateTimePicker = () => {


// the minimum date, time etc, can pass as props parameters. I have to find a way to lock times if they are booked already

 const minDate = Date() // witht this constant we wont be able to choose a day before the current one


  return (
    <div>
      <DatePickerComponent
        className='text-center'
        placeholder='Date'
        min={minDate}
        format="dd-MMM-yyyy"
      ></DatePickerComponent>
      <TimePickerComponent
        className='text-center'
        placeholder='Time'
        step={60}
      ></TimePickerComponent>
    </div>
  );
};

export default DateTimePicker;
