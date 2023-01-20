import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers'
const contractABI = require("../utils/contract.json");
const contractAddress = "0x9c502f8CDEBeB59fbED35093D0225418395F6122"

export const Corporations = () => {
    const [name, setname] = useState('');
    const [amount_deposited, setamount_deposited] = useState('');
    const [corps, setCorps] = useState([]); 
    const [accountBalance, setAccountBalance] = useState("");
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        if(!window.ethereum) {
            return;
        }
        getAccountBalance()
    }, [])

    const getAccountBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const balance = await provider.getBalance(contractAddress);
        setAccountBalance(ethers.utils.formatEther(balance))
    }

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
           const txn = await contract.donate(name, {value: ethers.utils.parseEther(amount_deposited.toString()), 
           gasLimit: 500000});
            await txn.wait();
            console.log("mined ", txn.hash);
            console.log("deposit made!"); 
            } 
             
          } catch (error) {
            console.log(error);
          }
    }
    const getDonations = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const buyMeACoffee = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
            
            console.log("fetching donations from the blockchain..");
            const donations = await buyMeACoffee.getDonations();
            console.log("fetched!");
            setDonations(donations);
            console.log(donations)
          } else {
            console.log("Metamask is not connected");
          }
          
        } catch (error) {
          console.log(error);
        }
      };

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
        getDonations(); 
    },[]);
    //console.log(corps);

    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    const getDate = async (timestamp) => {

    //    const date = new Date(timestamp).toString();
     //   return date; 

        return timestamp;

    }
    return (
        
        <section className='section'
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1>Giving Gate: A decentralized charity for ex-felons</h1>
            <h2 className="balance">{accountBalance} ETH Locked</h2>
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
            {(donations.map((donation, idx) => {
        return (
          <div key={idx} style={{border:"2px solid", "borderRadius":"5px", padding: "5px", margin: "5px"}}>
            <p>At {Number(donation.timestamp.toString())}, <span style={{ fontWeight: 'bold' }}>{donation.name} </span> 
            donated <span style={{ fontWeight: 'bold' }}>{Number(ethers.utils.formatEther(donation.amount))}</span>, 
            with address {donation.from}</p>
          </div>
        )
      }))}
            
        </section>
         
    );
}

export default Corporations;
