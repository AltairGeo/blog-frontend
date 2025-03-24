import './Panel.css'
import { useState } from 'react'
import ChPassModal from './modals/ChangePasswordModal';
import { useCookies } from 'react-cookie';
import ChNameModal from './modals/ChNameModal';
import ExitModal from './modals/ExitModal/Exit';

export default function Panel()
{
    const [PassModal, setPassModal] = useState(false);
    const [NameModal, setNameModal] = useState(false);
    const [ExitModalState, setExitModal] = useState(false)

    const handlePassModal = () => {setPassModal(!PassModal)};
    const handleNameModal = () => {setNameModal(!NameModal)};
    const handleExitModal = () => {setExitModal(!ExitModalState)}


    return (
        <>
            {ExitModalState ? <ExitModal closeModal={handleExitModal} />: null}
            {PassModal ? <ChPassModal closeModal={handlePassModal}/> : null}
            {NameModal ? <ChNameModal closeModal={handleNameModal}/> : null}
            
            <h1 className='header-action-panel'>Action's</h1>
            <div className='btns'>
                <div className='change-btns'>
                    <button className='password-button' onClick={handlePassModal}></button>
                    <button className='name-button' onClick={handleNameModal}></button>
                    <button className='email-button'>@</button>
                </div>
                <div className='btn-c'>
                    <div className='del-btns'>
                        <button className='delete-btn'></button>
                        <button className='exit-btn' onClick={handleExitModal}></button>
                    </div>
                    <button className='stat-btn'></button>
                </div>  
            </div>
        </>
    )
}