import './publicButton.css';
import {BackendUrl} from '../../../../../config'
import { useCookies } from 'react-cookie';


export default function PublicButton(props) {
    const [cookies, setCookie] = useCookies(['token']);

    const handleButton = () => {
        const asyncHandleButton = async () => {
            props.setPublic(!props.post_public)
            await fetch(`${BackendUrl}/posts/${props.postID}/status/${!props.post_public}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            })
        }
        asyncHandleButton()
    }

    return (
        <>
            <button onClick={handleButton} className={"public-btn ml-5 " + (props.post_public ? "pub": "non-pub")}></button>
        </>
    )
}