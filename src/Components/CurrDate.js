import React from "react";
import moment from "moment";

const CurrDate = () => {
  let date = moment().format();
  let new_date = date.split("T");

  let dt = moment(new_date[0], "YYYY-MM-DD");
  let da = dt.format("DD-MM-YYYY");

  return <div>&nbsp; &nbsp;&nbsp;&nbsp;Date : {da}</div>;
};

export default CurrDate;
