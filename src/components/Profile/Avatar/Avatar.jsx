import './Avatar.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Loader from '../loader/loader';
import {BackendUrl} from '../../../../config'


export default function Avatar() {
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(null); // Состояние для URL аватара

    useEffect(() => {
        async function handleAvatar() {
            try {
                if (!cookies.token) {
                    window.location.href = '/login';
                    return;
                }

                const resp = await fetch(`${BackendUrl}/users/avatar_by_token`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        token: cookies.token
                    })
                });

                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }

                const imgBlob = await resp.blob();
                const urlOBJ = URL.createObjectURL(imgBlob);

                setAvatarUrl(urlOBJ); // Устанавливаем URL в состояние
                document.querySelector('.avatar-container').style.background = 'none';
            } catch (error) {
                console.error('Error fetching avatar:', error.message);
            } finally {
                setLoading(false);
            }
        }

        handleAvatar();
    }, [cookies.token]);

    return (
        <>
            <div className="avatar-container">
                {loading ? 
                <Loader /> : (
                    avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />
                )}
                <button className="avatar-button" onClick={() => {
                    document.getElementById("rootModal").className = ""
                }}></button>
        </div>
        </>
    );
}