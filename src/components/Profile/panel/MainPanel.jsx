import './Panel.css'
import { useState } from 'react'
import ChPassModal from './modals/ChangePasswordModal';
import { useCookies } from 'react-cookie';

export default function Panel()
{
    const [PassModal, setPassModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    const handlePassModal = () => {setPassModal(!PassModal)};


    const ExitAcc = () => {
        removeCookie('token', { path: '/' });
    }
    return (
        <>
            {PassModal ? <ChPassModal closeModal={handlePassModal}/> : ""}
            <h1 className='header-action-panel'>Action's</h1>
            <div className='btns'>
                <div className='change-btns'>
                    <button className='password-button' onClick={handlePassModal}></button>
                    <button className='name-button'></button>
                    <button className='email-button'>@</button>
                </div>
                <div className='btn-c'>
                    <div className='del-btns'>
                        <button className='delete-btn'></button>
                        <button className='exit-btn' onClick={ExitAcc}></button>
                    </div>
                    <button className='stat-btn'></button>
                </div>  
            </div>
        </>
    )
}