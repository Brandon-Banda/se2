import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect(()=> {
    fetch('http://localhost:8800/')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

  return (
      <div style={{padding: "50px"}}>
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
            {data.map((d,i) => (
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
  )
}

export default App
