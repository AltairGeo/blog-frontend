import './Header.css'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Header(props) {
    const [cookies, setCookie] = useCookies(['token'])
    try {
        props.invis ? document.getElementById('header').style.display = 'none' : document.getElementById('header').style.display = 'flex'
    } catch(e) {
        console.error(e.message)
    }
    return (
        <div id='header-cont'>
        <div id="header">
            <nav>
                <ul id='header-pgs'>
                    <li><a className={props.active === "home" ? "active" : ""}><Link to='/'>Home</Link></a></li>
                    <li><a className={props.active === "lasts" ? "active" : ""}><Link to='/lasts'>Lasts</Link></a></li>
                </ul>
            </nav>
            <nav>
                {cookies.token ? 
                <ul>
                    <li><Link to='/create' className={props.active === "create" ? "active" : ""} id="createPostBTN">+</Link></li>
                    <li><Link to='/profile' className={props.active === "profile" ? "active" : ""} >Profile</Link></li>
                </ul> 
            :               
                <ul>
                    <li><a className={props.active === "register" ? "active" : ""}><Link to="/register">Registration</Link></a></li>
                    <li><Link className={props.active === "login" ? "active" : ""} to="/login">Login</Link></li>
                </ul>}
            </nav>
        </div>
        </div>
    )
}

export default Header