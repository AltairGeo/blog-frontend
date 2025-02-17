import './Profile.css'
import Avatar from '../Avatar/Avatar'
import { useCookies } from 'react-cookie';
import InfoTab from '../Info/Info';
import ModalAvatarDialog from '../Modals/ModalAvatar/ModalAvatar';
import MyPostsView from '../MyPosts/MyPosts';
import DeletePost from '../Modals/ModalDeletePost/DeletePost';
import { useState } from 'react';
import Panel from '../panel/MainPanel';


export default function Profile() {
    const [cookies] = useCookies(['token']);
    const [toDelete, setToDelete] = useState(null);
    if(!cookies.token){
        if (!cookies.token) {
            window.location.href = '/login';
        }
    }

    return (
        <>
        {toDelete ? <DeletePost setModal={setToDelete} toDelete={toDelete}></DeletePost> : ""}
            <ModalAvatarDialog></ModalAvatarDialog>
            <div className='container'>
                <div className='profile-grid'>
                    <div className='base-info'>
                        <Avatar />
                        <InfoTab />
                    </div>
                    <div className='btns-and-change'>
                        <Panel />
                    </div>
                    <div className='my-posts'>
                        <MyPostsView handleDelete={setToDelete}/>
                    </div>
                </div>
            </div>
        </>
    )
}