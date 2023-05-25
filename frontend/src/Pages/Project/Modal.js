import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import { Margin } from '@mui/icons-material';

const Modal = (props) => {
    return (
        <>
            <div className='mainbg' onClick={props.closeNote}></div>
            <div className='mainnote'>
                <h1 style={{ textAlign: "center" }}><span style={{
                    borderBottom: "4px solid #1B9CFC",
                }
                }>Add Your</span> Projects</h1>
                <div className='modal-input'>     <label htmlFor="name" >Project Name :</label>
                    <input type="text" value={props.name} onChange={props.inpname} />
                </div>
                <div className="modal-input"> <label htmlFor="name">Github Link :</label>
                    <input type="text" value={props.git} onChange={props.inpgit} />
                </div>
                <div className="modal-input">  <label htmlFor="name">Hosted Link(if any) :</label>
                    <input type="text" value={props.host} onChange={props.inphost} />
                </div>
                <div className="modal-inputarea">  <label htmlFor="name">About Project(Skills used and working of project etc... *Optional) :</label>
                    <textarea type="text" value={props.descr} onChange={props.inpdescr} />
                </div>
                {/* pname={pname} pdescr={pdescr} pgithublink={pgithublink} phostlink={phostlink} */}
                <div className='save-back-btn'>
                    <Button className='svedbtn' style={{
                        backgroundColor: "#3742fa",
                        color: "#FFFFFF",
                        fontSize: "18px",
                        fontWeight: "600",
                    }}
                        // className='savebtn'
                        onClick={props.addlist}>Save &nbsp;<SaveIcon /></Button>
                    <Button className='svedbtn' style={{
                        backgroundColor: "#3742fa",
                        color: "#FFFFFF",
                        fontSize: "18px",
                        fontWeight: "600",
                    }}
                        onClick={props.closeNote}>Back &nbsp;</Button>
                </div>

            </div>
        </>
    )
}

export default Modal 
