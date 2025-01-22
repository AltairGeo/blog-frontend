import './Login.css'
import { useCookies } from 'react-cookie';
import { useState } from 'react';

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

        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:8000/users/login', {
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
                setCookie('token', data.token, { path: '/' });
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
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