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
        <th>Approved</th>
      </tr>
    </thead>
    <tbody>
       
    {apps.map(app => (
        <tr>
            <td>{app.firstname}</td>
            <td>{app.lastname}</td>
            <td>{app.email}</td>
            
        </tr>
    ))}
      
    </tbody>
  </table>


    </div>
    
  )
}

export default ListApplicants;