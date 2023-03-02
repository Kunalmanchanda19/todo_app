import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const UpdateTask = () => {

  let params = useParams()
  const navigate = useNavigate();

  console.log(params.id)
  const [state, setstate] = useState({
    id:params.id,
    Task:"",
    DueDate:"",
    Status:"Pending",
  });
  const[res,setres]=useState(false);

  const theme = createTheme();
  const rescheck = ()=> {
    if(res===true){
      setTimeout(() => {
       navigate("/TaskMan");
     }, 2000); 
   
   
     return(
       <div className="alert alert-success">Task Added Successfully</div>
     )
    }
}
  
  const Handler = (event) => {
    const { name, value } = event.target;
    setstate({ ...state, [name]: value });
  }
  useEffect(() => {
    axios.get("http://localhost:3006/Tasks/"+state.id)
    .then((res)=>{
      setstate(res.data)
      console.log(state)
    })
    .then((err)=>{
      console.log(err)
    })
    return () => {
      
    };
  }, []);

 


  const updateUser=(event)=>
  {
    event.preventDefault()
    axios.put("http://localhost:3006/Tasks/"+state.id,state)
    .then((res)=>
    {
      console.log(res.data)
      setres(true)
    })
    .then((err)=>
    {
      console.log(err)
    })
  }
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
          <div>{rescheck()}</div>
         
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AddTaskIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Task
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
      <div className="Container">
        <form onSubmit={updateUser}>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <label for="exampleFormControlInput1" className="form-label">
                Task
              </label>
              <input
              // required
              value={state.Task}
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
              // required
              value={state.DueDate}
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
                value="Update Task"
                // onClick={getDate}
              >
              </input>
            </div>
            <div className="col-md-3"></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask