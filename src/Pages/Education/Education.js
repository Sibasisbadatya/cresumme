import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import Modal from "./Modal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Education.css'

const Education = () => {
    const userID = window.localStorage.getItem("ResumeID");
    const nextPage = () => {
        window.location.href = "./Project";
    }
    const handlecopy = () => {
        navigator.clipboard.writeText(userID);
        alert("UserID is copied!!")
    }

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
        console.log(res1);
        const data1 = await res1.json();
        setList(data1.edu);
    }

    const [list, setList] = useState([]);
    const [degree, setDegree] = useState("");
    const [eduname, setEduname] = useState("");
    const [eduadress, setEduadress] = useState("");
    const [grade, setGrade] = useState("");
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

    const itemdegree = (e) => {
        setDegree(e.target.value);
    }
    const itemeduname = (e) => {
        setEduname(e.target.value);
    }
    const itemeduadress = (e) => {
        setEduadress(e.target.value);
    }
    const itemgrade = (e) => {
        setGrade(e.target.value);
    }
    const addList = async (e) => {
        e.preventDefault();
        setDegree("");
        setEduname("");
        setEduadress("");
        setGrade("");
        console.log("clicked");
        closeNote();
        if (!degree || !eduname || !eduadress || !grade) {
            alert("Enter your notes Properly");
        }
        else if (temptask && !isEdit) {
            list.map(async (elem) => {
                if (elem.id == temptask) {
                    console.log(elem.id);
                    const res = await fetch("https://cresume-backend.onrender.com/updatedu", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            uid: userID, id: elem.id,
                            degree,
                            eduname,
                            eduadress,
                            grade
                        })
                    })
                }
                getElem();
                return elem;
            }
            )
            setShowNote(false);
            setIsEdit(true);
            setDegree("");
            setEduname("");
            setEduadress("");
            setGrade("");
            setPretask(null);
        }
        else {
            const allTask = {
                id: new Date().getTime().toString(), degree,
                eduname,
                eduadress,
                grade
            }
            const res = await fetch("https://cresume-backend.onrender.com/addedu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: userID, id: new Date().getTime().toString(), degree,
                    eduname,
                    eduadress,
                    grade
                })
            })
            getElem();
        }
    };
    // delete item
    const deleteItem = (async (index) => {
        console.log(index);
        const res = await fetch("hhttps://cresume-backend.onrender.com/deletedu", {
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
        setDegree(tobeupdatetask.degree);
        setEduname(tobeupdatetask.eduname);
        setEduadress(tobeupdatetask.eduadress);
        setGrade(tobeupdatetask.grade);
        console.log(temptask);
        // console.log("todotask updated", todotask);
        setShowNote(true);
    })
    useEffect(() => {
        getElem();
    }, [list]);

    return (
        <>
            <div className='addIcon'>
                <span><b>Add Your Education Details </b></span>
                <div className='ctcb'>
                    <b>{userID}</b>
                    <button className='buttonc' onClick={handlecopy}>Copy!</button>
                    <Button onClick={() => {
                        console.log("clicked add");
                        setShowNote(true)
                    }} className="addnotebtn"> <AddCircleRoundedIcon className="addnoteicon" sx={{ fontSize: "70px" }} /></Button>
                </div>

                <br /><br />
                {showNote && <Modal closeNote={closeNote} deg={degree} edu={eduname} adr={eduadress} grd={grade} inpdegree={itemdegree} inpadress={itemeduadress} inpname={itemeduname} inpgrade={itemgrade} addlist={addList} tobeupdate={pretask} />}
            </div>
            <div className="mainNotediv">
                {
                    list.map((elem, index) => {
                        return (
                            <>
                                <div className="indnotedu" onMouseEnter={Hoveron}
                                    onMouseOut={Hoveroff}>
                                    <div className='datasedu'>
                                        <li className='eddeg'><b>{elem.degree}</b></li>
                                        <li className='edname'><SchoolIcon />{elem.eduname}</li>
                                        <li className='edloc'><AddLocationIcon />{elem.eduadress}</li>
                                        <li className='edgrade'><GradeIcon />{elem.grade}</li>
                                    </div>
                                    <div className="delandedit-edu" key={elem.id}>
                                        <br /><br />
                                        <DeleteIcon sx={{ fontSize: "25px" }} onClick={() => { deleteItem(elem.id) }} style={{ cursor: "pointer", color: "red" }} /><EditIcon sx={{ fontSize: "25px" }} onClick={() => { UpdateItem(elem.id) }} style={{ cursor: "pointer", color: "#1B1464" }} /></div>
                                </div>
                                <button className='nest-page' onClick={nextPage}>Next</button>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Education
