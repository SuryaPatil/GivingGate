import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers'

const contractABI = require("../utils/contract.json");
const contractAddress = "0x7C8973fE68ae535164B14AbBbEb1d46D30537354"

export const Corporations = () => {
    const [name, setname] = useState('');
    const [amount_deposited, setamount_deposited] = useState('');
    const [corps, setCorps] = useState([]); 

    const deposit = async () => {
        const {ethereum} = window; 

        try {
            const {ethereum} = window;
      
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum, "any");
              const signer = provider.getSigner();
              const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer,
              );
            let bigNum = await contract.getBalance()
            console.log(await bigNum.toNumber())
           const txn = await contract.donate(name, {value: ethers.utils.parseEther(amount_deposited.toString()), 
           gasLimit: 500000});

            bigNum = await contract.getBalance()
            console.log(await bigNum.toNumber())

            await txn.wait();
            console.log("mined ", txn.hash);
            console.log("deposit made!"); 
            } 
             
          } catch (error) {
            console.log(error);
          }
        
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
     //   console.log(name, amount_deposited)

        let data = {
            "name": name,
            "amount_deposited": amount_deposited,
        }

        corps.map(corp => {
            if(corps.name === name){
                console.log("This company already exists");
                return null; 
            }
            return null;
        })

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
        <section className='section'
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-row'
                >
                    <label htmlFor='name' className='form-label'>
                        Company Name: 
                    </label>
                    <span>     </span>
                    <input
                        type='text'
                        className='form-input'
                        id='name'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <br></br>
                <div className='form-row'
                >
                    <label htmlFor='amount_deposited' className='form-label'>
                        Deposit Amount:   
                    </label>
                    <span>     </span>
                    <input
                        type='amount_deposited'
                        className='form-input'
                        id='amount_deposited'
                        value={amount_deposited}
                        onChange={(e) => setamount_deposited(e.target.value)}
                    />
                </div>
                <br></br>
                <div
                style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
                >
                <button type='submit' className='btn btn-block' onClick={deposit}
                >
                    Donate
                </button>
                </div>
            </form>
        </section>
    );
}

export default Corporations;
