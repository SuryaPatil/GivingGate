import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Corporations = () => {
    const [UserLogin, setUserLogin] = useState('');
    const [Deposit, setDeposit] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(UserLogin, Deposit)

        let data = {
            "UserLogin": UserLogin,
            "Deposit": Deposit,
        }

        axios
            .post("http://localhost:5000/Corporations", data)
            .then(res => {
                if (!UserLogin || !Deposit) return;

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
                    <label htmlFor='Deposit' className='form-label'>
                        Deposit
                    </label>
                    <input
                        type='Deposit'
                        className='form-input'
                        id='Deposit'
                        value={Deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                    />
                </div>

                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
            </form>
        </section>
    );
}

export default Corporations;