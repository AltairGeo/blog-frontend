import './style.css'
import Modal from '../../../../../modal/modal'
import { useCookies } from 'react-cookie';


export default function ExitModal(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const ExitAcc = () => {
        removeCookie('token', { path: '/' });
    }
    return (
        <>
        <Modal closeModal={props.closeModal}>
            <h1 className='header-exit'>You want exit. <br/> Are you sure?</h1>
            <span className='cont-btns'>
                <button className='err-btn' onClick={ExitAcc}>Yes, exit!</button>
                <button className='pass-btn' onClick={props.closeModal}>No, stay!</button>
            </span>
        </Modal>
        </>
    );
}