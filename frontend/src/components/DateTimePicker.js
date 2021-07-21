import React from "react";
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import "./DateTimePicker.module.css";

export const DateTimePicker = () => {


  return (
    <div>
      <DatePickerComponent className="text-center" placeholder="Date"></DatePickerComponent>
    <TimePickerComponent className="text-center" placeholder="time"></TimePickerComponent>
    </div>
  );
};

export default DateTimePicker;
