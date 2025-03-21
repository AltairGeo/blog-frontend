import './style.css'
import Modal from '../../../../modal/modal'
import { useState } from 'react'
import { BackendUrl } from '../../../../../../config'
import { useCookies } from 'react-cookie'


export default function ChNameModal(props) {
    const [Err, setErr] = useState(null)
    const [Succes, setSucces] = useState(false)
    const [cookie] = useCookies(["token"])


    const handlesubmit = async () => {
        document.querySelector(".pass-btn").disabled = true
        try{
            const name = document.getElementById("name-inp").value
            if (!name) {
                throw new Error("Please enter nickname!")
            }

            const resp = await fetch(`${BackendUrl}/users/change_name?new_name=${name}`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    }, 
                }
            )

            if (!resp.ok) {
                const data = await resp.json()
                throw new Error(data.detail)
            }

            if(resp.ok) {
                setSucces(true)
            }

        } catch(error) {
            setErr(error.message)
        }
    }
    return (
        <>
            <Modal closeModal={props.closeModal}>
            { Err ? // Error
                <>
                    <h1 className='header1'>Error!</h1>
                    <p className='p-text'>{Err}</p>
                    <button onClick={props.closeModal} className='err-btn'>OK!</button>
                </>
                :
            Succes ? // Succesfully
            <>
            <h1 className='header2'>Succesfully!</h1>
            <p className='p-text'>Your nickname was changed!</p>
            <button className='pass-btn' onClick={props.closeModal}>OK!</button>
            </>
            : // Default
                <> 
                    <h1 className='header1'>Change name</h1>
                    <div className='pass-inp-div'>
                        <input id='name-inp' type="text" className='pass-inp' placeholder='new name'/>
                    </div>
                    <br />
                    <button className='pass-btn' onClick={handlesubmit}>Submit!</button>
                </>
            }
            </Modal>
        </>
    )
}