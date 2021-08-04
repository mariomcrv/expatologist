import React, { useRef } from "react";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
// import "./DateTimePicker.css";

const DateTimePickerTest = (props) => {
  // i need use state to change the behavior of the button
  // const [disable, setDisable] = React.useState(true);

  const minDate = Date(); // witht this constant we wont be able to choose a day before the current one

  // this constat will store the value of the input of the date field
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  // with this inputchange I can log the date field on change
  const handleInputChange = (event) => {
    // console.log("time " + timeInputRef.current.value);
    // console.log("date " + dateInputRef.current.value);

    // if (dateInputRef.current.value === null || timeInputRef.current.value === null) {
    //   setDisable(true);
    // } else {
    //   setDisable(false);
    // }

    const enteredDate = dateInputRef.current.value; // when the event is triggered, we have a new constant to extract the value from the reference above
    const enteredTime = timeInputRef.current.value;

    const dateTimeData = {
      date: enteredDate,
      time: enteredTime,
    };

    props.onAddDateTime(dateTimeData);
  };

  // with this inputchange I can log the time field on change
  // const handleTimeInputChange = (event) => {
  //   if (dateInputRef.current.value === null && timeInputRef.current.value === null) {
  //     setDisable(true)
  //   } else {
  //     setDisable(false)
  //   }
  // };

  // this is the action where the button sends the data to the parent
  // const submitHandler = (event) => {
  //   console.log("vengo de del boton mi rey");
  // };

  // on my button, I have to enable it when the date field is populated

  return (
    <div>
      <DatePickerComponent
        className='text-center'
        placeholder='Date'
        min={minDate}
        format='dd-MMM-yyyy'
        change={handleInputChange}
        ref={dateInputRef}
      ></DatePickerComponent>
      <TimePickerComponent
        className='text-center'
        placeholder='Time'
        step={60}
        change={handleInputChange}
        ref={timeInputRef}
      ></TimePickerComponent>
    </div>
  );
};

export default DateTimePickerTest;
