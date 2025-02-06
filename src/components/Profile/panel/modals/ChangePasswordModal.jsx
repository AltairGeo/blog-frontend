import './chpass.css'
import Modal from '../../../modal/modal'


export default function ChPassModal(props) {
    return (
        <>
            <Modal closeModal={props.closeModal}>
                <div className='pass-inp-div'>
                    <input className='pass-inp' type="password" placeholder='old password' />
                    <input className='pass-inp inp-mar' type="text" placeholder='new password' />
                    <input className='pass-inp' type="text" placeholder='repeat new password' />
                </div>
                <br />
                <button className='pass-btn'>Submit!</button>
            </Modal>
        </>
    )
}