import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";


function App() {
  const [task, setTask] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [status, setStatus] = useState("Incomplete");

  const inputRef = useRef(null);

  const handleAddTask = () => {
    axios
      .post("http://localhost:8000/add-tasks", { task, status })
      .then((res) => {
        axios
          .get("http://localhost:8000/get-tasks")
          .then((res) => setTaskData(res.data))
          .catch((err) => {}); //console.log(err)
      })
      .catch((err) => {}); //console.log(err)

    inputRef.current.value = "";
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/delete-task/${id}`)
      .then((res) => {
        axios
          .get("http://localhost:8000/get-tasks")
          .then((res) => setTaskData(res.data))
          .catch((err) => {}); //console.log(err)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-tasks")
      .then((res) => setTaskData(res.data))
      .catch((err) => {}); //console.log(err)
  }, []);

  const handleStatus = (id, status) => {
    axios
      .post(`http://localhost:8000/update-status/${id}`, {status})
      .then((res) => {
        axios
          .get("http://localhost:8000/get-tasks")
          .then((res) => setTaskData(res.data))
          .catch((err) => {}); //console.log(err)
      })
      .catch((err) => {});  //console.log(err)
  };

  return (
    <div>
      <div style={{ margin: "auto", padding: "40px 20px", width: "50%" }}>
        <div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
          <TextField
            type="text"
            placeholder="enter task"
            onChange={(e) => setTask(e.target.value)}
            ref={inputRef}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <br />
          <Button onClick={handleAddTask} variant="contained" color="inherit">
            Add Task
          </Button>
        </div>
      </div>
      <div style={{ margin: "auto", width: "50%" }}>
        <TableContainer component={Paper} style={{ maxWidth: 700 }}>
          <Table aria-label="customized table">
            <TableHead style={{ background: "black" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>
                  <strong>SI</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>TASK</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>STATUS</strong>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <strong>DELETE</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.length === 0 ? (
                <h4>Empty</h4>
              ) : (
                taskData.map((task, index) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell >{index + 1}</TableCell>

                        <TableCell>{task.task}</TableCell>
                        <TableCell >
                          <Select
                            value={task.status}
                            onChange={(e) =>
                              handleStatus(task._id, e.target.value)
                            }
                          >
                            <MenuItem value={"Complete"}>Complete</MenuItem>
                            <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDelete(task._id)}
                            variant="outlined"
                            color="error"
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  );
}

export default App;
