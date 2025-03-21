import './Avatar.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Loader from '../loader/loader';
import {BackendUrl} from '../../../../../config'


export default function Avatar() {
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(null); // Состояние для URL аватара


    const getAvatar = () => {
        async function handleAvatar() {
            try {
                if (!cookies.token) {
                    window.location.href = '/login';
                    return;
                }

                const resp = await fetch(`${BackendUrl}/users/get_avatar_by_token`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`
                    },
                    method: 'GET',
                });

                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }
                const ava_data = await (await resp.text()).replaceAll('"', "")
                console.log(ava_data)
                setAvatarUrl(ava_data)

                document.querySelector('.avatar-container').style.background = 'none';
            } catch (error) {
                console.error('Error fetching avatar:', error.message);
            } finally {
                setLoading(false);
            }
        }

        handleAvatar();
    }
    
    useEffect(getAvatar, [cookies.token]);

    return (
        <>
            <div className="avatar-container">
                {loading ? 
                <Loader /> : (
                    avatarUrl && <img src={`${avatarUrl}?v=${localStorage.getItem('avatar') ? localStorage.getItem("avatar") : "123"}`} alt="" className="avatar" />
                )}
                <button className="avatar-button" onClick={() => {
                    document.getElementById("rootModal").className = ""
                }}></button>
        </div>
        </>
    );
}