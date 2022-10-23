import {React, useEffect, useState} from 'react'
import axios from 'axios'
const ListApplicants = () => {

    const [apps, setApps] = useState([]); 

    const getApps = async () => {

        try {
            const response = await axios.get("http://localhost:5000/Apply")
            setApps(response.data);
        } catch (error) {
            console.log(error);    
        }
    }

    const approveApp = async (id) => {
      try{
          const approveApp = await axios.delete(`http://localhost:5000/listApplicants/${id}`)
          console.log(approveApp);
          setApps(apps.filter(app => app.id !== id));

      }
      catch( err ){
        console.error(err.message); 
      }
    }

    useEffect(() => {
      getApps();
  },[]);

  console.log(apps);

  
  return (
    <div>ListApplicants
    <p></p>
<table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
       
    {apps.map(app => (
        <tr key ={app.id}>
            <td>{app.firstname}</td>
            <td>{app.lastname}</td>
            <td>{app.email}</td>
            <td>{<button onClick={() => approveApp(app.id)}>Approve</button> }</td>
            
        </tr>
    ))}
      
    </tbody>
  </table>


    </div>
    
  )
}

export default ListApplicants;