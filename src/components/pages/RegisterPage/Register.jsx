import './Register.css'
import ErrorText from '../../Error/Error';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Loading from '../../Loading/Loading';
import { BackendUrl } from '../../../../config';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [cookies, setCookie] = useCookies(['token']); // Работа с cookie
    const [error_msg, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        const form = event.target;
        const nickname = form.nickname.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        const re_password = form['re-password'].value.trim();


        if ( password !== re_password ) {
            setError('Passwords do not match.');
            return;
        }

        const formData = new URLSearchParams();
        formData.append("nickname", nickname)
        formData.append("email", email)
        formData.append("password", password)

        try {
            document.getElementById("form-btn").disabled = true;
            setLoading(true);
            const response = await fetch(`${BackendUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            
            const data = await response.json();
            if(data.access_token) {
                const decoded = jwtDecode(data.access_token);
                const expirationDate = new Date(decoded.exp * 1000);
                setCookie('token', data.access_token, { path: '/', expires: expirationDate });
                navigate('/');
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            document.getElementById("form-btn").disabled = false;
            setLoading(false);
        }
    }
    
    return (
        <>
            { cookies.token ? navigate('/') : '' }
            { loading ? <Loading></Loading> : '' }
            <div className='vert-form-div'>
                <div className='form-div'>
                    <form className='form-register' onSubmit={handleSubmit}>
                        <input name='nickname' type="text" maxLength={40} placeholder='Nickname'/>
                        <input type="email" name='email' placeholder='Email'/>
                        <input type="password" name='password' placeholder='Password'/>
                        <input type="password" name='re-password' placeholder='Repeat password' />
                        <input id='form-btn' type="submit"/>
                    </form>
                </div>
            </div>
            {error_msg != '' ? <ErrorText title="Error!" text={error_msg}></ErrorText> : ''}
        </>
    )
}