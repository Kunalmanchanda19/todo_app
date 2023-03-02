import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'





const TaskManager = () => {
    const [state,setState]=useState([]);
    const [state2,setState2]=useState(0);


    useEffect(() => {
      getData()
    
      return () => {
        // second
      }
    }, [state2])
    
    

   

  
    const getData=( async()=>{
        try{
         let response = await axios.get("http://localhost:3006/Tasks")
        //  console.log(response);
         setState(response.data);
        //  
       }
        catch(error){ console.log(error)}
     })
     const deleteRecord=(id)=>{
      setState2(0)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:3006/Tasks/"+id)
          .then((res)=>{
            // console.log(res)
            setState2(1)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
          .then((err)=>{
            console.log(err)
          })
         
        }
      else {
          Swal.fire(
            'Data is Safe',
            '',
            'info'
          )
        }
      })
     }



    useEffect(()=>{
      
        getData();
    },[state2])

  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="head">
                      
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                <br />
                <div style={{float:"right"}}>
                {/* <input type="submit" value="Add User" onClick={adduser} className="btn btn-primary" /> */}
                </div>
                <br />
                <br />

                    <table border="1" width="100%">
                        <thead>
                            <tr>
                            {/* <th>Id</th> */}
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                           {state.map((item,index)=>
                            <tr key={index}>
                            {/* <td>{item.id}</td> */}
                                <td>{item.Task}</td>
                                <td>{item.DueDate}</td>
                               
                               
                                <td>
                                <Link href="" className='btn btn-primary' to={`/update/${item.id}`}>Edit</Link>
                            &nbsp;
                            <a href="javascript:void(0)" className='btn btn-danger' onClick={()=>{deleteRecord(item.id)}}>Delete</a>
                            &nbsp;
                           
                                </td>
                            </tr>
                           )}
                           <br/>
                        </tbody>
                    </table>
                   
                   
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    </>
  )
}

export default TaskManager;