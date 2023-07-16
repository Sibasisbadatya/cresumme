import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from "./Modal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Skill.css'

const Project = () => {

    const handlecopy = () => {
        navigator.clipboard.writeText(userID);
        alert("UserID is copied!!")
    }
    const nextPage = () => {
        window.location.href = "./Final";
    }
    const userID = window.localStorage.getItem("ResumeID");
    const getElem = async () => {
        const res1 = await fetch("https://cresume-backend.onrender.com/showproject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userID
            })
        })

        const data1 = await res1.json();
        console.log(data1);
        setList(data1.skills);
    }

    const [list, setList] = useState([]);
    const [skill, setSkill] = useState("");
    const [temptask, setTemptask] = useState(null);
    const [showNote, setShowNote] = useState(false);
    const [isHover, setIshover] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [pretask, setPretask] = useState("");
    const Hoveron = (e) => {
        setIshover(true);
    }
    const Hoveroff = (e) => {
        setIshover(false);
    }
    const closeNote = () => {
        setShowNote(false);
    }

    const skillname = (e) => {
        setSkill(e.target.value);
    }
    const addList = async (e) => {
        e.preventDefault();
        setSkill("");
        console.log("clicked");
        closeNote();
        if (!skill) {
            alert("Enter your notes Properly");
        }
        else if (temptask && !isEdit) {
            list.map(async (elem) => {
                if (elem.id == temptask) {
                    console.log(elem.id);
                    const res = await fetch("https://cresume-backend.onrender.com/updateskills", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            uid: userID, id: elem.id, skill
                        })
                    })
                }
                getElem();
                return elem;
            }
            )
            setShowNote(false);
            setIsEdit(true);
            setSkill("");
            setPretask(null);
        }
        else {
            const allTask = { id: new Date().getTime().toString(), skill }
            const res = await fetch("https://cresume-backend.onrender.com/addskills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: userID, id: new Date().getTime().toString(), skill
                })
            })
            getElem();
        }
    };
    // delete item
    const deleteItem = (async (index) => {
        console.log(index);
        const res = await fetch("https://cresume-backend.onrender.com/deleteskills", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: userID, id: index
            })
        })
        getElem();
    })
    // update item
    const UpdateItem = (async (id) => {
        setTemptask(id);
        const tobeupdatetask = list.find((elem) => {
            return elem.id === id;
        });
        console.log(tobeupdatetask);
        setIsEdit(false);
        setSkill(tobeupdatetask.skill);
        console.log(temptask);
        setShowNote(true);
    })
    useEffect(() => {
        getElem();
    }, [list]);

    return (
        <>
            <div className='addIcon'>
                <span><b>Add Your Skills Here</b></span>
                <div className='ctcb'>
                    <b>{userID}</b>
                    <button className='buttonc' onClick={handlecopy}>Copy!</button>
                    <Button onClick={() => { setShowNote(true) }} className="addnotebtn"> <AddCircleRoundedIcon className="addnoteicon" sx={{ fontSize: "70px" }} /></Button>
                </div>

                <br /><br />
                {showNote && <Modal closeNote={closeNote} name={skill} inpskill={skillname} addlist={addList} tobeupdate={pretask} />}
            </div>
            <div className="mainNotedivS">
                {
                    list.map((elem, index) => {
                        return (
                            <>
                                <div className="indnote-skill" onMouseEnter={Hoveron}
                                    onMouseOut={Hoveroff}>
                                    <div className='dataski'>
                                        <li className='pname'><span>{elem.skill}</span></li>
                                    </div>
                                    <div className="delandedit" key={elem.id}><DeleteIcon sx={{ fontSize: "25px" }} onClick={() => { deleteItem(elem.id) }} style={{ cursor: "pointer", color: "red" }} /><EditIcon sx={{ fontSize: "25px" }} onClick={() => { UpdateItem(elem.id) }} style={{ cursor: "pointer", color: "#1B1464" }} /></div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <button className='nest-page' onClick={nextPage}>Next</button>
        </>
    )
}

export default Project
