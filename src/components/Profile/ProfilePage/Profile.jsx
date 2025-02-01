import './Profile.css'
import Avatar from '../Avatar/Avatar'
import { useCookies } from 'react-cookie';
import InfoTab from '../Info/Info';
import ModalAvatarDialog from '../Modals/ModalAvatar/ModalAvatar';
import MyPostsView from '../MyPosts/MyPosts';


export default function Profile() {
    const [cookies] = useCookies(['token']);
    if(!cookies.token){
        if (!cookies.token) {
            window.location.href = '/login';
        }
    }

    return (
        <>
            <ModalAvatarDialog></ModalAvatarDialog>
            <div className='container'>
                <div className='profile-grid'>
                    <div className='base-info'>
                        <Avatar />
                        <InfoTab />
                    </div>
                    <div className='btns-and-change'>
                        <p>qwe</p><p>qwe</p><p>qwe</p><p>qwe</p><p>qwe</p>
                    </div>
                    <div className='my-posts'>
                        <MyPostsView />
                    </div>
                </div>
            </div>
        </>
    )
}