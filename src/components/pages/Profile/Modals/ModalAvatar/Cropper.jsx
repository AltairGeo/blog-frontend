import { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { BackendUrl } from '../../../../../../config';
import { useCookies } from 'react-cookie';
import './Cropper.css'
import { useNavigate } from 'react-router-dom';


export default function AvatarUploader() {
    const [cookies] = useCookies(["token"])
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState(null);
    const imgRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                setCrop(
                    centerCrop(
                        makeAspectCrop({ unit: "%", width: 50 }, 1, 256, 256),
                        256,
                        256
                    )
                );
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async () => {
        if (!imgRef.current || !crop) return;

        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            256,
            256
        );

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            const formData = new FormData();
            formData.append("token", cookies.token);
            formData.append("image", blob);

            try {
                document.querySelector(".sbm-btn").disabled = true;
                const response = await fetch(`${BackendUrl}/users/avatar_upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Avatar loading error!');
                }

                navigate(0);
            } catch (error) {
                console.error(error);
            }
        }, 'image/png');
    };

    return (
        <div className="avatar-uploader">
            <label htmlFor="avatar-up" className="custom-file-upload">
                Click to select file
            </label>
            <input type="file" accept="image/*" id='avatar-up' onChange={handleFileChange} />
            {image && (
                <>
                    <div className='cropperCont'>
                        <div className='cr-image'>
                            <ReactCrop
                                crop={crop}
                                onChange={(newCrop) => setCrop(newCrop)}
                                aspect={1}
                                minWidth={256}
                                minHeight={256}
                            >
                                <img ref={imgRef} src={image} alt="Preview" />
                            </ReactCrop>
                        </div>
                    </div>
                    <button className='sbm-btn' onClick={uploadImage}>Upload avatar</button>
                </>
            )}
        </div>
    );
}