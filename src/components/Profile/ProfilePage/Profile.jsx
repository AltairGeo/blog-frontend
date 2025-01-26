import './Profile.css'
import Avatar from '../Avatar/Avatar'
import { useCookies } from 'react-cookie';
import InfoTab from '../Info/Info';

export default function Profile() {
    const [cookies] = useCookies(['token']);
    if(!cookies.token){
        if (!cookies.token) {
            window.location.href = '/login';
        }
    }

    return (
        <div className='container'>
            <div className='profile-grid'>
                <div className='base-info'>
                    <Avatar />
                    <InfoTab />
                </div>
                <div className='btns-and-change'></div>
                <div className='my-posts'></div>
            </div>
        </div>
    )
}