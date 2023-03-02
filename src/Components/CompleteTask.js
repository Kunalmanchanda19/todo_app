import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2'

const CompleteTask = () => {
  let params = useParams()

    const [state,setState]=useState([]);
    const [state2,setState2]=useState(0);
    const [data,setdata]=useState({
    id:"",
    Task:"",
    DueDate:"",
    Status:"",
    });


    useEffect(() => {
      getData();
      send();
      getData();
      
      

      return () => {
        
        // second
      }
    }, [data])
    
    

   

  
    const getData=( async()=>{
        try{
         let response = await axios.get("http://localhost:3006/Tasks")
        //  console.log(response);
         setState(response.data);
        //  
       }
        catch(error){ console.log(error)}
     })

     const finishtask=(id)=>{


      Swal.fire({
        title: 'Do you want to Mark the Task as Completed ',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Don't Mark`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
         
          Swal.fire('Marked Completed!', '', 'success')
          axios.get("http://localhost:3006/Tasks/"+id)
          .then((res)=>{
           // console.log(res.data)
           setdata({Task:res.data.Task,DueDate:res.data.DueDate,Status:"Completed",id:res.data.id});
           
          
 })
          .then((err)=>{
           console.log(err)
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      


     
      }

      const send=()=>
      { console.log(data);
        axios.put("http://localhost:3006/Tasks/"+data.id,data)
        .then((res)=>{
         console.log("done")
        })
        .then((err)=>{
         console.log(err)
        })
        
      }
    //  const deleteRecord=(id)=>{
    //   setState2(0)
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       axios.delete("http://localhost:3006/Tasks/"+id)
    //       .then((res)=>{
    //         // console.log(res)
    //         setState2(1)
    //         Swal.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //         )
    //       })
    //       .then((err)=>{
    //         console.log(err)
    //       })
         
    //     }
    //   else {
    //       Swal.fire(
    //         'Data is Safe',
    //         '',
    //         'info'
    //       )
    //     }
    //   })
    //  }

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
                </div>
                <br />
                <br />

                    <table border="1" width="100%">
                        <thead>
                            <tr>
                            {/* <th>Id</th> */}
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Complete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                           {state.map((item,index)=>
                            <tr key={index}>
                            {/* <td>{item.id}</td> */}
                                <td>{item.Task}</td>
                                <td>{item.DueDate}</td>
                                <td>{item.Status}</td>
                               
                               
                                <td>
                               
                                     <a href="javascript:void(0)" className='btn btn-success' onClick={()=>{finishtask(item.id)}}>Complete Task</a>
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

export default CompleteTask;