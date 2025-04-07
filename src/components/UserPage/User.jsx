import { useEffect, useState } from 'react';
import './style.css'
import { useParams } from 'react-router-dom';
import { BackendUrl } from '../../../config';

export default function UserProfile() {
    const params = useParams();
    const [usr_data, set_usr_data] = useState(null)

    useEffect(() => {
        const basefunc = async () => {
            const resp = await fetch(`${BackendUrl}/users/get_user?user_id=${params.userID}`)
            const json_resp = await resp.json()
            set_usr_data(json_resp)
        }
        basefunc()
    }, [params.userID])

    return (
        <>
            <div className='user-profile-contain'>  
                <div className='base-user-head'>
                    <img src={usr_data ? usr_data.avatar_path : "/base_avatar.png"} className='avatar' />
                    <div className='usr-othr'>
                        <div className='usr-nickname'>
                            <p>{usr_data ? usr_data.nickname : "Loading..."}</p>
                            <button className='send-email-btn'></button>
                        </div>
                        <div className='usr-bio'>
                            <p>{usr_data ? usr_data.bio ? usr_data.bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis interdum sapien, id tincidunt." : "Loading..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}