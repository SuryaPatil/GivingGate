import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Contact = () => {
    const [UserLogin, setUserLogin] = useState('');
    const [UserPassKey, setUserPassKey] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(UserLogin, UserPassKey)

        let data = {
            "UserLogin": UserLogin,
            "UserPassKey": UserPassKey,
        }
    }
  return (
      <section className='section'>
          <form className='form' onSubmit={handleSubmit}>
              <h5>Register</h5>
              <div className='form-row'>
                  <label htmlFor='UserLogin' className='form-label'>
                      UserLogin
                  </label>
                  <input
                      type='text'
                      className='form-input'
                      id='UserLogin'
                      value={UserLogin}
                      onChange={(e) => setUserLogin(e.target.value)}
                  />
              </div>

              <div className='form-row'>
                  <label htmlFor='UserPassKey' className='form-label'>
                      UserPassKey
                  </label>
                  <input
                      type='UserPassKey'
                      className='form-input'
                      id='UserPassKey'
                      value={UserPassKey}
                      onChange={(e) => setUserPassKey(e.target.value)}
                  />
              </div>

              <button type='submit' className='btn btn-block'>
                  Submit
              </button>
          </form>
      </section>
  );
  
}
export default Contact; 