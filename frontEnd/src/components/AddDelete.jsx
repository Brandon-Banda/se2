import { useState } from "react";
import "./AddDelete.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddDelete() {
  const [inputs, setInputs] = useState({
    item1: "",
    item2: "",
    subject: "",
    course: "",
    crn: "",
    item6: "",
    building: "",
    room: "",
    days: "",
    time: "",
    duration: "",
    semester: "",
    year: "",
    room_type: "",
    enrollment: "",
    enrollment_excess: "",
    enrollment_de_excess: "",
    enrollment_ugl_affected: "",
    enrollment_ugu_affected: "",
  });

  const [data, setData] = useState("");
  const [deleteValue, setDeleteValue] = useState("");

  const handleAddChange = (e) => {
    const { value } = e.target;
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const handleDeleteChange = (e) => {
    const { value } = e.target;
    setDeleteValue(value);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(inputs, null, 2);
    setInputs({ ...inputs });
    setData(jsonData);
    // instead of setting data i think i needa make separate states and ptu them in the axios object

    // https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples
    console.log("Submitting inputs to express server");
    console.log(data);

    // https://stackoverflow.com/questions/45980173/react-axios-network-error

    axios
      .post("http://localhost:8800/add", inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    const crn = deleteValue;
    console.log("CRN is " + crn);
    try {
      axios.delete(`http://localhost:8800/delete/${crn}`);
      alert(crn + " has been deleted from the DB.");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="page">
      <Link to="/">Home</Link>
      <div className="main">
        <div className="addDeletePageContainer">
          <div className="addContainer">
            <form onSubmit={handleAddSubmit}>
              <label className="custom-field">
                <input
                  type="text"
                  name="item1"
                  value={inputs.item1}
                  onChange={handleAddChange}
                />
                <span className="placeholder">Item1</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="item2"
                  onChange={handleAddChange}
                  value={inputs.item2}
                />
                <span className="placeholder">Item2</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="subject"
                  onChange={handleAddChange}
                  value={inputs.subject}
                />
                <span className="placeholder">subject</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="course"
                  onChange={handleAddChange}
                  value={inputs.course}
                />
                <span className="placeholder">course</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="crn"
                  onChange={handleAddChange}
                  value={inputs.crn}
                />
                <span className="placeholder">crn</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="item6"
                  onChange={handleAddChange}
                  value={inputs.item6}
                />
                <span className="placeholder">item6</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="building"
                  onChange={handleAddChange}
                  value={inputs.building}
                />
                <span className="placeholder">building</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="room"
                  onChange={handleAddChange}
                  value={inputs.room}
                />
                <span className="placeholder">room</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="days"
                  onChange={handleAddChange}
                  value={inputs.days}
                />
                <span className="placeholder">days</span>
              </label>
              <label className="custom-field">
                <input
                  type="text"
                  name="time"
                  onChange={handleAddChange}
                  value={inputs.time}
                />
                <span className="placeholder">time</span>
              </label>
              <input type="submit" className="button" value="Create an Entry" />
            </form>
          </div>
          {/* ----------------------------THIS IS WHERE I WANT THE BREAK */}
          <div className="addContainer">
            <label className="custom-field">
              <input
                type="text"
                name="duration"
                onChange={handleAddChange}
                value={inputs.duration}
              />
              <span className="placeholder">duration</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="semester"
                onChange={handleAddChange}
                value={inputs.semester}
              />
              <span className="placeholder">semester</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="year"
                onChange={handleAddChange}
                value={inputs.year}
              />
              <span className="placeholder">year</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="room_type"
                onChange={handleAddChange}
                value={inputs.room_type}
              />
              <span className="placeholder">room_type</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="enrollment"
                onChange={handleAddChange}
                value={inputs.enrollment}
              />
              <span className="placeholder">enrollment</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="enrollment_excess"
                onChange={handleAddChange}
                value={inputs.enrollment_excess}
              />
              <span className="placeholder">enrollment_excess</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="enrollment_de_excess"
                onChange={handleAddChange}
                value={inputs.enrollment_de_excess}
              />
              <span className="placeholder">enrollment_de_excess</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="enrollment_ugl_affected"
                onChange={handleAddChange}
                value={inputs.enrollment_ugl_affected}
              />
              <span className="placeholder">enrollment_ugl_affected</span>
            </label>
            <label className="custom-field">
              <input
                type="text"
                name="enrollment_ugu_affected"
                onChange={handleAddChange}
                value={inputs.enrollment_ugu_affected}
              />
              <span className="placeholder">enrollment_ugu_affected</span>
            </label>
          </div>
        </div>
        <div className="deleteContainer">
          <form onSubmit={handleDeleteSubmit}>
            <label className="custom-field">
              <input type="text" name="name" onChange={handleDeleteChange} />
            </label>
            <input type="submit" className="button" value="Delete a CRN" />
          </form>
        </div>
      </div>
    </div>
  );
}
