import './App.css';
import Header from './Components/Header';
import * as React from 'react';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import TaskManager from './Components/TaskManager';
import AddTask from './Components/AddTask';
import CompleteTask from './Components/CompleteTask';
// import CurrDate from './Components/CurrDate';
import UpdateTask from './Components/UpdateTask';


function App() {
  return (
   
     <div>
           

    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<AddTask/>}/>
    <Route path='/update/:id' element={<UpdateTask/>}/>

      <Route path='/Complete' element={<CompleteTask/>}/>
      <Route path='/TaskMan' element={<TaskManager/>}/>
      {/* <Route path='/contact' element={<Contact/>}/> */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
