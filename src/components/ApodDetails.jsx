import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./apod-details.scss";

export default function ApodDetails({ apod, startDate, setStartDate, setUrl }) {
  const setNewDate = (date) => {
    setStartDate(date);
    const year = date.getFullYear(); // 2019
    let day = date.getDate(); // 23
    if (`${day}`.length === 1) day = `0${day}`;
    let month = date.getMonth() + 1;
    if (`${month}`.length === 1) month = `0${month}`;
    const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&hd=false`;
    setUrl(`${baseUrl}&date=${year}-${month}-${day}`);
  };
  return (
    <>
      <h2 className="apod-title">{apod.title}</h2>
      <DatePicker
        className="date-picker"
        selected={startDate}
        onChange={(date) => setNewDate(date)}
        showPopperArrow={false}
        todayButton="Today's Photo"
        popperPlacement="top"
        maxDate={new Date()}
      />
      <p className="apod-explanation">{apod.explanation}</p>
    </>
  );
}
