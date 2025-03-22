import './Login.css'
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Loading from '../../Loading/Loading';
import ErrorText from '../../Error/Error';
import {BackendUrl} from '../../../../config'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [cookies, setCookie] = useCookies(['token']); 
    const [error_msg, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    if (cookies.token) {
        navigate('/')
    }
    
    const handleSubmit = async (event) => { 
        setError('');
        event.preventDefault();
        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        document.getElementById("form-btn").disabled = true;

        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        try {
            setLoading(true);
            const response = await fetch(`${BackendUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }, 
                body: formData.toString(),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail);
            }

            const data = await response.json();
            if (data.access_token) {
                const decoded = jwtDecode(data.access_token);
                const expirationDate = new Date(decoded.exp * 1000);
                console.log(expirationDate)
                setCookie('token', data.access_token, { path: '/', expires: expirationDate});
                navigate('/')
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