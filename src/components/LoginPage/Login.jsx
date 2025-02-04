import './Login.css'
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Loading from '../Loading/Loading';
import ErrorText from '../Error/Error';
import {BackendUrl} from '../../../config'
import { jwtDecode } from 'jwt-decode';


export default function Register() {
    const [cookies, setCookie] = useCookies(['token']); 
    const [error_msg, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (cookies.token) {
        window.location.href = '/';
    }
    
    const handleSubmit = async (event) => { 
        setError('');
        event.preventDefault();
        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        document.getElementById("form-btn").disabled = true;

        try {
            setLoading(true);
            const response = await fetch(`${BackendUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({email, password})
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            if (data.token) {
                const decoded = jwtDecode(data.token);
                const expirationDate = new Date(decoded.expires_at);
                setCookie('token', data.token, { path: '/', expires: expirationDate});
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
            document.getElementById("form-btn").disabled = false;
        }
    }

    return (
        <>
            {loading ? <Loading></Loading> : ''}
            {error_msg ? <ErrorText title="Error!" text={error_msg}></ErrorText> : ''}
            <div className='vert-form-div'>
                <div className='form-div'>
                    <form className='form-register' onSubmit={handleSubmit}>
                        <input type="email" name='email' placeholder='Email'/>
                        <input type="password" name='password' placeholder='Password'/>
                        <input id='form-btn' type="submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}