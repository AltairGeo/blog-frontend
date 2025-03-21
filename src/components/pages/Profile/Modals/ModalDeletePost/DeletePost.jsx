import './DeletePost.css';
import { useCookies } from 'react-cookie';
import { BackendUrl } from '../../../../../../config';
import { useNavigate } from 'react-router'

export default function DeletePost(props) {
    const [cookie] = useCookies(["token"])
    const { toDelete, setModal } = props;
    const navigate = useNavigate()

    const deletePost = async () => {
        setModal(null)
        const res = await fetch(`${BackendUrl}/posts/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
            body: JSON.stringify({
                id: toDelete
            })
        })
        navigate(0)
    }

    return (
        <>
            <div id='deletePostModal'>
                <div className='modalDialogContainer'>
                    <div className='dialogDelete'>
                        <div className='textDialog'>
                            <p>Are you sure?</p>
                        </div>
                        <div className='dialogBTNs'>
                            <button className='deleteBTN' onClick={() => {deletePost()}}>Yes, delete this!</button>
                            <button className='denyBTN' onClick={() => {setModal(null)}}>No, save it!</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}