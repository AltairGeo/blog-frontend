import './style.css'


// Universal modal component

export default function Modal(props) {
    return (
        <>
            <button className='btn-close-modal' onClick={() => {props.closeModal()}}></button>
            <div className='Modal'>
                <div className='modal-container'>
                    {props.children}
                </div>
            </div>
        </>
    )
}