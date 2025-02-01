import './DeletePost.css';
import { useCookies } from 'react-cookie';

export default function DeletePost(props) {
    const [cookie] = useCookies(["token"])
    const { toDelete, setModal } = props;

    const deletePost = async () => {

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
                            <button className='deleteBTN'>Yes, delete this!</button>
                            <button className='denyBTN' onClick={() => {setModal(null)}}>No, save it!</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}