import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import AddDelete from "./components/AddDelete";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Main />} />
        <Route path="/add-delete" element={<AddDelete />} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

function Main() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Item2");
  const [selectedCategory2, setSelectedCategory2] = useState("Item2");
  const [searchTerm, setSearchTerm] = useState("");
  const [crnSearch, setCrnSearch] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:8800/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // dont need useeffect, thats just for listening to search input
  // 3305 valid input to try, yields 2 objects bc there are 2 entries in the db
  // 1352 has 3 entries

  const handleSearch = async () => {
    console.log("Search team is = " + searchTerm);
    try {
      const response = await fetch(
        `http://localhost:8800/search?term=${searchTerm}&category=${selectedCategory}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const res = await response.json();
      setData(res);
      console.log("data is " + JSON.stringify(res)); // Use JSON.stringify to log the entire response
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleUpdate = () => {
    const value = { value: updatedValue };
    console.log("value to be sent is " + JSON.stringify(value));
    console.log(
      "CRN is " +
        crnSearch +
        " selected category is " +
        selectedCategory2 +
        " updated value is " +
        updatedValue
    );

    //  `http://localhost:8800/update/?crn=${crnSearch}&category=${selectedCategory2}&value=${updatedValue}`

    axios
      .put(
        `http://localhost:8800/update/${crnSearch}/${selectedCategory2}`,
        value
      )
      .then((res) => {
        console.log(res);
        if (res.data.changedRows >= 1) {
          alert(
            "Updated " +
              selectedCategory2 +
              " of CRN " +
              crnSearch +
              " to " +
              updatedValue
          );
        } else {
          alert("Did not update");
        }
      })
      .catch((err) => console.log(err));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="pageContainer">
      <div className="searchContainer">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by ${selectedCategory}...`}
        ></input>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Item1">Item1</option>
          <option value="Item2">Item2</option>
          <option value="subject">Subject</option>
          <option value="Course">Course</option>
          <option value="CRN">CRN</option>
          <option value="Item6">Item6</option>
          <option value="Building">Building</option>
          <option value="Room">Room</option>
          <option value="Days">Days</option>
          <option value="Time">Time</option>
          <option value="Duration">Duration</option>
          <option value="Semester">Semester</option>
          <option value="Year">Year</option>
          <option value="Room_Type">Room Type</option>
          <option value="Enrollment">Enrollment</option>
          <option value="Enrollment_Excess">Enrollment Excess</option>
          <option value="Enrollment_De_Excess">Enrollment De Excess</option>
          <option value="Enrollment_UGL_Affected">
            Enrollment UGL Affected
          </option>
          <option value="Enrollment_UGU_Affected">
            Enrollment UGU Affected
          </option>
        </select>
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to="/add-delete"
        >
          <button>Add/Delete</button>
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          <button onClick={refreshPage}>Refresh</button>
        </Link>
      </div>
      <div className="updateContainer">
        <input
          type="search"
          value={crnSearch}
          onChange={(e) => setCrnSearch(e.target.value)}
          placeholder={"Enter CRN to Update"}
        ></input>
        <select
          value={selectedCategory2}
          onChange={(e) => setSelectedCategory2(e.target.value)}
        >
          <option value="Item1">Item1</option>
          <option value="Item2">Item2</option>
          <option value="subject">Subject</option>
          <option value="Course">Course</option>
          <option value="CRN">CRN</option>
          <option value="Item6">Item6</option>
          <option value="Building">Building</option>
          <option value="Room">Room</option>
          <option value="Days">Days</option>
          <option value="Time">Time</option>
          <option value="Duration">Duration</option>
          <option value="Semester">Semester</option>
          <option value="Year">Year</option>
          <option value="Room_Type">Room Type</option>
          <option value="Enrollment">Enrollment</option>
          <option value="Enrollment_Excess">Enrollment Excess</option>
          <option value="Enrollment_De_Excess">Enrollment De Excess</option>
          <option value="Enrollment_UGL_Affected">
            Enrollment UGL Affected
          </option>
          <option value="Enrollment_UGU_Affected">
            Enrollment UGU Affected
          </option>
        </select>
        <input
          type="search"
          value={updatedValue}
          onChange={(e) => setUpdatedValue(e.target.value)}
          placeholder={"Enter Updated Value"}
        ></input>
        <button type="submit" onClick={handleUpdate}>
          Update
        </button>
      </div>
      <div
        style={{
          padding: "10px",
        }}
      >
        <table>
          <thead>
            <th>Item1</th>
            <th>Item2</th>
            <th>Subject</th>
            <th>Course</th>
            <th>CRN*</th>
            <th>Item6</th>
            <th>Building</th>
            <th>Room</th>
            <th>Days</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Room Type</th>
            <th>Enrollment</th>
            <th>Excess</th>
            <th>DE</th>
            <th>UGL</th>
            <th>UGU</th>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.item1}</td>
                <td>{d.item2}</td>
                <td>{d.subject}</td>
                <td>{d.course}</td>
                <td>{d.crn}</td>
                <td>{d.item6}</td>
                <td>{d.building}</td>
                <td>{d.room}</td>
                <td>{d.days}</td>
                <td>{d.time}</td>
                <td>{d.duration}</td>
                <td>{d.semester}</td>
                <td>{d.year}</td>
                <td>{d.room_type}</td>
                <td>{d.enrollment}</td>
                <td>{d.enrollment_excess}</td>
                <td>{d.enrollment_de_excess}</td>
                <td>{d.enrollment_ugl_affected}</td>
                <td>{d.enrollment_ugu_affected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
