import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  // dont need useeffect, thats just for listening to search input
  // 3305 valid input to try, yields 2 objects bc there are 2 entries in the db
  // 1352 has 3 entries

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    console.log("Search team is = " + searchTerm);
    try {
      const response = await fetch(
        `http://localhost:8800/search?term=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const res = await response.json();
      setData(res); //res.data
      console.log("data is " + res);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Course Search..."
        ></input>
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
        <ul></ul>
      </div>
      <div
        style={{
          padding: "10px",
        }}
      >
        <table>
          <thead>
            <th>Item2</th>
            <th>Course</th>
            <th>CRN</th>
            <th>Building</th>
            <th>Room</th>
            <th>Days</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Room Type</th>
            <th>Excess</th>
            <th>DE</th>
            <th>UGL</th>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.item2}</td>
                <td>{d.course}</td>
                <td>{d.crn}</td>
                <td>{d.building}</td>
                <td>{d.room}</td>
                <td>{d.days}</td>
                <td>{d.time}</td>
                <td>{d.duration}</td>
                <td>{d.semester}</td>
                <td>{d.year}</td>
                <td>{d.room_type}</td>
                <td>{d.enrollment_excess}</td>
                <td>{d.enrollment_de_excess}</td>
                <td>{d.enrollment_ugl_affected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
