import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import Modal from "./Modal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Project.css'

const Project = () => {
    const userID = window.localStorage.getItem("ResumeID");
    const nextPage = () => {
        window.location.href = "./Skill";
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
        setList(data1.project);
    }

    const [list, setList] = useState([]);
    const [pname, setPname] = useState("");
    const [pdescr, setPdescr] = useState("");
    const [pgithublink, setGithub] = useState("");
    const [phostlink, setHost] = useState("");
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

    const itemname = (e) => {
        setPname(e.target.value);
    }
    const itemdescr = (e) => {
        setPdescr(e.target.value);
    }
    const itemgit = (e) => {
        setGithub(e.target.value);
    }
    const itemhost = (e) => {
        setHost(e.target.value);
    }
    const addList = async (e) => {
        e.preventDefault();
        setPname("");
        setPdescr("");
        setGithub("");
        setHost("");
        console.log("clicked");
        closeNote();
        if (!pname || !pgithublink) {
            alert("Enter your notes Properly");
        }
        else if (temptask && !isEdit) {
            console.log("Updating items");
            list.map(async (elem) => {
                if (elem.id == temptask) {
                    console.log(elem.id);
                    const res = await fetch("https://cresume-backend.onrender.com/updateproject", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            uid: userID, id: elem.id, pname, pdescr, pgithublink, phostlink
                        })
                    })
                }
                getElem();
                return elem;
            }
            )
            setShowNote(false);
            setIsEdit(true);
            setPname("");
            setPdescr("");
            setGithub("");
            setHost("");
            setPretask(null);
        }
        else {
            const allTask = { id: new Date().getTime().toString(), pname, pdescr, pgithublink, phostlink }
            const res = await fetch("https://cresume-backend.onrender.com/addprojects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: userID, id: new Date().getTime().toString(), pname, pdescr, pgithublink, phostlink
                })
            })
            getElem();
        }
    };
    // delete item
    const deleteItem = (async (index) => {
        console.log(index);
        const res = await fetch("https://cresume-backend.onrender.com/deleteproject", {
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
        setPname(tobeupdatetask.pname);
        setPdescr(tobeupdatetask.pdescr);
        setGithub(tobeupdatetask.pgithublink);
        setHost(tobeupdatetask.phostlink);
        console.log(temptask);
        // console.log("todotask updated", todotask);
        setShowNote(true);
    });

    useEffect(() => {
        getElem();
    }, [list]);

    return (
        <>
            <div className='addIcon'>
                <span><b>Add Your Projects Here </b></span>
                <div className='ctcb'>
                    <b>{userID}</b>
                    <button className='buttonc' onClick={handlecopy}>Copy!</button>
                    <Button onClick={() => { setShowNote(true) }} className="addnotebtn"> <AddCircleRoundedIcon className="addnoteicon" sx={{ fontSize: "70px" }} /></Button>
                </div>


                <br /><br />
                {showNote && <Modal closeNote={closeNote} name={pname} descr={pdescr} git={pgithublink} host={phostlink} inpname={itemname} inpdescr={itemdescr} inpgit={itemgit} inphost={itemhost} addlist={addList} tobeupdate={pretask} />}
            </div>
            <div className="mainNotedivP">
                {
                    list.map((elem, index) => {
                        return (
                            <>
                                <div className="indnotep" onMouseEnter={Hoveron}
                                    onMouseOut={Hoveroff}>
                                    <div className='datas'>
                                        <li className='pfname'><span>{elem.pname}</span></li>
                                        <li className='po'><a href={elem.pgithublink}><GitHubIcon />{elem.pgithublink}</a></li>
                                        <li className='po'><a href={elem.phostlink}><LanguageIcon />{elem.phostlink}</a></li>
                                        <li className='lip'><span>{elem.pdescr}</span></li>
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
