import React from 'react'
import './Message.css';
const Message = () => {
    const start = () => {
        alert("Did you read all the instruction");
        window.location.href = "./Start";
    }
    return (
        <>
            <div className='alert'>
                <div className='note'><strong>Note -----</strong></div>
                <div className='notes'>
                    <li>If you want to build a new resume then enter only the name of resume you want to give.</li>
                    <li>If want to continue your existing resume then paste the 'Unique Id' generated for that resume which was shown in right top corner of old resume page.  </li>
                </div>
                <button className='continue' onClick={start}>Continue</button>
            </div>
        </>
    )
}

export default Message
