import './style.css'
import Modal from '../../../../modal/modal'
import { useState } from 'react'
import { BackendUrl } from '../../../../../../config'
import { useCookies } from 'react-cookie'



export default function ChPassModal(props) {
    const [ProccesError, setErr] = useState(false)
    const [cookie] = useCookies(["token"])
    const [Succes, setSuc] = useState(false)


    const handleSubmit = async () => {
        try {
            document.querySelector(".pass-btn").disabled = true
            const old = document.getElementById("old-pass").value
            const newPass = document.getElementById("new-pass").value
            const RnewPass = document.getElementById("r-new-pass").value

            if (!old){
                setErr("Please enter old password!")
            }

            if (!newPass || !RnewPass) {
                setErr("Please enter new password!")
            } 

            if (newPass != RnewPass) {
                setErr("Passwords don't match")
            }

            const resp = await fetch(`${BackendUrl}/users/change_password`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        token: cookie.token,
                        old_password: old,
                        new_password: newPass,
                    })
                }
            )
            if (!resp.ok) {
                const data = await resp.json()
                setErr(data.detail)
            }

            if (resp.ok) {
                setSuc(true)
            }
    } catch(error) {
        setErr(error.message)
    }
    }

    return (
        <>
            <Modal closeModal={props.closeModal}>
                { ProccesError ?
                <>
                    <h1 className='header1'>Error!</h1>
                    <p className='p-text'>{ProccesError}</p>
                    <button onClick={props.closeModal} className='err-btn'>OK!</button>
                </>
                :
                Succes ? 
                <>
                <h1 className='header2'>Succesfully!</h1>
                <p className='p-text'>Please check you email!</p>
                <button className='pass-btn' onClick={props.closeModal}>OK!</button>
                </>
                :
                <>
                <h1 className='header1'>Change password</h1>
                <div className='pass-inp-div'>
                    <input id='old-pass' className='pass-inp' type="password" placeholder='old password' />
                    <input id='new-pass' className='pass-inp inp-mar' type="text" placeholder='new password' />
                    <input id='r-new-pass' className='pass-inp' type="text" placeholder='repeat new password' />
                </div>
                <br />
                <button className='pass-btn' onClick={handleSubmit}>Submit!</button>
                </>
                }
            </Modal>
        </>
    )
}