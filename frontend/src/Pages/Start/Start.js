import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Image from '../../Images/resume.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Start.css'
const Start = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        resumename: "", resumeid: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        console.log(user);
    }

    const postRegistration = async (e) => {
        e.preventDefault();
        if (user.resumename && user.resumeid) {
            return alert("Please choose any one option");
        }
        const { resumename } = user;
        const res = await fetch("https://cresume-backend.onrender.com/saveresumename", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resumename
            })
        })
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        window.localStorage.setItem("ResumeID", data.userID);
        if (data.status === 201) {
            console.log("done ");
            alert(`Let's start building your resume  ${data.userID}`);
            window.location.href = "./Personal";
        }
        else
            alert(`${data.message}`);
    }
    const postRegistrationOld = async (e) => {
        e.preventDefault();
        if (user.resumename && user.resumeid) {
            return alert("Please choose any one option");
        }
        const { resumeid } = user;
        const res = await fetch("https://cresume-backend.onrender.com/checkresumename", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resumeid
            })
        })
        const data1 = await res.json();
        if (data1.status === 200) {
            alert("Continue your resume")
            window.location.href = "./Personal";
            window.localStorage.setItem("ResumeID", resumeid);
        }
        else
            alert("Resume Id alredy exist")
    }

    return (
        <>
            <div className="main-start">
                <div className='start-main'>
                    <span>Build a New Resume !!</span>
                    <span>Enter your resume name</span>
                    <input type="text" className='enter-text' value={user.resumename} name='resumename' onChange={handleInput} />
                    <button className='start-button' type='submit' onClick={postRegistration}>start</button>
                </div>
                <div className='start-old'>
                    <span>Continue your old resume !!</span>
                    <span>Enter the existing resume Id</span>
                    <input type="text" className='enter-text' value={user.resumeid} name='resumeid' onChange={handleInput} />
                    <button className='start-button' type='submit' onClick={postRegistrationOld}>start</button>
                </div>
            </div>
        </>
    )
}

export default Start
