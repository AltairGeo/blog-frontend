import './ModalAvatar.css'
import Cropper from './Cropper'

export default function ModalAvatarDialog() {


    return (
        <>
            <div id='rootModal' className='unvis'>
                <button className='btn-close' onClick={() => {
                document.getElementById("rootModal").className = "unvis"
                }}></button>
                <div className='modalContainer'>
                    <div className='cont'>
                        <Cropper></Cropper>
                    </div>
                </div>
            </div>
        </>
    )
}