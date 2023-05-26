import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Personal.css'
const Personal = () => {
    const userID = window.localStorage.getItem("ResumeID");
    const handlecopy = () => {
        navigator.clipboard.writeText(userID);
        alert("UserID is copied!!")
    }
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", contact: "", github: "", adress: "", linkedin: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        console.log(user);
    }
    const postRegistration = async (e) => {
        console.log("hello");
        e.preventDefault();
        const { name, email, contact, adress, github, linkedin, aboutyourself } = user;
        if (name && email && contact && adress && github && linkedin) {
            const res = await fetch("https://cresume-backend.onrender.com/addpersonal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // "Content-Type": "text/html"
                },
                body: JSON.stringify({
                    name, email, contact, adress, github, linkedin, aboutyourself, uid: userID
                })
            })
            console.log(res.status);
            const data = await res.json();
            console.log(data);
            window.location.href = "./Education";
        }
        else {
            alert("Plzzz fill all the details");
        }
    }
    return (
        <>
            <div className='main'>
                <div className='addIcon1'>
                    <span><b>Add Your Personal Data </b></span>
                    <div className='ctcb'>
                        <b>{userID}</b>
                        {/* <b>1bhdfd678hdt8hdt</b> */}
                        <button className='buttonc' onClick={handlecopy}>Copy!</button>
                    </div>
                </div>
                <div className='left-content'>
                    <div className='input'>  <label htmlFor="name">Name:</label>
                        <TextField className='inf' id="outlined-basic" variant="outlined" name='name' value={user.name} onChange={handleInput} /></div>
                    <div className="input">    <label htmlFor="adress">Adress:</label>
                        <TextField className='inf' id="outlined-basic" variant="outlined"
                            name='adress' value={user.adress} onChange={handleInput} /></div>
                    <div className="input">  <label htmlFor="contact">Contact:</label>
                        <TextField className='inf' id="outlined-basic" variant="outlined"
                            name='contact' value={user.contact} onChange={handleInput} /></div>
                </div>
                <div className='right-content'>
                    <div className="input">  <label htmlFor="email">Email:</label>
                        <TextField className='inf' id="outlined-basic" variant="outlined"
                            name='email' value={user.email} onChange={handleInput} /></div>
                    <div className="input">  <label htmlFor="github">Github link:</label>
                        <TextField className='inf' id="outlined-basic" variant="outlined"
                            name='github' value={user.github} onChange={handleInput} /></div>
                    <div className="input">  <label htmlFor="linkedin">LinkedIn Link:</label>
                        <TextField className='inf' id="outlined-basic" variant="outlined"
                            name='linkedin'  value={user.linkedin} onChange={handleInput} /></div>
                </div>
            </div>
            <div className='about'>
                <label htmlFor="about">Write about yourself:</label>
                <textarea className="form-control aboutarea" id="exampleFormControlTextarea3" rows="7" name='aboutyourself' value={user.aboutyourself} onChange={handleInput} ></textarea>
            </div>
            <button className='nest-page' onClick={postRegistration}>Next</button>
        </>
    )
}

export default Personal
