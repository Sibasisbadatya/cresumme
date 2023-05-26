import React, { useEffect, useState, useRef } from 'react'
import './Final.css';
import ReactPrint from 'react-to-print';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
const Final = () => {
    const ref = useRef();
    const userID = window.localStorage.getItem("ResumeID");
    const [resumeData, setResumeData] = useState([]);
    const [personalData, setPersonalData] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [skillData, setSkillData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    const getElem = async () => {
        console.log("reaching");
        const res1 = await fetch("https://cresume-backend.onrender.com/showproject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userID
            })
        })
        // console.log(res1);
        const data1 = await res1.json();
        console.log(data1.personal[0]);
        setResumeData(data1);
        setEducationData(data1.edu);
        setPersonalData(data1.personal[data1.personal.length - 1]);
        setSkillData(data1.skills);
        setProjectData(data1.project);
        console.log("seen");
        console.log(personalData);
        console.log(educationData);
    }
    const Printalert = () => {
        alert("Check if the content are in same page and responsive");
    }
    useEffect(() => {
        getElem();
    }, [resumeData]);
    return (
        <>
            <div className='final-resume' ref={ref}>
                <div className='head-resume'>
                    <div className='left-info' >
                        <b>{personalData.name}</b>
                        <span>{personalData.adress}</span>
                        <p>{personalData.aboutyourself}</p>
                    </div>
                    <div className='right-info' >
                        <a href={personalData.email}><EmailIcon /> {personalData.email}</a>
                        <a href={"tel:" + personalData.contact}><CallIcon /> {personalData.contact}</a>
                        <a href={personalData.github}><GitHubIcon /> {personalData.github}</a>
                        <a href={personalData.linkedin}><LinkedInIcon /> {personalData.linkedin}</a>
                    </div>
                </div>
                <hr />
                <div className='body-resume'>
                    <b className='proheading'><u>Education Details</u></b>
                    <div className='edu-resume'>
                        {
                            educationData.map((elem) => {
                                return (
                                    <>
                                        <div className='ind-edu-res'>
                                            <li className='eddeg'>{elem.degree}</li>
                                            <li className='edgrade'><i>{elem.grade}</i></li>
                                            <li className='edname'><span>{elem.eduname}</span></li>
                                            <li className='edloc'><span>{elem.eduadress}</span></li>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <b className='proheading'><u>Personal Projects</u></b>
                    <div className='project-resume' >
                        {
                            projectData.map((elem, key) => {
                                return (
                                    <>
                                        <div className='ind-pro-res'>
                                            <li className='profname'><span>{key + 1}.{elem.pname}</span></li>
                                            <a href={elem.pgithublink} className='progit'><span><GitHubIcon /><b className='linkpro'>Github link:</b> <span className='linktext'>{elem.pgithublink}</span></span></a>
                                            <a herf={elem.phostlink} className='prohost'><span><LanguageIcon /> <b className='linkpro'>Hosted link:</b><span className='linktext'> {elem.phostlink}</span></span></a>
                                            <li className='prodescpr'><span><b>Description:</b> {elem.pdescr}</span></li>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <b className='proheading'><u>Skills</u></b>
                    <div className='skill-resume' >
                        {
                            skillData.map((elem, key) => {
                                return (
                                    <>
                                        <div className='ind-pro-skill'>
                                            {key + 1 + "."} {elem.skill}
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ReactPrint trigger={() => <button className='printbtn' onClick={Printalert}>Print</button>} content={() => ref.current} />
        </>
    )
}

export default Final
