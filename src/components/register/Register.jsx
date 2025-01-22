import './Register.css'

export default function Register() {
    
    return (
        <>
            <div className='vert-form-div'>
                <div className='form-div'>
                    <form className='form-register' action='#' method=''>
                        <input type="text" maxLength={40} placeholder='Nickname'/>
                        <input type="email" placeholder='Email'/>
                        <input type="password" placeholder='Password'/>
                        <input id='form-btn' type="submit" onClick={null}/>
                    </form>
                </div>
            </div>
        </>
    )
}