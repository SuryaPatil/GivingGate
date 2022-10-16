import {React,useState,useEffect} from 'react'
import axios from 'axios';
const ListCorporations = () => {

    const [corps, setCorps] = useState([]); 

    const getCorps = async () => {

        try {
            const response = await axios.get("http://localhost:5000/ListCorporations")
            setCorps(response.data);
        } catch (error) {
            console.log(error);    
        }
    }

    useEffect(() => {
        getCorps();
    },[]);
    console.log(corps);
  return (
    <div>ListCorporations

<p></p>
<table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount deposited</th>
   
      </tr>
    </thead>
    <tbody>
       
    {corps.map(corp => (
        <tr>
            <td>{corp.name}</td>
            <td>{corp.amount_deposited}</td>
            
        </tr>
    ))}
      
    </tbody>
  </table>

    </div>
    
  )
}

export default ListCorporations