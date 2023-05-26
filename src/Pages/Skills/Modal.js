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
                <div className='modal-input'>     <label htmlFor="name" >Enter Your Skills :</label>
                    <input type="text" value={props.name} onChange={props.inpskill} />
                </div>
                {/* pname={pname} pdescr={pdescr} pgithublink={pgithublink} phostlink={phostlink} */}
                <div className='save-back-btn'>
                    <Button style={{
                        backgroundColor: "#3742fa",
                        color: "#FFFFFF",
                        fontSize: "18px",
                        fontWeight: "600",
                    }}
                        // className='savebtn'
                        onClick={props.addlist}>Save &nbsp;<SaveIcon /></Button>
                    <Button style={{
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
