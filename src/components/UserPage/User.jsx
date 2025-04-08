import { useEffect, useState } from 'react';
import './style.css'
import { useParams } from 'react-router-dom';
import { BackendUrl } from '../../../config';
import SeeEmailModal from './SeeEmail';



export default function UserProfile() {
    const params = useParams();
    const [usr_data, set_usr_data] = useState(null)
    const [seeEmailm, setemailmodal] = useState(false)
    const [currentTAB, setCurrentTab] = useState('posts')

    useEffect(() => {
        const basefunc = async () => {
            const resp = await fetch(`${BackendUrl}/users/get_user?user_id=${params.userID}`)
            const json_resp = await resp.json()
            set_usr_data(json_resp)
        }
        basefunc()
    }, [params.userID])

    const CloseEmailModal = () => {
        setemailmodal(false)
    }


    const DataFormatMake = (dateSTR) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        const DatObj = new Date(dateSTR)
        return formatter.format(DatObj)
    }



    return (
        <> 
            {seeEmailm ? <SeeEmailModal closeModal={CloseEmailModal} email={usr_data.email} nickname={usr_data.nickname}/> : null}
            <div className='user-profile-contain'>  
                <div className='base-user-head'>
                    <img src={usr_data ? usr_data.avatar_path : "/base_avatar.png"} className='avatar' />
                    <div className='usr-othr'>
                        <div className='usr-nickname'>
                            <p>{usr_data ? usr_data.nickname : "Loading..."}</p>
                            <button className='send-email-btn' onClick={() => {setemailmodal(true)}}></button>
                        </div>
                        <div className='usr-bio'>
                            <p>{usr_data ? usr_data.bio ? usr_data.bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis interdum sapien, id tincidunt." : "Loading..."}</p>                           
                    </div>
                    <div className='usr-breadcrumbs'>
                                <button onClick={() => {setCurrentTab("posts")}} disabled={currentTAB === "posts" ? true : null} className='posts-btn'></button>
                                <button onClick={() => {setCurrentTab("likes")}} disabled={currentTAB === "likes" ? true : null} className='like-btn'></button>
                                <button onClick={() => {setCurrentTab("stats")}} disabled={currentTAB === "stats" ? true : null} className='stats-btn'></button>
                            </div> 
                    </div> </div>
                </div>
        </>
    )
}