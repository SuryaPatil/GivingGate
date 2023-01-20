import { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers'
const contractABI = require("../utils/contract.json");
const contractAddress = "0x6530500A73bC2EB655C714Fe90B04fFA1b408D03"

const Apply = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email)
    
        let data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "address":address
        }

        axios
      .post("http://localhost:5000/Apply", data)
      .then(res => {
        if (!firstName || !lastName || !email || !address) return;
        
      })
      .catch(error => {
            console.log(error);
      })

        
        }

    return (
      
        <section className='section'
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
          <h1>Giving Gate: A decentralized charity for ex-felons</h1>
          <h5>Application</h5>
          <form className='form' onSubmit={handleSubmit}>
            
            <div className='form-row'>
              <label htmlFor='firstName' className='form-label'>
                First Name: 
              </label>
              <span>     </span>
              <input
                type='text'
                className='form-input'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='form-row'>
              <label htmlFor='lastName' className='form-label'>
                Last Name: 
              </label>
              <span>     </span>
              <input
                type='text'
                className='form-input'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                Email: 
              </label>
              <span>     </span>
              <input
                type='email'
                className='form-input'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-row'>
              <label htmlFor='address' className='form-label'>
                Wallet Address: 
              </label>
              <span>     </span>
              <input
                type='address'
                className='form-input'
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </form>
        </section>
      );
}
export default Apply;