import { Link } from 'react-router-dom';
import Modal from '../modal/modal';
import { useCookies } from 'react-cookie';

export default function SeeEmailModal(props) {
    const [cookies] = useCookies(['token']);

    return (
        <>
            <Modal closeModal={props.closeModal}>
                {
                    cookies.token ? 
                        <>
                            <h1 className='header2'>{`${props.nickname}'s email`}</h1> 
                            <p className='p-text'><a className='modal-link' href={`mailto:${props.email}`}>{props.email}</a></p>
                        </> 
                    :
                    <>
                        <h1 className='header1'>You not authorized!</h1>
                        <p className='p-text'>Please log in to see this user's mail.</p>
                        <p className='bread-crumbs-links'><Link to={"/login"}>Login</Link> / <Link to={'/register'}>Register</Link></p>
                    </>
                    
                }
            </Modal>
        </>
    )
}