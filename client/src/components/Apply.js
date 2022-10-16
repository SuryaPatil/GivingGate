import { useState } from 'react';
import axios from 'axios';

const Apply = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email)
    
        let data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
        }

        axios
      .post("http://localhost:5000/Apply", data)
      .then(res => {
        if (!firstName || !lastName || !email) return;
        
      })
      .catch(error => {
            console.log(error);
      })

        
        }

    return (
        <section className='section'>
          <form className='form' onSubmit={handleSubmit}>
            <h5>Register</h5>
            <div className='form-row'>
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
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
                Last Name
              </label>
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
                Email
              </label>
              <input
                type='email'
                className='form-input'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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