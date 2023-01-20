import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
const contractABI = require("../utils/contract.json");
const contractAddress = "0x6530500A73bC2EB655C714Fe90B04fFA1b408D03"

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

    const approveApp = async (address) => {
      try{

        const {ethereum} = window;
      
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum, "any");
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
          );
          console.log(address);
          const txn =  await contract.sendEther('hi', address, {value: ethers.utils.parseEther('0.03'),gasLimit: 500000}) 
          await txn.wait();
          console.log("mined ", txn.hash);
        } 

       //   const approveApp = await axios.delete(`http://localhost:5000/listApplicants/${id}`)
       //   console.log(approveApp);
       //   setApps(apps.filter(app => app.id !== id));

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
    <div>Applicants
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
            <td>{<button onClick={() => approveApp(app.address)}>Approve</button> }</td>
            
        </tr>
    ))}
      
    </tbody>
  </table>


    </div>
    
  )
}

export default ListApplicants;