import './Header.css'
import { useCookies } from 'react-cookie'

function Header(props) {
    const [cookies, setCookie] = useCookies(['token'])
    return (
        <div id="header">
            <nav>
                <ul id='header-pgs'>
                    <li><a href="./index.html" class="active">Home</a></li>
                    <li><a href="#">Hot</a></li>
                    <li><a href="#">Lasts</a></li>
                </ul>
            </nav>
            <nav>
                {cookies.token ? <p>Гойдочка</p> :             
                <ul>
                    <li><a href="./register.html">Registration</a></li>
                    <li><a href="./login.html">Login</a></li>
                </ul>}
            </nav>
        </div>
    )
}

export default Header