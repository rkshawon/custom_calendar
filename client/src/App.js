import { useState } from "react";
import "./App.css";
import Calendar from "./Components/Calendar";
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("all");
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/transaction/63835fafcd9fc0a68764835e?month=${month}&sdate=${sdate}&edate=${edate}`
      )
      .then((info) => {
        setData(info.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sdate, edate, month]);

  return (
    <div className="app">
      <div className="calendar_container">
        <div className="calendar_header">
          <h2 style={{ paddingLeft: "50px", color: "#1c4280" }}>
            <AiOutlineMenu
              color="gray"
              size={18}
              style={{ marginRight: "15px" }}
            />
            <FaCalendarAlt
              color="#008fdb"
              size={22}
              style={{ marginRight: "5px" }}
            />
            <p style={{ fontWeight: "500" }}>Calendar View</p>
          </h2>
        </div>
        <div className="calendar_input">
          <select
            id="type"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="all">All Types</option>
            <option value="employee salary">Employee salary</option>
            <option value="office expense">Office expense</option>
          </select>
          <select
            id="gMonth2"
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            <option value="">Select Month</option>
            <option value="2022-01">Janaury</option>
            <option value="2022-02">February</option>
            <option value="2022-03">March</option>
            <option value="2022-04">April</option>
            <option value="2022-05">May</option>
            <option value="2022-06">June</option>
            <option value="2022-07">July</option>
            <option value="2022-08">August</option>
            <option value="2022-09">September</option>
            <option value="2022-10">October</option>
            <option value="2022-11">November</option>
            <option value="2022-12">December</option>
          </select>
          <div
            style={{
              display: "flex",
              width: "450px",
              marginLeft: "3%",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="start date">Start Date:</label>
            <input
              onChange={(e) => {
                setMonth("");
                setSdate(e.target.value);
              }}
              type="date"
              id="date_calendar"
              name="start date"
              className="c_date"
            />
            <label htmlFor="end date">End Date:</label>
            <input
              onChange={(e) => {
                setMonth("");
                setEdate(e.target.value);
              }}
              type="date"
              id="date_calendar"
              name="end date"
              className="c_date"
            />
          </div>
        </div>
        <Calendar category={category} data={data} />
      </div>
    </div>
  );
}

export default App;
