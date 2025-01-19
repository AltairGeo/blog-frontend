import './Header.css'
import { useCookies } from 'react-cookie'

function Header(props) {
    const [cookies, setCookie] = useCookies(['token'])
    return (
        <div id="header">
            <nav>
                <ul id='header-pgs'>
                    <li><a href="#" className={props.active === "home" ? "active" : ""}>Home</a></li>
                    <li><a href="#" className={props.active === "hot" ? "active" : ""}>Hot</a></li>
                    <li><a href="#" className={props.active === "lasts" ? "active" : ""}>Lasts</a></li>
                </ul>
            </nav>
            <nav>
                {cookies.token ? <p>Гойдочка</p> :               
                <ul>
                    <li><a href="#" className={props.active === "registration" ? "active" : ""}>Registration</a></li>
                    <li><a href="#" className={props.active === "login" ? "active" : ""}>Login</a></li>
                </ul>}
            </nav>
        </div>
    )
}

export default Header