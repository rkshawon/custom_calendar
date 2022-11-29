import { useState } from "react";
import moment from "moment";
import "./calendar.css";

export default function Calendar({ data, sdate, edate, category, monthe }) {
  let current = moment().format("YYYY-MM-DD").toString();
  const pastSeven = moment(current)
    .subtract(30, "days")
    .format("YYYY-MM-DD")
    .toString();

  let sd = moment(sdate || pastSeven, "YYYY-MM-DD");
  let ed = moment(edate || current, "YYYY-MM-DD");
  const numberOfDays = moment(monthe, "YYYY-MM").daysInMonth();
  const dateDifference = moment.duration(ed.diff(sd)).asDays();

  //   console.log(dateDifference);

  //   var monthName = moment("02-01-2021", "DD-MM-YYYY").format("MM");

  //   const monthCheck = ["02", "04", "06", "09", "11"];

  //   const leapyearCheck = (year) => {
  //     if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
  //       return 29;
  //     } else {
  //       return 28;
  //     }
  //   };

  const newDateArray = [];
  if (monthe) {
    for (let i = 0; i < numberOfDays; i++) {
      const dates = moment(monthe + "-01")
        .add(i, "days")
        .format("YYYY-MM-DD")
        .toString();
      newDateArray.push(dates);
    }
  } else
    for (let i = 0; i <= dateDifference; i++) {
      const dates = moment(sdate || pastSeven)
        .add(i, "days")
        .format("YYYY-MM-DD")
        .toString();
      newDateArray.push(dates);
    }

  const checkAmount = (date) => {
    let amount = 0;
    let employee_salary_amount = 0;
    let office_expense_amount = 0;
    data?.forEach((element) => {
      if (category !== "all") {
        if (category === element.type && date === element.date) {
          amount += element.amount;
          office_expense_amount += element.amount;
          employee_salary_amount += element.amount;
        }
      } else {
        if (date === element.date) {
          if (element.type === "employee salary")
            employee_salary_amount += element.amount;
          if (element.type === "office expense")
            office_expense_amount += element.amount;
          amount += element.amount;
        }
      }
    });
    return { amount, employee_salary_amount, office_expense_amount };
  };

  return (
    <div className="calender">
      <div className="week_header">
        <h3>Saturday</h3>
        <h3>Sunday</h3>
        <h3>Monday</h3>
        <h3>Tuesday</h3>
        <h3>Wednesday</h3>
        <h3>Tursday</h3>
        <h3>Friday</h3>
      </div>
      <div className="calendar_date">
        {newDateArray.map((date, index) => {
          let total_amount = checkAmount(date);
          return (
            <div
              key={index}
              className="single_date"
              style={{
                borderRight:
                  ((index + 1) * 1) % 7 !== 0 && `3px solid rgb(232, 238, 238)`,
                backgroundColor: date === current && "#edf8ff",
              }}
            >
              <div
                className="date"
                style={
                  date === current
                    ? { backgroundColor: "#46406e", color: "white" }
                    : {}
                }
              >
                {date.substr(8, 2)}
              </div>
              {total_amount?.amount ? (
                <div className="total_amount">
                  {(category === "employee salary" || category === "all") && (
                    <p style={{ color: "#c40000", fontWeight: "500" }}>
                      Employee Salary {total_amount.employee_salary_amount}
                    </p>
                  )}
                  {(category === "office expense" || category === "all") && (
                    <p style={{ color: "#c40000", fontWeight: "500" }}>
                      Office Expense {total_amount.office_expense_amount}
                    </p>
                  )}
                  <p style={{ color: "#0098d4", fontWeight: "500" }}>
                    Total Amount {total_amount.amount}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
