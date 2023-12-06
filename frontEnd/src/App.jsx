// App.jsx

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

// Check with input errors from the Data file format CBM
const validateInput = (category, value) => {
  if (!value) {
    console.error(`Error! Value is required!`);
    alert(`Please provide a value!`);
    return false;
  }

  if (value < 0) {
    console.error(`Error! Value cannot be a negative!`);
    alert(`Input Error: Value must not be a negative!`);
    return false;
  }
  switch (category) {
    case "Item1":
      if (value != "5") {
        console.error("Error in Item1! Range outside of 5 given!");
        alert("Input Error: Item1 must only contain the value 5! ");
        return false;
      }
      break;

    case "Item2":
      if (value < 0 || value > 999999) {
        console.error(
          "Error in Item2! Range outside of acceptable values is given!"
        );
        alert("Input Error: Item2 must be in range of 0-999999! ");
        return false;
      }
      break;

    // This case doesnt seem to catch the errors. I am not sure why.
    case "Subject":
      if (!/^[A-Za-z]{4}$/.test(value) || /[^A-Za-z]/.test(value)) {
        console.error("Error in Subject! Invalid value provided!");
        alert(
          'Input Error: Subject must be in "AAAA" format and cannot contain numbers!'
        );
        return false;
      }
      break;

    case "Course":
      if (!/^\d{4}$/.test(value) || isNaN(value)) {
        console.error("Error in Course! Invalid value provided!");
        alert(
          'Input Error: Course must be in "0000" format and cannot contain letters!'
        );
        return false;
      }
      break;

    case "CRN":
      if (!/^\d{5}$/.test(value) || isNaN(value)) {
        console.error("Error in CRN! Invalid value provided!");
        alert(
          'Input Error: CRN must be in "00000" format and cannot contain letters!'
        );
        return false;
      }
      break;

    // Building and Room must match facilities inventory file? Change as needed!
    case "Building":
      if (!/^\d{4}$/.test(value) || isNaN(value)) {
        console.error(
          "Error in Building! Range outside of acceptable values is given!"
        );
        alert(
          'Input Error: Building must be in "0000" format and cannot contain letters!'
        );
        return false;
      }
      break;

    case "Room":
      if (!/^\d{3}$/.test(value) || isNaN(value)) {
        console.error(
          "Error in Room! Range outside of acceptable values is given!"
        );
        alert(
          'Input Error: Room must be in "000" format and cannot contain letters!'
        );
        return false;
      }
      break;

    case "Days":
      if (value < 1 || isNaN(value)) {
        console.error(
          "Error in Days! Range outside of acceptable values is given!"
        );
        alert("Input Error: Days must contain numbers 1-7!");
        return false;
      }
      if (String(value).includes("7")) {
        alert("Questionable Value: Days contains a combination of 7 (Sunday)!");
      }
      break;

    case "Time":
      if (value < 700 || value > 2100 || !/^\d{4}$/.test(value)) {
        alert(
          'Questionable Value: Start time should not be before 0700 or after 2100 and must be in "0000" format!'
        );
      }
      if (isNaN(value)) {
        console.error("Error in Time! Time is not a numerical value");
        alert("Input Error: Time must be a numerical value!");
        return false;
      }
      break;

    case "Duration":
      if (value > 240 || value < 540) {
        alert(
          "Questionable Value: Duration should not be greater than 240 and less than 540!"
        );
      }
      if (value > 540) {
        console.error("Error in Duration! Duration is above 540!");
        alert("Input Error: Duration must not be above 540!");
        return false;
      }
      break;

    case "Semester":
      if (value < 1 || isNaN(value) || !/^\d{1}$/.test(value)) {
        console.error("Error in Semester! Semester is not a numerical value");
        alert(
          "Input Error: Semester must be a numerical value and cannot be 0!"
        );
        return false;
      }
      break;

    case "Year":
      if (isNaN(value) || !/^\d{4}$/.test(value)) {
        console.error("Error in Year! Year is not a numerical value");
        alert(
          'Input Error: Year must be in "0000" format and must be a numerical value!'
        );
        return false;
      }
      break;

    //  Must match value on Facilities Inventory File?
    case "Room_Type":
      if ((value = "000" || !/^\d{3}$/.test(value))) {
        console.error("Error in Room Type! Value is 000");
        alert(
          'Input Error: Room Type must be in "000" format and must not be "000"!'
        );
        return false;
      }
      break;

    // Questionable Value: Sum of all levels, including Items #18 and #19, greater than 200 or less than 001
    // Error Value: Any non-numerical value
    case "Enrollment":
      if ((value = "000" || value > 200)) {
        console.error("Error in Enrollment! Value is 000");
        alert("Input Error: Enrollment must not be 000 or above 200!");
        return false;
      }
      break;

    case "Enrollment_Excess":
      if (value > 40) {
        alert("Questionable Value: Enrollment Excess must not be above 40!");
      }
      if (isNaN(value)) {
        console.error(
          "Error in Enrollment_Excess! Enrollment Excess is not a numerical value"
        );
        alert("Input Error: Enrollment Excess must be a numerical value!");
        return false;
      }
      break;

    case "Enrollment_De_Excess":
      if (value > 40) {
        alert("Questionable Value: Enrollment Excess must not be above 40!");
      }
      if (isNaN(value)) {
        console.error(
          "Error in Enrollment_Excess! Enrollment Excess is not a numerical value"
        );
        alert("Input Error: Enrollment Excess must be a numerical value!");
        return false;
      }
      break;

    // Questionable Value: Enrollment_UGL_Affected and Enrollment_UGU_Affected should be the same as Enrollment
    // Error Value: Any non-numerical value

    case "Enrollment_UGL_Affected":
      if (isNaN(value)) {
        console.error(
          "Error in Enrollment_UGL_Affected! Enrollment_UGL_Affected is not a numerical value"
        );
        alert(
          "Input Error: Enrollment UGL Affected must be a numerical value!"
        );
        return false;
      }
      break;

    case "Enrollment_UGU_Affected":
      if (isNaN(value)) {
        console.error(
          "Error in Enrollment_UGU_Affected! Enrollment_UGU_Affected is not a numerical value"
        );
        alert(
          "Input Error: Enrollment UGU Affected must be a numerical value!"
        );
        return false;
      }
      break;

    default:
      break;
  }

  return true;
};

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
  const [selectedCategory, setSelectedCategory] = useState("Item1");
  const [selectedCategory2, setSelectedCategory2] = useState("Item1");
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

    if (!validateInput(selectedCategory, searchTerm)) {
      return;
    }

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

    if (!validateInput(selectedCategory2, updatedValue)) {
      return;
    }

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
          alert("Update not successful! Please check your inputs!");
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
