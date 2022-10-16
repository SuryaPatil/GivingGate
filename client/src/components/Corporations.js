import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Corporations = () => {
    const [name, setname] = useState('');
    const [amount_deposited, setamount_deposited] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, amount_deposited)

        let data = {
            "name": name,
            "amount_deposited": amount_deposited,
        }

        axios
            .post("http://localhost:5000/Corporations", data)
            .then(res => {
                if (!name || !amount_deposited) return;

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
                    <label htmlFor='name' className='form-label'>
                        Company name
                    </label>
                    <input
                        type='text'
                        className='form-input'
                        id='name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>

                <div className='form-row'>
                    <label htmlFor='amount_deposited' className='form-label'>
                        amount_deposited
                    </label>
                    <input
                        type='amount_deposited'
                        className='form-input'
                        id='amount_deposited'
                        value={amount_deposited}
                        onChange={(e) => setamount_deposited(e.target.value)}
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
