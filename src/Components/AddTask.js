import React, { useState } from "react";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const AddTask = () => {
  let date = moment().format();
  let new_date = date.split("T");

  let dt = moment(new_date[0], "YYYY-MM-DD");
  let da = dt.format("DD-MM-YYYY");

  const [state, setstate] = useState({
    Task: "",
    DueDate: "",
    Status:"Pending",
  });
  const[res,setres]=useState("false");
  const navigate = useNavigate();

  

  const PostData = () => {
    axios
      .post("http://localhost:3006/Tasks", state)
      .then((res) => {
        console.log("Data Send Successfully");
        setres("true");
      })
      .then((err) => console.log(err));
  };

  const rescheck = ()=> {
           if(res==="true"){
             setTimeout(() => {
              navigate("/TaskMan");
            }, 2000); 
          
          
            return(
              <div className="alert alert-success">Task Added Successfully</div>
            )
           }
           else if(res==="fal")
           {
            
         
         
           return(
             <div className="alert alert-danger">Invalid Date</div>
           )
          }
  }

  const SaveData = (event) => {
    event.preventDefault();
    let due = moment(state.DueDate, "YYYY-MM-DD");
    let duedate = due.format("DD-MM-YYYY");

    const arr = duedate.split("-");
    //  console.log(arr);

    const arr2 = da.split("-");
    //  console.log(arr2);
    if (arr[0] === arr2[0] && arr[1] === arr2[1] && arr[2] === arr2[2]) {
      // console.log(state);
      PostData();
    } else if (arr[1] === arr2[1] && arr[2] === arr2[2]) {
      if (arr[0] > arr2[0]) {
        // console.log(state);
        PostData();
      } else {
        console.log("no");
        setres("fal");
      }
    }
    //  else if(arr[0]!=arr2[0] && arr[1]!=arr2[1] && arr[2]!=arr2[2])
    //  {
    else if (arr[0] > arr2[0] && arr[1] > arr2[1] && arr[2] > arr2[2]) {
      // console.log(state);
      PostData();
    }

    //  }
    else if (arr[0] >= arr2[0] && arr[1] > arr2[1] && arr[2] >= arr2[2]) {
      // console.log(state);
      PostData();
    } else if (arr[0] > arr2[0] && arr[1] === arr2[1] && arr[2] === arr2[2]) {
      console.log("due date must be greater than today date");
      setres("fal")
    } else if (arr[0] > arr2[0] && arr[1] < arr2[1] && arr[2] === arr2[2]) {
      console.log("due date must be greater than today date");
      setres("fal")
    } else if (arr[0] < arr2[0] && arr[1] === arr2[1] && arr[2] === arr2[2]) {
      console.log("due date must be greater than today date");
      setres("fal")
    }
  };
  const Handler = (event) => {
    const { name, value } = event.target;
    setstate({ ...state, [name]: value });
  };
  return (
    <div>
   
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={false} sx={{ maxWidth: "100%" }}>
          <CssBaseline />
          
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // maxWidth: "5000px"
            }}
          >
          <div>
             {rescheck()}
              </div>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AddTaskIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Task
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
      <div className="Container">
        <form onSubmit={SaveData}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <label for="exampleFormControlInput1" className="form-label">
                Task
              </label>
              <input
                required
                type="text"
                className="form-control"
                onChange={Handler}
                name="Task"
                placeholder="Enter The Task"
              />
            </div>
            <div className="col-md-3"></div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <label for="exampleFormControlInput1" className="form-label">
                Due Date
              </label>
              <input
                required
                type="date"
                className="form-control"
                onChange={Handler}
                name="DueDate"
                placeholder="Select Date"
              />
            </div>
            <div className="col-md-3"></div>
          </div>

          <br />
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <input
                type="submit"
                className="btn btn-primary "
                style={{ width: "100%" }}
                value="Add Task"
                // onClick={getDate}
              ></input>
            </div>
            <div className="col-md-3"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
