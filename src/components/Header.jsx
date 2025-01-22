import './Header.css'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

function Header(props) {
    const [cookies, setCookie] = useCookies(['token'])
    return (
        <div id="header">
            <nav>
                <ul id='header-pgs'>
                    <li><a className={props.active === "home" ? "active" : ""}><Link>Home</Link></a></li>
                    <li><a className={props.active === "hot" ? "active" : ""}><Link>Hot</Link></a></li>
                    <li><a className={props.active === "lasts" ? "active" : ""}><Link>Lasts</Link></a></li>
                </ul>
            </nav>
            <nav>
                {cookies.token ? 
                <ul>
                    <li><a  className={props.active === "+" ? "active" : ""} id="createPostBTN"><Link>+</Link></a></li>
                    <li><a className={props.active === "profile" ? "active" : ""}><Link>Profile</Link></a></li>
                </ul> 
            :               
                <ul>
                    <li><a className={props.active === "registration" ? "active" : ""}><Link to="/register">Registration</Link></a></li>
                    <li><a className={props.active === "login" ? "active" : ""}><Link to="/login">Login</Link></a></li>
                </ul>}
            </nav>
        </div>
    )
}

export default Header